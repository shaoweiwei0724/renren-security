
var baseIP="../../../";
var nodeDataArray;
var linkDataArray;
var attrs=[];
var swan_redis_data={};
var text_node={};
var swan_obj_list;
var swan_objs=[];
var swan_objs_res;
var icon={};
var selectSceneId=localStorage.selectSceneId;
var iconsId=localStorage.iconsId ;
function init() {

    if(localStorage.fileId === null)
        return;
    // if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this

    var str={};
    var xmlHttp = new XMLHttpRequest();

    if("编辑组态" == localStorage.edit_change){
        xmlHttp.open("GET", "../../../sys/sifanyclass/select/115", true);
    }else{
        xmlHttp.open("GET", "../../../sys/sifanyclass/select/168", true);
    }
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            str = JSON.parse(xmlHttp.responseText);

            var list = str.classLists[0].childs;
            swan_obj_list = str.classLists;

            console.log("list:", swan_obj_list);
            for (var i in swan_obj_list) {
                var swan_obj_list_i = swan_obj_list[i]

                var swan_obj_i=[];
                for (var i in swan_obj_list_i['childs']) {
                    var child_i = swan_obj_list_i['childs'][i];
                    icon[child_i.id] = child_i.icons;
                    switch (child_i.name) {
                        case "母线":
                            swan_obj_i.push({
                                "icon": child_i.id,
                                "iconWidth": 15,
                                "iconHeight": 30,
                                "category": "BusbarSection_0",
                                "text": child_i.name,
                                "source": child_i,
                                "attrs": child_i.attrs
                            });
                            break;
                        default:
                            swan_obj_i.push({
                                "icon": child_i.id,
                                "iconWidth": 5,
                                "iconHeight": 5,
                                "text": child_i.name,
                                "source": child_i,
                                "attrs": child_i.attrs
                            });
                    }
                    // if(child_i.name=="母线"){
                    //     swan_obj_i.push({"icon":child_i.id, "iconWidth":15, "iconHeight":30, "category":"BusbarSection_0", "text":child_i.name, "source":child_i});
                    // }
                    // else {
                    //     swan_obj_i.push({"icon":child_i.id, "iconWidth":15, "iconHeight":30,  "text":child_i.name, "source":child_i});
                    // }

                }

                swan_objs.push(swan_obj_i);
            }
            console.log("swan_objs", swan_objs);


            function geoFunc(geoname) {
                var geo = icon[geoname];
                return "../../../sys/sifanydataimage/image/" + geo + ".svg";
            }



            xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", baseIP + "sys/sifanyclass/scenes/" + selectSceneId, true);
            xmlHttp.send();

            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    str = JSON.parse(xmlHttp.responseText);
                    jsons = JSON.parse(str.mapJsonG);
                    swan_objs_res = str.objs;
                    // for (var i in swan_objs_res) {
                    //     var attrs = swan_objs_res[i].attrs;
                    //     if (attrs.length > 0) {
                    //         for (var j in attrs) {
                    //             swan_redis_data[attrs[j]["id"].toString()] = 0
                    //         }
                    //     }
                    // }
            // xmlHttp.open("GET", baseIP + "sys/sifanygjson/getGJson?idd=" + localStorage.fileId, true);
            // xmlHttp.send();
            // xmlHttp.onreadystatechange = function () {
            //     if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            //         var json = JSON.parse(xmlHttp.responseText);
                    nodeDataArray = jsons.node;
                    // console.log("nodeDataArray",nodeDataArray);
                    linkDataArray = jsons.link;
                    // console.log("linkDataArray",linkDataArray);
                    if( nodeDataArray != null && nodeDataArray != "undefined"){
                    for (var j = 0; j < nodeDataArray.length; j++) {
                        var nodedata = nodeDataArray[j]
                        var node_attr = [];
                        if (nodedata.type != "Text") {
                            if (nodedata.attrs != "" && nodedata.attrs != null && nodedata.attrs != "undefined") {
                                for (var i = 0; i < nodedata.attrs.length; i++) {
                                    var attr = {};
                                    attr = nodedata.attrs[i];
                                    attr.objId = nodeDataArray[j].key;
                                    node_attr.push(attr);
                                    swan_redis_data[attr["id"].toString()] = 0;
                                }
                                attrs.push(node_attr);
                            }
                        }
                        else {
                            var msp = nodedata.msp;
                            var node_text = [];
                            if (text_node[msp] != undefined) {
                                node_text = text_node[msp];
                            }
                            node_text.push(nodedata.key);
                            text_node[msp] = node_text;
                        }
                    }
                    }else{
                        nodeDataArray = [];
                    }
                    //定义模型
                    var model = {};
                    model.class = "go.GraphLinksModel";
                    model.linkFromPortIdProperty = "fromPort";
                    model.linkToPortIdProperty = "toPort";
                    model.nodeDataArray = nodeDataArray;
                    model.linkDataArray = linkDataArray;

                    // document.getElementById('swan-res').value=(myDiagram.model.toJson());
                    //定义图元
                    var icons = {};
                    icons.capacitor_p = "M12.8,2.4v4 M0,6.4h25.6 M0,14.4h25.6 M12.8,14.4v12.8 M0,27.2h25.6 M3.2,32h19.2 M6.4,36.8h12.8";
                    icons.capacitor_s = "M2.4,12.8h4 M6.4,0v25.6 M14.4,0v25.6 M14.4,12.8h4";
                    // icons.cbreaker_1 = "M0,3h8v20H0V3z";
                    // icons.cbreaker_2 = "M0,3h8v20H0V3z";
                    icons.cbreaker_1 = "M1-3h8v20H1V-3z";
                    icons.cbreaker_2 = "M1-3h8v20H1V-3z";
                    icons.disconnector_1 = "M6,3v5 M6,28v5 M0,28h12 M6,8v20";
                    icons.disconnector_2 = "M6,3v5 M6,28v5 M0,28h12 M6,8l6,20";
                    icons.disconnector_3 = "M6,0v36";
                    icons.energyconsumer_0 = "M4.8-6.6v4 M-7.2-2.6h24l-12,18L-7.2-2.6z";
                    // icons.energyconsumer_0 = "M12,2v4 M0,6h24L12,24L0,6z";
                    icons.energyconsumer_1 = "M16,0c8.8,0,16,7.2,16,16s-7.2,16-16,16S0,24.8,0,16S7.2,0,16,0z M8,24V8 M8,8l8,16 M16,24l8-16 M24,8v16";
                    icons.generalmeter = "M13,40c7.2,0,13,5.8,13,13s-5.8,13-13,13S0,60.2,0,53S5.8,40,13,40z M13,0v40";
                    icons.generator = "M16,0c8.8,0,16,7.2,16,16s-7.2,16-16,16S0,24.8,0,16S7.2,0,16,0z M15.7,16.1h0.8c0-4.3-3.2-7.8-7.2-7.8\n" +
                        "\tS2,11.8,2,16.1h0.8c0-3.9,2.9-7,6.4-7S15.7,12.2,15.7,16.1C15.7,16.1,15.7,16.1,15.7,16.1z M15.7,16.1h0.8c0-4.3-3.2-7.8-7.2-7.8\n" +
                        "\tS2,11.8,2,16.1h0.8c0-3.9,2.9-7,6.4-7S15.7,12.2,15.7,16.1C15.7,16.1,15.7,16.1,15.7,16.1z M16.5,15.5l-0.8,0\n" +
                        "\tc0.2,4.3,3.6,7.7,7.5,7.5c4-0.2,7.1-3.8,6.9-8.1l-0.8,0c0.2,3.9-2.6,7.1-6.1,7.2S16.7,19.3,16.5,15.5L16.5,15.5z M16.5,15.5l-0.8,0\n" +
                        "\tc0.2,4.3,3.6,7.7,7.5,7.5c4-0.2,7.1-3.8,6.9-8.1l-0.8,0c0.2,3.9-2.6,7.1-6.1,7.2S16.7,19.3,16.5,15.5L16.5,15.5z";
                    icons.grounddisconnector_1 = "M10.4,6.4l7.2,16 M10.4,2.4v4 M3.2,22.4h14.4 M10.4,22.4v19.2 M0,41.6h20.8 M3.2,46.4h14.4 M6.4,51.2h8";
                    icons.grounddisconnector_2 = "M10.4,2.4v4 M3.2,22.4h14.4 M10.4,22.4v19.2 M0,41.6h20.8 M3.2,46.4h14.4 M6.4,51.2h8 M10.4,6.4v16";
                    icons.reactor_p = "M9.5,26.1l0,1.2c6.3,0.1,11.4-4.7,11.5-10.8c0.1-6-4.9-11-11.2-11.1l0,1.2c5.6,0.1,10,4.5,9.9,9.8\n" +
                        "\tC19.7,21.9,15.1,26.2,9.5,26.1C9.6,26.1,9.5,26.1,9.5,26.1z M9.5,26.1l0,1.2c6.3,0.1,11.4-4.7,11.5-10.8c0.1-6-4.9-11-11.2-11.1\n" +
                        "\tl0,1.2c5.6,0.1,10,4.5,9.9,9.8C19.7,21.9,15.1,26.2,9.5,26.1C9.6,26.1,9.5,26.1,9.5,26.1z M10.4,2.4v4 M0,16.8h10.4 M10.4,16.8V36\n" +
                        "\t M0,36h20.8 M3.2,40.8h14.4 M6.4,45.6h8 M0.7,16.1l-1.2,0C-0.6,22.1,4,27,9.9,27.2c5.9,0.2,10.8-4.6,10.9-10.5l-1.2,0\n" +
                        "\tc-0.1,5.3-4.5,9.5-9.7,9.4C4.7,25.9,0.6,21.4,0.7,16.1C0.7,16.1,0.7,16.1,0.7,16.1z M0.7,16.1l-1.2,0C-0.6,22.1,4,27,9.9,27.2\n" +
                        "\tc5.9,0.2,10.8-4.6,10.9-10.5l-1.2,0c-0.1,5.3-4.5,9.5-9.7,9.4C4.7,25.9,0.6,21.4,0.7,16.1C0.7,16.1,0.7,16.1,0.7,16.1z";
                    icons.reactor_s = "M26.6,10.8l1.2,0c0.1-6.1-4.8-11-10.8-11.1S5.9,4.5,5.9,10.6l1.2,0c0.1-5.4,4.5-9.7,9.8-9.7S26.6,5.4,26.6,10.8\n" +
                        "\tL26.6,10.8z M26.6,10.8l1.2,0c0.1-6.1-4.8-11-10.8-11.1S5.9,4.5,5.9,10.6l1.2,0c0.1-5.4,4.5-9.7,9.8-9.7S26.6,5.4,26.6,10.8\n" +
                        "\tL26.6,10.8z M2.4,10.4h4 M16.8,20.8V10.4 M16.8,10.4h14.4 M16.5,19.6l0,1.2c6.2,0,11.2-4.6,11.3-10.5c0-5.8-4.9-10.6-11.1-10.6\n" +
                        "\tl0,1.2c5.5,0,9.9,4.3,9.9,9.4C26.5,15.5,22,19.7,16.5,19.6C16.5,19.6,16.5,19.6,16.5,19.6C16.5,19.6,16.5,19.6,16.5,19.6z\n" +
                        "\t M16.5,19.6l0,1.2c6.2,0,11.2-4.6,11.3-10.5c0-5.8-4.9-10.6-11.1-10.6l0,1.2c5.5,0,9.9,4.3,9.9,9.4C26.5,15.5,22,19.7,16.5,19.6\n" +
                        "\tC16.5,19.6,16.5,19.6,16.5,19.6C16.5,19.6,16.5,19.6,16.5,19.6z";
                    icons.station_1_1 = "M16,0c8.8,0,16,7.2,16,16s-7.2,16-16,16S0,24.8,0,16S7.2,0,16,0z";
                    icons.station_1_2 = "M16,0c8.8,0,16,7.2,16,16s-7.2,16-16,16S0,24.8,0,16S7.2,0,16,0z M16,5c6.1,0,11,4.9,11,11s-4.9,11-11,11\n" +
                        "\tS5,22.1,5,16S9.9,5,16,5z";
                    icons.station_1_3 = "M16,0c8.8,0,16,7.2,16,16s-7.2,16-16,16S0,24.8,0,16S7.2,0,16,0z M16,5c6.1,0,11,4.9,11,11s-4.9,11-11,11\n" +
                        "\tS5,22.1,5,16S9.9,5,16,5z M16,10c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6S12.7,10,16,10z";
                    icons.station_2_1 = "M5,5h32v20H5V5z";
                    icons.station_2_2 = "M5,5h32v20H5V5z M21,9c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6S17.7,9,21,9z";
                    icons.station_2_3 = "M5,5h32v20H5V5z M5,15h16v10";
                    // icons.transformer2_0 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                    //     "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z";
                    icons.transformer2_0 = "M16-4.2c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2-4.2,16-4.2z M16,18.2c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16S0,43,0,34.2S7.2,18.2,16,18.2z";
                    icons.transformer2_0_1 = "M16-2.2c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2-2.2,16-2.2z";
                    icons.transformer2_0_2 = "M16,24.8c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z"
                    icons.transformer2_1 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6";
                    icons.transformer2_2 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6 M8,49.6l8-4.8 M24,49.6l-8-4.8 M16,35.2\n" +
                        "\tv9.6"
                    icons.transformer2_3 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6 M16,51.2L9.6,40 M9.6,40h12.8 M22.4,40\n" +
                        "\tL16,51.2";
                    icons.transformer2_4 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M16,8L9.6,19.2 M9.6,19.2h12.8 M22.4,19.2L16,8";
                    icons.transformer2_5 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M16,8L9.6,19.2 M9.6,19.2h12.8 M22.4,19.2L16,8 M8,49.6l8-4.8 M24,49.6l-8-4.8\n" +
                        "\t M16,35.2v9.6";
                    icons.transformer2_6 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M16,8L9.6,19.2 M9.6,19.2h12.8 M22.4,19.2L16,8 M16,51.2L9.6,40 M9.6,40h12.8\n" +
                        "\t M22.4,40L16,51.2";
                    icons.transformer2_7 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M8,49.6l8-4.8 M24,49.6l-8-4.8 M16,35.2v9.6";
                    icons.transformer2_8 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M16,51.2L9.6,40 M9.6,40h12.8 M22.4,40L16,51.2";
                    icons.transformer3_0 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z";
                    // icons.transformer3_0_1 ="M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z";
                    icons.transformer3_0_1 = "M16-4.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2-4.6,16-4.6z";
                    icons.transformer3_0_2 ="M16,24.8c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z";
                    icons.transformer3_0_3 ="M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z";

                    icons.transformer3_1 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6";
                    icons.transformer3_2 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6 M16,51.2L9.6,40 M9.6,40h12.8 M22.4,40L16,51.2";
                    icons.transformer3_3 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6 M44.8,29.6l-11.2-6.4 M33.6,23.2V36 M33.6,36l11.2-6.4";
                    icons.transformer3_4 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6 M8,49.6l8-4.8 M24,49.6l-8-4.8 M16,35.2v9.6";
                    icons.transformer3_5 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6 M44.8,21.6l-4.8,8 M44.8,37.6l-4.8-8 M30.4,29.6H40";
                    icons.transformer3_6 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6 M44.8,21.6l-4.8,8 M44.8,37.6l-4.8-8 M30.4,29.6H40 M16,51.2L9.6,40 M9.6,40h12.8\n" +
                        "\t M22.4,40L16,51.2";
                    icons.transformer3_7 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6 M8,49.6l8-4.8 M24,49.6l-8-4.8 M16,35.2v9.6 M44.8,29.6l-11.2-6.4 M33.6,23.2V36 M33.6,36\n" +
                        "\tl11.2-6.4";
                    icons.transformer3_8 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6 M16,51.2L9.6,40 M9.6,40h12.8 M22.4,40L16,51.2 M44.8,29.6l-11.2-6.4 M33.6,23.2V36\n" +
                        "\t M33.6,36l11.2-6.4";
                    icons.transformer3_9 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6 M8,49.6l8-4.8 M24,49.6l-8-4.8 M16,35.2v9.6 M44.8,21.6l-4.8,8 M44.8,37.6l-4.8-8\n" +
                        "\t M30.4,29.6H40";
                    icons.transformer3_10 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z M16,8\n" +
                        "\tL9.6,19.2 M9.6,19.2h12.8 M22.4,19.2L16,8";
                    icons.transformer3_11 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z M16,8\n" +
                        "\tL9.6,19.2 M9.6,19.2h12.8 M22.4,19.2L16,8 M16,51.2L9.6,40 M9.6,40h12.8 M22.4,40L16,51.2";
                    icons.transformer3_12 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z M16,8\n" +
                        "\tL9.6,19.2 M9.6,19.2h12.8 M22.4,19.2L16,8 M44.8,29.6l-11.2-6.4 M33.6,23.2V36 M33.6,36l11.2-6.4";
                    icons.transformer3_13 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z M16,8\n" +
                        "\tL9.6,19.2 M9.6,19.2h12.8 M22.4,19.2L16,8 M8,49.6l8-4.8 M24,49.6l-8-4.8 M16,35.2v9.6";
                    icons.transformer3_14 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z M16,8\n" +
                        "\tL9.6,19.2 M9.6,19.2h12.8 M22.4,19.2L16,8 M44.8,21.6l-4.8,8 M44.8,37.6l-4.8-8 M30.4,29.6H40";
                    icons.transformer3_15 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z M16,8\n" +
                        "\tL9.6,19.2 M9.6,19.2h12.8 M22.4,19.2L16,8 M8,49.6l8-4.8 M24,49.6l-8-4.8 M16,35.2v9.6 M44.8,29.6l-11.2-6.4 M33.6,23.2V36 M33.6,36\n" +
                        "\tl11.2-6.4";
                    icons.transformer3_16 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z M16,8\n" +
                        "\tL9.6,19.2 M9.6,19.2h12.8 M22.4,19.2L16,8 M16,51.2L9.6,40 M9.6,40h12.8 M22.4,40L16,51.2 M44.8,21.6l-4.8,8 M44.8,37.6l-4.8-8\n" +
                        "\t M30.4,29.6H40";
                    icons.transformer3_17 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z M16,8\n" +
                        "\tL9.6,19.2 M9.6,19.2h12.8 M22.4,19.2L16,8 M8,49.6l8-4.8 M24,49.6l-8-4.8 M16,35.2v9.6 M44.8,21.6l-4.8,8 M44.8,37.6l-4.8-8\n" +
                        "\t M30.4,29.6H40";
                    icons.transformer3_18 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z M16,8\n" +
                        "\tL9.6,19.2 M9.6,19.2h12.8 M22.4,19.2L16,8 M16,51.2L9.6,40 M9.6,40h12.8 M22.4,40L16,51.2 M44.8,29.6l-11.2-6.4 M33.6,23.2V36\n" +
                        "\t M33.6,36l11.2-6.4";
                    icons.transformer3_19 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M44.8,29.6l-11.2-6.4 M33.6,23.2V36 M33.6,36l11.2-6.4";
                    icons.transformer3_20 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M44.8,29.6l-11.2-6.4 M33.6,23.2V36 M33.6,36l11.2-6.4 M8,49.6l8-4.8 M24,49.6l-8-4.8 M16,35.2v9.6";
                    icons.transformer3_21 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M44.8,29.6l-11.2-6.4 M33.6,23.2V36 M33.6,36l11.2-6.4 M16,51.2L9.6,40 M9.6,40h12.8 M22.4,40L16,51.2";
                    icons.transformer3_22 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M44.8,21.6l-4.8,8 M44.8,37.6l-4.8-8 M30.4,29.6H40";
                    icons.transformer3_23 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M44.8,21.6l-4.8,8 M44.8,37.6l-4.8-8 M30.4,29.6H40 M8,49.6l8-4.8 M24,49.6l-8-4.8 M16,35.2v9.6";
                    icons.transformer3_24 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M44.8,21.6l-4.8,8 M44.8,37.6l-4.8-8 M30.4,29.6H40 M16,51.2L9.6,40 M9.6,40h12.8 M22.4,40L16,51.2";
                    icons.transformer3_25 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M16,51.2L9.6,40 M9.6,40h12.8 M22.4,40L16,51.2";
                    icons.transformer3_26 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M36,13.6c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S27.2,13.6,36,13.6z\n" +
                        "\t M8,49.6l8-4.8 M24,49.6l-8-4.8 M16,35.2v9.6";

                    // icons.ACLink = "M23,14.6l23,14 M45,27.6l-42,18 M1,44.6l44,15 M44,58.6l-42,18 M0,75.6l44,16 M42,91.6l-42,16 M0,106l25,19\n" +
                    //     "\t M23-3.6v20 M23.5,123.9v20";
                    icons.ACLink = "M14.2,25.1L26.9,1.4 M26,2.5l20.2,41 M45.3,45.5L57.9,0.7 M57,1.8l20.2,41 M76.3,44.8L89.9,0 M90,2l18.3,41.1\n" +
                        "\t M106.6,43.2l17.6-26 M-4,26.1L16,25 M123.3,18.7l20-1.1";
                    var $ = go.GraphObject.make;  // for conciseness in defining templates
                    // var resizeAdornment =
                    //     $(go.Adornment, go.Panel.Spot,
                    //         $(go.Placeholder),
                    //         $(go.Shape,  // left resize handle
                    //             {
                    //                 alignment: go.Spot.Left, cursor: "col-resize",
                    //                 desiredSize: new go.Size(6, 6),
                    //             }),
                    //         $(go.Shape,  // right resize handle
                    //             {
                    //                 alignment: go.Spot.Right, cursor: "col-resize",
                    //                 desiredSize: new go.Size(6, 6),
                    //             })
                    //     );
                    var resizeAdornment =
                        $(go.Adornment, go.Panel.Spot,
                            $(go.Placeholder),
                            $(go.Shape,  // left resize handle
                                {
                                    alignment: go.Spot.Left, cursor: "col-resize",
                                    desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "dodgerblue"
                                }),
                            $(go.Shape,  // right resize handle
                                {
                                    alignment: go.Spot.Right, cursor: "col-resize",
                                    desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "dodgerblue"
                                })
                        );

                    function finishDrop(e, grp) {
                        var ok = (grp !== null
                            ? grp.addMembers(grp.diagram.selection, true)
                            : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
                        if (!ok) e.diagram.currentTool.doCancel();
                    }

                    myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
                        {
                            grid: $(go.Panel, "Grid",
                                $(go.Shape, "LineH", {stroke: "rgb(0,0,0,0)", strokeWidth: 0.5}),
                                $(go.Shape, "LineH", {stroke: "rgb(0,0,0,0)", strokeWidth: 0.5, interval: 10}),
                                $(go.Shape, "LineV", {stroke: "rgb(0,0,0,0)", strokeWidth: 0.5}),
                                $(go.Shape, "LineV", {stroke: "rgb(0,0,0,0)", strokeWidth: 0.5, interval: 10})
                            ),
                            // "draggingTool.isGridSnapEnabled": true,  // dragged nodes will snap to a grid of 10x10 cells
                            // "undoManager.isEnabled": true,
                            // "ChangedSelection": onSelectionChanged, // view additional information
                            // "commandHandler.archetypeGroupData": {isGroup: true, category: "OfNodes"},
                            // mouseDrop: function (e) {
                            //     finishDrop(e, null);
                            // },

                            // "draggingTool.dragsLink": true,
                            "draggingTool.isGridSnapEnabled": true,
                            "linkingTool.isUnconnectedLinkValid": true,
                            "linkingTool.portGravity": 20,
                            "relinkingTool.isUnconnectedLinkValid": true,
                            "relinkingTool.portGravity": 20,
                            "relinkingTool.fromHandleArchetype":
                                $(go.Shape, "Diamond", {
                                    segmentIndex: 0,
                                    cursor: "pointer",
                                    desiredSize: new go.Size(12, 12),
                                    fill: "tomato",
                                    stroke: "darkred"
                                }),
                            "relinkingTool.toHandleArchetype":
                                $(go.Shape, "Diamond", {
                                    segmentIndex: -1,
                                    cursor: "pointer",
                                    desiredSize: new go.Size(12, 12),
                                    fill: "darkred",
                                    stroke: "tomato"
                                }),
                            "linkReshapingTool.handleArchetype":
                                $(go.Shape, "Diamond", {
                                    desiredSize: new go.Size(15, 15),
                                    fill: "lightblue",
                                    stroke: "deepskyblue"
                                }),
                            "rotatingTool.handleAngle": 270,
                            "rotatingTool.handleDistance": 30,
                            "rotatingTool.snapAngleMultiple": 15,
                            "rotatingTool.snapAngleEpsilon": 15,
                            "undoManager.isEnabled": true,
                            maxSelectionCount: 1, // users can select only one part at a time
                            "toolManager.hoverDelay": 10,  // how quickly tooltips are shown
                            initialAutoScale: go.Diagram.Uniform,  // scale to show all of the contents
                            "ChangedSelection": onSelectionChanged, // view additional information
                            scale: 0.7,
                            minScale: 0.6,
                            maxScale: 1.5,
                        });

                    // A data binding conversion function. Given an name, return the Geometry.
                    // If there is only a string, replace it with a Geometry object, which can be shared by multiple Shape

                    function portStyle(input) {
                        return {
                            fill: "rgba(255,255,255,0)",
                            stroke: "rgba(0,0,0,0)",
                            // fromSpot: go.Spot.Right,
                            fromLinkable: true,
                            // toSpot: go.Spot.Left,
                            toLinkable: true,
                            toMaxLinks: 100,
                            cursor: "pointer",
                            desiredSize: new go.Size(5, 5),
                        };

                        return{
                                fill: null,  // not seen, by default; set to a translucent gray by showSmallPorts, defined below
                                stroke: null,
                                desiredSize: new go.Size(5, 5),
                                alignment: spot,  // align the port on the main Shape
                                alignmentFocus: spot,  // just inside the Shape
                                portId: name,  // declare this object to be a "port"
                                fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
                                fromLinkable: input, toLinkable: input,  // declare whether the user may draw links to/from here
                                cursor: "pointer"  // show a different cursor to indicate potential link point
                            }
                    }

                    function BarLink() {
                        go.Link.call(this);
                    }

                    go.Diagram.inherit(BarLink, go.Link);

                    BarLink.prototype.getLinkPoint = function (node, port, spot, from, ortho, othernode, otherport) {
                        // var r = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft),
                        //     port.getDocumentPoint(go.Spot.BottomRight));
                        var r = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft),
                            port.getDocumentPoint(go.Spot.BottomRight));
                        var op = otherport.getDocumentPoint(go.Spot.Center);
                        var below = op.y > r.centerY;
                        var below_x = op.x > r.centerX;
                        var y = below ? r.bottom : r.top;
                        var x = below_x ? r.left : r.right;
                        if (node.category === "BusbarSection_0") {
                            if (r.right - r.left < 2) {
                                if (op.y < r.top + 30) return new go.Point(x, r.top + 30);
                                if (op.y > r.bottom - 30) return new go.Point(x, r.bottom - 30);
                                return new go.Point(x, op.y);
                            }
                            else if (r.top - r.bottom < 2) {
                                if (op.x < r.left + 30) return new go.Point(r.left + 30, y);
                                if (op.x > r.right - 30) return new go.Point(r.right - 30, y);
                                return new go.Point(op.x, y);
                            }
                            else {
                                return new go.Point(op.x, op.y);
                            }
                        }
                        else {
                            var lr = op.x - r.centerX;
                            var hl = op.y - r.centerY;

                            if (Math.abs(lr) > Math.abs(hl)) {
                                if (op.x > r.centerX) return new go.Point(r.right, r.centerY);
                                else return new go.Point(r.left, r.centerY);
                                ;
                            } else {
                                if (op.y > r.centerY) y = r.bottom;
                                else y = r.top;
                            }
                            return new go.Point(r.centerX, y);
                        }
                    };
//连接线与节点连接的角度
                    BarLink.prototype.getLinkDirection = function (node, port, linkpoint, spot, from, ortho, othernode, otherport) {
                        var p = port.getDocumentPoint(go.Spot.Center);
                        var r = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft),
                            port.getDocumentPoint(go.Spot.BottomRight));
                        var op = otherport.getDocumentPoint(go.Spot.Center);
                        var below = op.y > r.centerY;
                        var below_x = op.x > r.centerX;
                        var res = 0;
                        if (node.category === "BusbarSection_0") {
                            if (r.right - r.left < 2) {
                                if (below_x) res = 0;
                                else res = 180;
                            }
                            else if (r.top - r.bottom < 2) {
                                if (below) res = 90;
                                else res = 270;
                            }
                            else {
                                res = 0;
                            }
                        }
                        else {
                            var lr = op.x - r.centerX;
                            var hl = op.y - r.centerY;

                            if (Math.abs(lr) > Math.abs(hl)) {
                                if (op.x > r.centerX) res = 0;
                                else res = 180;
                            } else {
                                if (op.y > r.centerY) res = 90;
                                else res = 270;
                            }
                        }

                        // return below ? 90 : 270;
                        return res
                    };

                    function NodeStyle() {
                        return [
                            {
                                locationObjectName: 'main',
                                // locationSpot: go.Spot.TopLeft,
                                // resizeObjectName: "SHAPE", resizeAdornmentTemplate: resizeAdornment,
                                // rotatable:true,
                                // fromLinkable: true, toLinkable: true,
                                locationSpot: go.Spot.Center,
                                rotatable: false,
                                movable:false,
                                margin:0,
                                reshapable:false,
                                text:null,
                            },
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                            new go.Binding("angle", "angle"),
                            new go.Binding("scale", "scale"),
                            // four small named ports, one on each side:
                            // makePort("T", go.Spot.Top, true, true),
                            // makePort("L", go.Spot.Left, true, true),
                            // makePort("R", go.Spot.Right, true, true),
                            // makePort("B", go.Spot.Bottom, true, true),
                            { // handle mouse enter/leave events to show/hide the ports
                                mouseEnter: function (e, node) {
                                    showSmallPorts(node, true);
                                },
                                mouseLeave: function (e, node) {
                                    showSmallPorts(node, false);
                                }
                            }
                        ]
                    }

                    //点击图元参数高亮
                    function SelectNode() {
                        return [
                            {
                                selectionChanged: function (node) {
                                    changeText(node);
                                }
                            },
                        ]
                    }

                    function changeText(node) {
                        var node_select=node.key;
                        var texts_select=myDiagram.findNodesByExample({"msp":node_select});
                        var attr_panel=myDiagram.findNodesByExample({"panel_objId":node_select});
                        var attr_text=myDiagram.findNodesByExample({"attr_objId":node_select});
                        if(node.isSelected) {
                        // if (texts_select.first() != null) {
                        //     texts_select.each(function (text_select) {
                        //         text_select.category = "Text_selected";
                        //     });
                                attr_panel.each(function (panel_select) {
                                    panel_select.category = "OfNodes_selected";
                                });
                                // attr_text.each(function (attr_select) {
                                //     attr_select.category = "TextNode_selected";
                                // })
                            }
                            else {
                                texts_select.each(function (text_select) {
                                    text_select.category = "Text_0";
                                });
                                attr_panel.each(function (panel_select) {
                                    panel_select.category = "OfNodes";
                                })
                        }

                    }

                    myDiagram.addDiagramListener("ObjectSingleClicked", function (e) { //点击事件
                        // var node_select = e.subject.part.data.key || null;    //e.subject.part.data即获取到的data
                        // var texts_select = myDiagram.findNodesByExample({"msp": node_select}) || null;
                        // var attr_panel = myDiagram.findNodesByExample({"panel_objId": node_select}) || null;
                        // var attr_text = myDiagram.findNodesByExample({"attr_objId": node_select}) || null;
                        // if (texts_select != null && texts_select != "undefined") { //如果点击的不是结点，会报错
                        //     // if(node.isSelected) {
                        //     if (texts_select.first() != null && texts_select.first().category == "Text_0") {
                        //         texts_select.each(function (text_select) {
                        //             text_select.category = "Text_selected";
                        //         });
                        //         attr_panel.each(function (panel_select) {
                        //             panel_select.category = "OfNodes_selected";
                        //         });
                        //         attr_text.each(function (attr_select) {
                        //             attr_select.category = "TextNode_selected";
                        //         })
                        //     }
                        //     else {
                        //         texts_select.each(function (text_select) {
                        //             text_select.category = "Text_0";
                        //         });
                        //         attr_panel.each(function (panel_select) {
                        //             panel_select.category = "OfNodes";
                        //         });
                        //         attr_text.each(function (attr_select) {
                        //             attr_select.category = "TextNode";
                        //         })
                        //     }
                        // }

                    });
                    //定义母线节点
                    for (var i = 0; i < nodeDataArray.length; i++) {
                        if (nodeDataArray[i].type == "BusbarSection") {
                            var Spots = [];
                            var pin = nodeDataArray[i].pin;
                            for (var j = 0; j < pin.length; j++) {
                                var Spot =
                                    $(go.Shape, "Circle",
                                        {
                                            fill: pin[j].fill_color,
                                            stroke: pin[j].stroke_color,
                                            fromLinkable: true,
                                            toLinkable: true,
                                            toMaxLinks: 100,
                                            cursor: "pointer",
                                            desiredSize: new go.Size(pin[j].r, pin[j].r),
                                        },
                                        {portId: pin[j].index, alignment: new go.Spot(pin[j].x_pin, pin[j].y_pin)}
                                        // new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)
                                    )

                                Spots.push(Spot);
                            }
                            myDiagram.nodeTemplateMap.add(nodeDataArray[i].key,
                                $(go.Node, "Spot", SelectNode(),
                                    {
                                        locationSpot: go.Spot.Center,
                                    },
                                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),

                                    $(go.Shape, "Rectangle",
                                        {
                                            name: "NODESHAPE", strokeWidth: 3
                                        },
                                        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                                        new go.Binding("stroke", "stroke_color"),
                                        new go.Binding("fill", "fill_color")
                                    ),

                                    Spots
                                )
                            )
                        }
                    }
                    var busbarsection =
                        $(go.Node, SelectNode(), {
                                locationObjectName: 'main',
                                locationSpot: go.Spot.TopLeft,
                            },
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                            { // special resizing: just at the ends
                                resizable: true, resizeObjectName: "SHAPE", resizeAdornmentTemplate: resizeAdornment,
                                rotatable: true,
                                fromLinkable: true, toLinkable: true
                            },
                            $(go.Shape,
                                { // horizontal line stretched to an initial width of 200
                                    name: "SHAPE", geometryString: "M0 0 L100 0 H1",
                                    fill: "transparent", stroke: "#000000", width: 100,
                                    width: 100
                                },
                                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
                            new go.Binding("stroke", "stroke_color"),
                            new go.Binding("fill", "fill_color")
                        );
                    var capacitor_p =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    geometry: go.Geometry.parse(icons.capacitor_p, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)})
                            makePort("0", go.Spot.Top, true, true)
                        );
                    var capacitor_s =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    geometry: go.Geometry.parse(icons.capacitor_s, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0, 0.5)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(1, 0.5)})

                        makePort("0", new go.Spot(0, 0.5), true, true),
                        makePort("1", new go.Spot(1, 0.5), true, true)
                        );
                    var cbreaker_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.cbreaker_1, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)})

                            makePort("0", new go.Spot(0.5, 0), true, true),
                            makePort("1", new go.Spot(0.5, 1), true, true)
                        );
                    var cbreaker_2 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    geometry: go.Geometry.parse(icons.cbreaker_2, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)})
                            makePort("0", new go.Spot(0.5, 0), true, true),
                            makePort("1", new go.Spot(0.5, 1), true, true)
                        );
                    var disconnector_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    geometry: go.Geometry.parse(icons.disconnector_1, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)})
                        makePort("0", new go.Spot(0.5, 0), true, true),
                        makePort("1", new go.Spot(0.5, 1), true, true)
                        );
                    var disconnector_2 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    geometry: go.Geometry.parse(icons.disconnector_2, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)})
                            makePort("0", new go.Spot(0.5, 0), true, true),
                            makePort("1", new go.Spot(0.5, 1), true, true)
                        );
                    var disconnector_3 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    geometry: go.Geometry.parse(icons.disconnector_3, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)})
                            makePort("0", new go.Spot(0.5, 0), true, true),
                            makePort("1", new go.Spot(0.5, 1), true, true)
                        );
                    var energyconsumer_0 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    toShortLength: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.energyconsumer_0, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),

                            makePort("0", new go.Spot(0.5, 0.039), true, true)
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)})
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)})
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "2", alignment: new go.Spot(0, 0.5)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "3", alignment: new go.Spot(1, 0.5)})
                        );
                    var energyconsumer_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            { margin: 0,},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    fill: "#fafcfa",
                                    geometry: go.Geometry.parse(icons.energyconsumer_1, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "2", alignment: new go.Spot(0, 0.5)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "3", alignment: new go.Spot(1, 0.5)})
                            makePort("T", go.Spot.Top, true, true),
                            makePort("B", go.Spot.Bottom, true, true),
                            makePort("L", go.Spot.Left, true, true),
                            makePort("R", go.Spot.Right, true, true)
                        );
                    var generalmeter =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    geometry: go.Geometry.parse(icons.generalmeter, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)})
                            makePort("0", new go.Spot(0.5, 0), true, true),
                            makePort("1", new go.Spot(0.5, 1), true, true)
                        );
                    var generator =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},{doubleClick:OnmChange},
                            { margin: 0,},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    fill: "#fafcfa",
                                    geometry: go.Geometry.parse(icons.generator, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            makePort("T", go.Spot.Top, true, true),
                            makePort("B", go.Spot.Bottom, true, true),
                            makePort("L", go.Spot.Left, true, true),
                            makePort("R", go.Spot.Right, true, true)
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "2", alignment: new go.Spot(0, 0.5)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "3", alignment: new go.Spot(1, 0.5)})
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                        );
                    var grounddisconnector_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    geometry: go.Geometry.parse(icons.grounddisconnector_1, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)})
                            makePort("0", new go.Spot(0.5, 0), true, true)
                        );
                    var grounddisconnector_2 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    geometry: go.Geometry.parse(icons.grounddisconnector_2, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)})
                            makePort("0", new go.Spot(0.5, 0), true, true)
                        );
                    var reactor_p =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    geometry: go.Geometry.parse(icons.reactor_p, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)})
                            makePort("0", new go.Spot(0.5, 0), true, true)
                        );
                    var reactor_s =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    geometry: go.Geometry.parse(icons.reactor_s, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0, 0.5)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(1, 0.5)})

                            makePort("0", new go.Spot(0, 0.5), true, true),
                            makePort("1", new go.Spot(1, 0.5), true, true)
                        );
                    var station_1_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.station_1_1, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                            makePort("0", new go.Spot(0.5, 0), true, true),
                            makePort("1", new go.Spot(0.5, 1), true, true),
                            makePort("2", new go.Spot(0, 0.5), true, true),
                            makePort("3", new go.Spot(1, 0.5), true, true)
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "2", alignment: new go.Spot(0, 0.5)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "3", alignment: new go.Spot(1, 0.5)})
                        );
                    var station_1_2 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.station_1_2, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                            makePort("0", new go.Spot(0.5, 0), true, true),
                            makePort("1", new go.Spot(0.5, 1), true, true),
                            makePort("2", new go.Spot(0, 0.5), true, true),
                            makePort("3", new go.Spot(1, 0.5), true, true)
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "2", alignment: new go.Spot(0, 0.5)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "3", alignment: new go.Spot(1, 0.5)})
                        );
                    var station_1_3 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.station_1_3, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                            makePort("0", new go.Spot(0.5, 0), true, true),
                            makePort("1", new go.Spot(0.5, 1), true, true),
                            makePort("2", new go.Spot(0, 0.5), true, true),
                            makePort("3", new go.Spot(1, 0.5), true, true)
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "2", alignment: new go.Spot(0, 0.5)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "3", alignment: new go.Spot(1, 0.5)})
                        );
                    var station_2_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.station_2_1, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                            makePort("0", new go.Spot(0.5, 0), true, true),
                            makePort("1", new go.Spot(0.5, 1), true, true),
                            makePort("2", new go.Spot(0, 0.5), true, true),
                            makePort("3", new go.Spot(1, 0.5), true, true)
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "2", alignment: new go.Spot(0, 0.5)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "3", alignment: new go.Spot(1, 0.5)})
                        );
                    var station_2_2 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.station_2_2, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                            makePort("0", new go.Spot(0.5, 0), true, true),
                            makePort("1", new go.Spot(0.5, 1), true, true),
                            makePort("2", new go.Spot(0, 0.5), true, true),
                            makePort("3", new go.Spot(1, 0.5), true, true)
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "2", alignment: new go.Spot(0, 0.5)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "3", alignment: new go.Spot(1, 0.5)})
                        );
                    var station_2_3 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    margin: 0,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.station_2_3, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                            makePort("0", new go.Spot(0.5, 0), true, true),
                            makePort("1", new go.Spot(0.5, 1), true, true),
                            makePort("2", new go.Spot(0, 0.5), true, true),
                            makePort("3", new go.Spot(1, 0.5), true, true)
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "2", alignment: new go.Spot(0, 0.5)}),
                            // $(go.Shape, "Circle", portStyle(true),
                            //     {portId: "3", alignment: new go.Spot(1, 0.5)})
                        );
                    var i = 0;
                    function attr2Stroke(geometry_2_stroke) { //两变卷线段颜色
                        return geometry_2_stroke;
                    }
                    function transformer2Geometry(geometry_2_stroke){ //两卷变拼接

                        // alert(geometry_2);
                        switch (i) {
                            case 0:
                                // alert("");
                                i = i + 1; //itemArray只能绑定一个，用0，1区分上下圆
                                return go.Geometry.parse(icons.transformer2_0_1,true);

                            case 1:
                                i = 0;
                                return go.Geometry.parse(icons.transformer2_0_2,true);

                        }
                    }

                    var transformer2_0 = $(go.Node,"Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                        $(go.Panel,
                            { name: "ICON" ,margin: 0},
                            $(go.Shape, "Circle",
                                // { strokeWidth: 2, fill: "white", stroke: "#919191", portId: "" }
                                {strokeWidth: 2, margin: 0,fill: "white",stroke:null,geometry: go.Geometry.parse(icons.transformer2_0, true)}
                                ),
                            $(go.Panel,
                                { // for each attribute show a Shape at a particular place in the overall square
                                    itemTemplate:
                                        $(go.Panel,
                                            $(go.Shape,
                                                {fill: null,strokeWidth: 2 ,margin: 0},
                                                new go.Binding("stroke", "", attr2Stroke),
                                                new go.Binding("geometry", "", transformer2Geometry))),
                                    margin: 0
                                },
                                new go.Binding("itemArray", "geometry_2_stroke")

                                // makePort("T", new go.Spot(0.5, 1), true, true),
                                // makePort("B", new go.Spot(0.5, 0), true, true)
                            )


                ),
                        // $(go.Shape, "Circle", portStyle(true),
                        //     {portId: "0",margin:0, alignment: new go.Spot(0.5, 0)}),
                        // $(go.Shape, "Circle", portStyle(true),
                        //     {portId: "1",margin:0, alignment: new go.Spot(0.5, 1)})

                        makePort("1", new go.Spot(0.5, 1), true, true),
                        makePort("0", new go.Spot(0.5, 0), true, true)

                    )
                    // var transformer2_0 =
                    //     $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                    //         $(go.Shape, {
                    //                 name: 'icon',
                    //                 strokeWidth: 2,
                    //                 fill: "rgba(0,0,0,0)",
                    //                 geometry: go.Geometry.parse(icons.transformer2_0, true)
                    //             },
                    //             // new go.Binding("stroke", "stroke_color")
                    //             // new go.Binding("stroke", "",attrFill)
                    //             // alert(attrFill)
                    //             new go.Binding("fill", "fill_color")
                    //             // new go.Binding("strokeWidth", "lw")
                    //         ),
                    //         $(go.Panel,
                    //             { // for each attribute show a Shape at a particular place in the overall square
                    //                 itemTemplate:
                    //                     $(go.Panel,
                    //                         $(go.Shape,
                    //                             // { stroke: null, strokeWidth: 0 },
                    //                             new go.Binding("stroke", "", attrStroke),
                    //                             new go.Binding("geometry", "", transformer2Geometry))
                    //                     ),
                    //                 margin: 1
                    //             },
                    //             // new go.Binding("itemArray", "geometry_2_stroke"),
                    //             // new go.Binding("itemArray", "geometry_2")
                    //             new go.Binding("itemArray", "a")
                    //         ),
                    //         $(go.Shape, "Circle", portStyle(true),
                    //             {portId: "0", alignment: new go.Spot(0.5, 0)}),
                    //         $(go.Shape, "Circle", portStyle(true),
                    //             {portId: "1", alignment: new go.Spot(0.5, 1)})
                    //     );
                    var transformer2_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer2_1, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)})
                        );
                    var transformer2_2 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer2_2, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)})
                        );
                    var transformer2_3 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer2_3, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)})
                        );
                    var transformer2_4 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer2_4, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)})
                        );
                    var transformer2_5 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer2_5, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)})
                        );
                    var transformer2_6 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer2_6, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)})
                        );
                    var transformer2_7 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer2_7, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)})
                        );
                    var transformer2_8 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer2_8, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)})
                        );

                    var j =0;
                    function attr3Stroke(geometry_3_stroke) {
                        return geometry_3_stroke;
                    }
                    function transformer3Geometry(geometry_2_stroke){

                        // alert(geometry_2);
                        switch (j) {
                            case 0:
                                j = j + 1;
                                return go.Geometry.parse(icons.transformer3_0_1,true);

                            case 1:
                                j = j + 1;
                                return go.Geometry.parse(icons.transformer3_0_2,true);

                            case 2:
                                j = 0;
                                return go.Geometry.parse(icons.transformer3_0_3,true);

                        }
                    }

                    var transformer3_0 = $(go.Node,"Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                        $(go.Panel,
                            { name: "ICON",margin: 0},
                            $(go.Shape, "Circle",
                                {strokeWidth: 2,margin: 0, fill: "white",stroke:null,geometry: go.Geometry.parse(icons.transformer3_0, true)}
                            ),
                            $(go.Panel,
                                {
                                    itemTemplate:
                                        $(go.Panel,
                                            $(go.Shape,
                                                {fill: null,strokeWidth: 2 ,margin: 0},
                                                new go.Binding("stroke", "", attr3Stroke),
                                                new go.Binding("geometry", "", transformer3Geometry)
                                            )
                                        ),
                                    margin: 0
                                },
                                new go.Binding("itemArray", "geometry_3_stroke")

                        )),
                        // $(go.Shape, "Circle", portStyle(true),
                        //     {portId: "0", alignment: new go.Spot(0.31,0)}),
                        // $(go.Shape, "Circle", portStyle(true),
                        //     {portId: "1", alignment: new go.Spot(1, 0.5)}),
                        // $(go.Shape, "Circle", portStyle(true),
                        //     {portId: "2", alignment: new go.Spot(0.31,1)})

                        makePort("0", new go.Spot(0.31,0), true, true),
                        makePort("1", new go.Spot(1, 0.5), true, true),
                        makePort("2", new go.Spot(0.31,1), true, true)

                    )
                    // var transformer3_0 =
                    //     $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                    //         $(go.Shape, {
                    //                 name: 'icon',
                    //                 strokeWidth: 2,
                    //                 fill: "rgba(0,0,0,0)",
                    //                 geometry: go.Geometry.parse(icons.transformer3_0, true)
                    //             },
                    //             new go.Binding("stroke", "stroke_color")
                    //             // new go.Binding("fill", "fill_color")
                    //             // new go.Binding("strokeWidth", "lw")
                    //         ),
                    //         $(go.Shape, "Circle", portStyle(true),
                    //             {portId: "0", alignment: new go.Spot(0.5, 0)}),
                    //         $(go.Shape, "Circle", portStyle(true),
                    //             {portId: "1", alignment: new go.Spot(0.5, 1)}),
                    //         $(go.Shape, "Circle", portStyle(true),
                    //             {portId: "2", alignment: new go.Spot(1, 0.5)})
                    //     );
                    var transformer3_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_1, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_2 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_2, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_3 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_3, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_4 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_4, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_5 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_5, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_6 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_6, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),

                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_7 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_7, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_8 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_8, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_9 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_9, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_10 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_10, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_11 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_11, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_12 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_12, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_13 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_13, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_14 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_14, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_15 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_15, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_16 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_16, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_17 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_17, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_18 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_18, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_19 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_19, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_20 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_20, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_21 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_21, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_22 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_22, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_23 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_23, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_24 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_24, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_25 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_25, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var transformer3_26 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),{doubleClick:OnmChange},
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_26, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "2", alignment: new go.Spot(1, 0.5)})
                        );
                    var text =
                        $(go.Node, "Auto",
                            {
                                locationObjectName: 'main',
                                locationSpot: go.Spot.TopLeft,
                            },
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                            $(go.Panel, "Vertical",
                                // define the panel where the text will appear
                                $(go.TextBlock, // the name
                                    {
                                        margin: 5,
                                        editable: false,
                                        opacity: 0.75,
                                        stroke: "#42ff4c",
                                    },
                                    new go.Binding("text", "ts").makeTwoWay(),
                                    new go.Binding("stroke", "stroke_color"),
                                    new go.Binding("font", "ff"),
                                    new go.Binding("fill", "fill_color"),
                                    new go.Binding("strokeWidth", "lw"),
                                    new go.Binding("strokeDashArray", "ls"),
                                    new go.Binding("angle", "angle"),
                                    new go.Binding("scale", "scale"))
                            )
                        );


                    var text_selected =
                        $(go.Node, "Auto",
                            {
                                locationObjectName: 'main',
                                locationSpot: go.Spot.TopLeft,
                            },
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                            $(go.Panel, "Vertical",
                                // define the panel where the text will appear
                                $(go.TextBlock, // the name
                                    {
                                        margin: 5,
                                        editable: false,
                                        opacity: 0.75,
                                        stroke: "#ff1e3a",
                                    },
                                    new go.Binding("text", "ts").makeTwoWay(),
                                    new go.Binding("font", "ff"),
                                    new go.Binding("strokeWidth", "lw"),
                                    new go.Binding("strokeDashArray", "ls"),
                                    new go.Binding("angle", "angle"),
                                    new go.Binding("scale", "scale"))
                            )
                        );

                    var groupNode =
                        $(go.Group, "Auto",
                            {
                                isShadowed: true,//阴影
                                movable: true,//允许拖动
                                locationSpot: go.Spot.RightCenter, locationObjectName: "SHAPE",
                                selectionObjectName: "SHAPE",
                                background: "transparent",
                                ungroupable: true,
                                computesBoundsAfterDrag: true,
                                // when the selection is dropped into a Group, add the selected Parts into that Group;
                                // if it fails, cancel the tool, rolling back any changes
                                mouseDrop: finishDrop,
                                handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
                                // Groups containing Nodes lay out their members vertically
                                layout:
                                    $(go.GridLayout,
                                        {
                                            wrappingColumn: 1, alignment: go.GridLayout.Position,
                                            cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                                        })
                            },
                            new go.Binding("background", "isHighlighted", function (h) {
                                return h ? "rgba(255,0,0,0.2)" : "transparent";
                            }).ofObject(),

                            $(go.Shape, "Rectangle",
                                // {fill: "rgba(0,0,0,0)", stroke: null, strokeWidth: 2}),
                                {fill: "rgba(255,102,102,0.3)", stroke: null, strokeWidth: 2}),
                            $(go.Panel, "Vertical",  // title above Placeholder
                                $(go.Placeholder,
                                    {padding: 5, alignment: go.Spot.TopRight})
                            ),  // end Vertical Panel
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)
                        )


                    var groupNode_selected =
                        $(go.Group, "Auto",
                            {
                                isShadowed: true,//阴影
                                movable: true,//允许拖动
                                locationSpot: go.Spot.RightCenter, locationObjectName: "SHAPE",
                                selectionObjectName: "SHAPE",
                                background: "transparent",
                                ungroupable: true,
                                computesBoundsAfterDrag: true,
                                // when the selection is dropped into a Group, add the selected Parts into that Group;
                                // if it fails, cancel the tool, rolling back any changes
                                mouseDrop: finishDrop,
                                handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
                                // Groups containing Nodes lay out their members vertically
                                layout:
                                    $(go.GridLayout,
                                        {
                                            wrappingColumn: 1, alignment: go.GridLayout.Position,
                                            cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                                        })
                            },
                            new go.Binding("background", "isHighlighted", function (h) {
                                return h ? "rgba(255,0,0,0.2)" : "transparent";
                            }).ofObject(),

                            $(go.Shape, "Rectangle",
                                {fill: "rgba(255,153,51,0.6)", stroke: null, strokeWidth: 2}),
                            $(go.Panel, "Vertical",  // title above Placeholder
                                $(go.Placeholder,
                                    {padding: 5, alignment: go.Spot.TopRight})
                            ),  // end Vertical Panel
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)
                        )
                    var attrNode =
                        $(go.Node, "Auto",
                            { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
                                mouseDrop: function (e, nod) {
                                    finishDrop(e, nod.containingGroup);
                                }
                            },
                            $(go.Shape, "Rectangle",
                                {fill: "rgba(0,0,0,0)", stroke: null},
                                // {fill: "rgba(255,102,102,0.3)", stroke: null},
                                new go.Binding("fill", "color")),
                            $(go.Panel, "Table",
                                {
                                    minSize: new go.Size(0, NaN),
                                    maxSize: new go.Size(100, NaN),
                                    margin: new go.Margin(6, 10, 0, 6),
                                    defaultAlignment: go.Spot.Left
                                },
                                $(go.RowColumnDefinition, {column: 2, width: 1}),
                                $(go.TextBlock, // the name
                                    {
                                        row: 0, column: 0,
                                        font: "5pt Segoe UI,sans-serif",
                                        stroke: null,
                                        stroke: "#000",
                                        editable: true, isMultiline: false,
                                    },
                                    new go.Binding("text", "text").makeTwoWay()),
                                $(go.TextBlock,
                                    {
                                        row: 0, column: 1,
                                        font: "5pt Segoe UI,sans-serif",
                                        editable: true, isMultiline: false,
                                        stroke: null,
                                        // stroke: "#000",
                                        margin: new go.Margin(0, 0, 0, 3)
                                    },
                                    new go.Binding("text", "value").makeTwoWay())
                            ), // end Table Panel
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)
                        )

                    var attrNode_selected =
                        $(go.Node, "Auto",
                            { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
                                mouseDrop: function (e, nod) {
                                    finishDrop(e, nod.containingGroup);
                                }
                            },
                            // $(go.Shape, "Rectangle",
                            //     // {fill: "rgba(255,153,51,0.6)", stroke: null},
                            //     {fill: "rgba(0,0,0,0)", stroke: null},
                            //     new go.Binding("fill", "color")),
                            // $(go.Panel, "Table",
                            //     {
                            //         minSize: new go.Size(0, NaN),
                            //         maxSize: new go.Size(100, NaN),
                            //         margin: new go.Margin(6, 10, 0, 6),
                            //         defaultAlignment: go.Spot.Left
                            //     },
                            //     $(go.RowColumnDefinition, {column: 2, width: 1}),
                            //     $(go.TextBlock, // the name
                            //         {
                            //             row: 0, column: 0,
                            //             font: "5pt Segoe UI,sans-serif",
                            //             stroke: "#000",
                            //             editable: true, isMultiline: false,
                            //         },
                            //         new go.Binding("text", "text").makeTwoWay()),
                            //     $(go.TextBlock,
                            //         {
                            //             row: 0, column: 1,
                            //             font: "5pt Segoe UI,sans-serif",
                            //             editable: true, isMultiline: false,
                            //             stroke: "#000",
                            //             margin: new go.Margin(0, 0, 0, 3)
                            //         },
                            //         new go.Binding("text", "value").makeTwoWay())
                            // ), // end Table Panel
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)
                        )
                    myDiagram.nodeTemplate =
                        $(go.Node, "Auto",SelectNode(),
                            {doubleClick:OnmChange},
                            {
                                locationObjectName: 'main',
                                locationSpot: go.Spot.TopLeft
                            },
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                            $(go.Shape, "Rectangle",
                                {
                                    name: "SHAPE", fill: "transparent", stroke: null,
                                    // set the port properties:
                                    portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
                                }
                            ),
                            $(go.Panel, "Vertical",
                                // define the panel where the text will appear
                                $(go.TextBlock, // the name
                                    {

                                        margin: 5,
                                        editable: true,
                                        opacity: 0.75,
                                    },
                                    new go.Binding("text", "ts").makeTwoWay(),
                                    new go.Binding("stroke", "stroke_color"),
                                    new go.Binding("font", "ff"),
                                    new go.Binding("fill", "fill_color"),
                                    new go.Binding("strokeWidth", "lw"),
                                    new go.Binding("strokeDashArray", "ls"),
                                    new go.Binding("angle", "angle"),
                                    new go.Binding("scale", "scale"))
                            )
                        );  // end Node


                    //交流线
                    myDiagram.linkTemplateMap.add("ACLineEnd",
                     $(go.Link,
                            {relinkableFrom: true, relinkableTo: true, reshapable: true},
                            {
                                routing: go.Link.Normal,
                                curve: go.Link.JumpOver,
                                corner: 0,
                                toShortLength: 0
                            },
                            new go.Binding("points", "points").makeTwoWay(),
                            $(go.Shape,
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color"),
                                new go.Binding("strokeWidth", "lw"),
                                new go.Binding("strokeDashArray", "ls"),
                                new go.Binding("angle", "angle"),
                                new go.Binding("scale", "scale")
                            ),
                         // this.archetypeLabelNodeData ={ category: "valve" }
                            $(go.Shape,"Resistor",
                             {
                                 // scale: 0,
                                 // width:45,
                                 // height: 100,
                                 margin:0,
                                 fill:null,
                                 // background:"#fafcfa",
                                 background: $(go.Brush, "Linear", {
                                     0.0: "transparent",
                                     0.0001: "white",
                                     0.9999: "white",
                                     1: "transparent",
                                     start: new go.Spot(0.001,0.49),end:new go.Spot(0.999,0.51),}),
                                 desiredSize: new go.Size(30, 10),
                                 segmentOrientation: go.Link.OrientUpright,
                                 alignmentFocus: new go.Spot(0.5, 0.5),
                                 //geometry: go.Geometry.parse(icons.ACLink, true)
                             },
                             new go.Binding("stroke", "stroke_color")
                         )
                        )
                    );
                    //直流线
                    myDiagram.linkTemplateMap.add("DCLineEnd",
                        $(go.Link,
                            {relinkableFrom: true, relinkableTo: true, reshapable: true},
                            {
                                routing: go.Link.Normal,
                                curve: go.Link.JumpOver,
                                corner: 0,
                                toShortLength: 0,
                            },
                            new go.Binding("points", "points").makeTwoWay(),
                            $(go.Shape,
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color"),
                                new go.Binding("strokeWidth", "lw"),
                                new go.Binding("strokeDashArray", "ls"),
                                new go.Binding("angle", "angle"),
                                new go.Binding("scale", "scale")
                            ),
                            $(go.Shape,  // the "to" arrowhead
                                {fromArrow: "BackwardLineFork", scale: 2,},
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                            ),
                            $(go.Shape,  // the "to" arrowhead
                                {toArrow: "LineFork", scale: 2,},
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                            )
                        ));
                    //普通连线
                    myDiagram.linkTemplate =
                        $(go.Link,
                            { relinkableFrom: true, relinkableTo: true, reshapable: true },
                            {
                                routing: go.Link.Normal,
                                curve: go.Link.JumpOver,
                                corner: 0,
                                toShortLength: 0,
                                margin: 0
                            },
                            new go.Binding("points","points").makeTwoWay(),
                            $(go.Shape,
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color"),
                                new go.Binding("strokeWidth", "lw"),
                                new go.Binding("strokeDashArray", "ls"),
                                new go.Binding("angle", "angle"),
                                new go.Binding("scale", "scale")
                            ));

                    function makePort(name, spot, output, input) {
                        // the port is basically just a small transparent square
                        return $(go.Shape, "Circle",
                            {
                                fill: null,  // not seen, by default; set to a translucent gray by showSmallPorts, defined below
                                stroke: null,
                                desiredSize: new go.Size(1, 1),
                                alignment: spot,  // align the port on the main Shape
                                alignmentFocus: spot,  // just inside the Shape
                                portId: name,  // declare this object to be a "port"
                                // fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
                                fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
                                cursor: "pointer"  // show a different cursor to indicate potential link point
                            });
                    }

                    function showSmallPorts(node, show) {
                        node.ports.each(function (port) {
                            if (port.portId !== "") {  // don't change the default port, which is the big shape
                                port.fill = show ? "rgba(0,0,0,.1)" : null;
                            }
                        });
                    }

                    function spotConverter(dir) {
                        // console.log(dir)
                        if (dir === "top") return go.Spot.TopSide;
                        if (dir === "left") return go.Spot.LeftSide;
                        if (dir === "right") return go.Spot.RightSide;
                        if (dir === "bottom") return go.Spot.BottomSide;
                        if (dir === "rightsingle") return go.Spot.Right;
                    }

                    myDiagram.nodeTemplateMap.add("select",
                        $(go.Node, "Spot",SelectNode(),
                            {doubleClick:OnmChange},
                            // {
                            //     selectionChanged: function(node) {
                            //         console.log("node:",node);
                            //         if(node.isSelected) {
                            //             node.category="";
                            //         } else {
                            //             node.category="select";
                            //         }
                            //     }
                            // },
                            {
                                locationObjectName: 'main',
                                locationSpot: go.Spot.Center,
                                rotatable: true,
                            },
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                            // The main element of the Spot panel is a vertical panel housing an optional icon,
                            // plus a rectangle that acts as the port
                            $(go.Panel, "Vertical",

                                $(go.Picture,
                                    {
                                        desiredSize: new go.Size(100, 100),
                                    },
                                    new go.Binding("source", "icon", geoFunc))
                            ),


                            // four small named ports, one on each side:
                            // makePort("T", go.Spot.Top, true, true),
                            // makePort("L", go.Spot.Left, true, true),
                            // makePort("R", go.Spot.Right, true, true),
                            // makePort("B", go.Spot.Bottom, true, true),
                            { // handle mouse enter/leave events to show/hide the ports
                                mouseEnter: function (e, node) {
                                    showSmallPorts(node, true);
                                },
                                mouseLeave: function (e, node) {
                                    showSmallPorts(node, false);
                                }
                            }
                        ),
                        myDiagram.nodeTemplate =
                            $(go.Node, "Spot",SelectNode(),
                                {doubleClick:OnmChange},
                                // {
                                //     selectionChanged: function(node) {
                                //         console.log("node:",node);
                                //         if(node.isSelected) {
                                //             node.category="";
                                //         } else {
                                //             node.category="select";
                                //         }
                                //     }
                                // },
                                {
                                    locationObjectName: 'main',
                                    locationSpot: go.Spot.Center,
                                    rotatable: true,
                                },
                                new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                                // The main element of the Spot panel is a vertical panel housing an optional icon,
                                // plus a rectangle that acts as the port
                                $(go.Panel, "Vertical",

                                    $(go.Picture,
                                        {
                                            desiredSize: new go.Size(100, 100),
                                        },
                                        new go.Binding("source", "icon", geoFunc)),
                                    $(go.TextBlock, {
                                            font: "14px Lato, sans-serif",
                                            textAlign: "center",
                                            margin: 3,
                                            stroke: "white",
                                            editable: true,
                                            maxSize: new go.Size(100, NaN),
                                            alignment: go.Spot.TopCenter,
                                            alignmentFocus: go.Spot.BottomCenter
                                        },

                                        new go.Binding("text"))
                                ),

                                // four small named ports, one on each side:
                                // makePort("T", go.Spot.Top, true, true),
                                // makePort("L", go.Spot.Left, true, true),
                                // makePort("R", go.Spot.Right, true, true),
                                // makePort("B", go.Spot.Bottom, true, true),
                                { // handle mouse enter/leave events to show/hide the ports
                                    mouseEnter: function (e, node) {
                                        showSmallPorts(node, true);
                                    },
                                    mouseLeave: function (e, node) {
                                        showSmallPorts(node, false);
                                    }
                                }
                            ),


                    // Some links need a custom to or from spot
                        function spotConverter(dir) {
                            // console.log(dir)
                            if (dir === "top") return go.Spot.TopSide;
                            if (dir === "left") return go.Spot.LeftSide;
                            if (dir === "right") return go.Spot.RightSide;
                            if (dir === "bottom") return go.Spot.BottomSide;
                            if (dir === "rightsingle") return go.Spot.Right;
                        },



                        myDiagram.linkTemplate =
                            $(BarLink,
                                { relinkableFrom: true, relinkableTo: true, reshapable: true },
                                {
                                    routing: go.Link.Normal,
                                    curve: go.Link.JumpOver,
                                    corner: 0,
                                    toShortLength: 0,
                                    margin: 0
                                },
                                new go.Binding("points","points").makeTwoWay(),
                                $(go.Shape,
                                    new go.Binding("stroke", "stroke_color"),
                                    new go.Binding("fill", "fill_color"),
                                    new go.Binding("strokeWidth", "lw"),
                                    new go.Binding("strokeDashArray", "ls"),
                                    new go.Binding("angle", "angle"),
                                    new go.Binding("scale", "scale")
                                ))),

                    myDiagram.nodeTemplate.contextMenu =
                        $("ContextMenu",
                            // $("ContextMenuButton",
                            //     $(go.TextBlock, "在线仿真显示指标配置"),
                            //     {
                            //         click: OnsChange,
                            //     }
                            // ),
                            // $("ContextMenuButton",
                            //     $(go.TextBlock, "离线仿真显示指标配置"),
                            //     {
                            //         click:OfsChange,
                            //     }
                            // ),
                            $("ContextMenuButton",
                                $(go.TextBlock, "在线监测显示指标配置"),
                                {
                                    click:OnmChange,
                                }
                            )
                        )

                        //在线监测指标显示配置
                        function OnmChange(e,node){
                            showLabelOnm(node.part.data["key"], e.event.clientX - 10, e.event.clientY - 10);
                        }
                        function showLabelOnm(key, x, y) {


                        console.log("swan_objs_res",swan_objs_res);
                            var html="";
                            for (var i in swan_objs_res) {
                                var goKey = swan_objs_res[i].goKey;
                                if (key == goKey) {
                                    var attrs = swan_objs_res[i].attrs;
                                    if (attrs.length > 0) {
                                        var para = {};//参数名称
                                        var attrs_id={}//参数ID
                                        var onm = {};//参数显示标志
                                        for (var j in attrs) {
                                            para[attrs[j]["objName"]] = attrs[j]["id"].toString();
                                            onm[attrs[j]["objName"]] = attrs[j]["onlineMonitor"];
                                            attrs_id[attrs[j]["objName"]] = attrs[j]["id"];
                                        }
                                        console.log("onm:",onm);
                                        for (var i in para) {
                                            console.log("i:",onm[i]);
                                            if (onm[i] == false) {
                                                html += '<tr><td><input type="checkbox" name="'+goKey+'" onclick="changeParaOnm(this,'+attrs_id[i]+')"  id="'+attrs_id[i]+'">' + i+'</td></tr>';
                                                console.log("html",html);
                                            } else {
                                                html += '<tr><td><input type="checkbox" name="'+goKey+'" onclick="changeParaOnm(this,'+attrs_id[i]+')" checked="true" id="'+attrs_id[i]+'">' + i+'</td></tr>';
                                                console.log("html",html);
                                            }
                                        }
                                        console.log(html);
                                        var div=document.getElementById("layer_onm");
                                        var check=document.getElementById("check_onm");
                                        div.style.left = x + 'px';  // 指定创建的DIV在文档中距离左侧的位置
                                        div.style.top = y + 'px';  // 指定创建的DIV在文档中距离顶部的位置
                                        div.style.display="block";
                                        check.innerHTML = html;
                                        //
                                        // document.body.appendChild(oDiv);
                                    }
                                }
                            }
                        }


                    //监听元件拖动事件
                    myDiagram.addModelChangedListener(function (evt) {
                        if (!evt.isTransactionFinished) return;
                        var txn = evt.object;  // a Transaction
                        if (txn === null) return;
                        // iterate over all of the actual ChangedEvents of the Transaction
                        txn.changes.each(function (e) {
                            if (e.Dj == "location") {
                                if (e.object != null) {
                                    var node_key = e.object.key;
                                    var attr_panel = myDiagram.findNodesByExample({"panel_objId": node_key});
                                    var attr_text = myDiagram.findNodesByExample({"attr_objId": node_key});
                                    var texts_select = myDiagram.findNodesByExample({"msp": node_key});
                                    var changeX = e.newValue.x - e.oldValue.x;
                                    var changeY = e.newValue.y - e.oldValue.y;

                                    attr_panel.each(function (panel_select) {
                                        var pos = panel_select.data["pos"].trim().split(" ")
                                        var x = new Number(pos[0]) + changeX;
                                        var y = new Number(pos[1]) + changeY;
                                        var loc = (x).toString() + " " + (y).toString();
                                        panel_select.data.pos = loc;
                                        myDiagram.model.updateTargetBindings(panel_select.data);
                                    });
                                    attr_text.each(function (attr_select) {
                                        var pos = attr_select.data["pos"].trim().split(" ")
                                        var x = new Number(pos[0]) + changeX;
                                        var y = new Number(pos[1]) + changeY;
                                        var loc = (x).toString() + " " + (y).toString();
                                        attr_select.data.pos = loc;
                                        myDiagram.model.updateTargetBindings(attr_select.data);
                                    });
                                    texts_select.each(function (text_select) {
                                        var pos = text_select.data["pos"].trim().split(" ")
                                        var x = new Number(pos[0]) + changeX;
                                        var y = new Number(pos[1]) + changeY;
                                        var loc = (x).toString() + " " + (y).toString();
                                        text_select.data.pos = loc;
                                        myDiagram.model.updateTargetBindings(text_select.data);
                                    });
                                }
                            }

                        })
                    })
                    myDiagram.nodeTemplateMap.add("Capacitor_P_0", capacitor_p);
                    myDiagram.nodeTemplateMap.add("Capacitor_P_1", capacitor_p);
                    myDiagram.nodeTemplateMap.add("Capacitor_S_0", capacitor_s);
                    myDiagram.nodeTemplateMap.add("Capacitor_S_1", capacitor_s);
                    myDiagram.nodeTemplateMap.add("Breaker_0", cbreaker_1);
                    myDiagram.nodeTemplateMap.add("Breaker_1", cbreaker_1);
                    myDiagram.nodeTemplateMap.add("Breaker_2", cbreaker_2);
                    myDiagram.nodeTemplateMap.add("Disconnector_0", disconnector_1);
                    myDiagram.nodeTemplateMap.add("Disconnector_1", disconnector_1);
                    myDiagram.nodeTemplateMap.add("Disconnector_2", disconnector_2);
                    myDiagram.nodeTemplateMap.add("Disconnector_3", disconnector_3);
                    myDiagram.nodeTemplateMap.add("EnergyConsumer_0", energyconsumer_0);
                    myDiagram.nodeTemplateMap.add("EnergyConsumer_1", energyconsumer_1);
                    myDiagram.nodeTemplateMap.add("GeneralMeter_0", generalmeter);
                    myDiagram.nodeTemplateMap.add("Generator_0", generator);
                    myDiagram.nodeTemplateMap.add("GroundDisconnector_0", grounddisconnector_1);
                    myDiagram.nodeTemplateMap.add("GroundDisconnector_1", grounddisconnector_1);
                    myDiagram.nodeTemplateMap.add("GroundDisconnector_2", grounddisconnector_2);
                    myDiagram.nodeTemplateMap.add("Reactor_P_0", reactor_p);
                    myDiagram.nodeTemplateMap.add("Reactor_S_0", reactor_s);
                    myDiagram.nodeTemplateMap.add("1_Station", station_1_1);
                    myDiagram.nodeTemplateMap.add("1_Station_0", station_1_1);
                    myDiagram.nodeTemplateMap.add("1_Station_1", station_1_1);
                    myDiagram.nodeTemplateMap.add("1_Station_2", station_1_2);
                    myDiagram.nodeTemplateMap.add("1_Station_3", station_1_3);
                    myDiagram.nodeTemplateMap.add("2_Station", station_2_1);
                    myDiagram.nodeTemplateMap.add("2_Station_0", station_2_1);
                    myDiagram.nodeTemplateMap.add("2_Station_1", station_2_1);
                    myDiagram.nodeTemplateMap.add("2_Station_2", station_2_2);
                    myDiagram.nodeTemplateMap.add("2_Station_3", station_2_3);
                    myDiagram.nodeTemplateMap.add("Transformer2_0", transformer2_0);
                    myDiagram.nodeTemplateMap.add("Transformer2_1", transformer2_1);
                    myDiagram.nodeTemplateMap.add("Transformer2_2", transformer2_2);
                    myDiagram.nodeTemplateMap.add("Transformer2_3", transformer2_3);
                    myDiagram.nodeTemplateMap.add("Transformer2_4", transformer2_4);
                    myDiagram.nodeTemplateMap.add("Transformer2_5", transformer2_5);
                    myDiagram.nodeTemplateMap.add("Transformer2_6", transformer2_6);
                    myDiagram.nodeTemplateMap.add("Transformer2_7", transformer2_7);
                    myDiagram.nodeTemplateMap.add("Transformer2_8", transformer2_8);
                    myDiagram.nodeTemplateMap.add("Transformer3_0", transformer3_0);
                    myDiagram.nodeTemplateMap.add("Transformer3_1", transformer3_1);
                    myDiagram.nodeTemplateMap.add("Transformer3_2", transformer3_2);
                    myDiagram.nodeTemplateMap.add("Transformer3_3", transformer3_3);
                    myDiagram.nodeTemplateMap.add("Transformer3_4", transformer3_4);
                    myDiagram.nodeTemplateMap.add("Transformer3_5", transformer3_5);
                    myDiagram.nodeTemplateMap.add("Transformer3_6", transformer3_6);
                    myDiagram.nodeTemplateMap.add("Transformer3_7", transformer3_7);
                    myDiagram.nodeTemplateMap.add("Transformer3_8", transformer3_8);
                    myDiagram.nodeTemplateMap.add("Transformer3_9", transformer3_9);
                    myDiagram.nodeTemplateMap.add("Transformer3_10", transformer3_10);
                    myDiagram.nodeTemplateMap.add("Transformer3_11", transformer3_11);
                    myDiagram.nodeTemplateMap.add("Transformer3_12", transformer3_12);
                    myDiagram.nodeTemplateMap.add("Transformer3_13", transformer3_13);
                    myDiagram.nodeTemplateMap.add("Transformer3_14", transformer3_14);
                    myDiagram.nodeTemplateMap.add("Transformer3_15", transformer3_15);
                    myDiagram.nodeTemplateMap.add("Transformer3_16", transformer3_16);
                    myDiagram.nodeTemplateMap.add("Transformer3_17", transformer3_17);
                    myDiagram.nodeTemplateMap.add("Transformer3_18", transformer3_18);
                    myDiagram.nodeTemplateMap.add("Transformer3_19", transformer3_19);
                    myDiagram.nodeTemplateMap.add("Transformer3_20", transformer3_20);
                    myDiagram.nodeTemplateMap.add("Transformer3_21", transformer3_21);
                    myDiagram.nodeTemplateMap.add("Transformer3_22", transformer3_22);
                    myDiagram.nodeTemplateMap.add("Transformer3_23", transformer3_23);
                    myDiagram.nodeTemplateMap.add("Transformer3_24", transformer3_24);
                    myDiagram.nodeTemplateMap.add("Transformer3_25", transformer3_25);
                    myDiagram.nodeTemplateMap.add("Transformer3_26", transformer3_26);
                    myDiagram.nodeTemplateMap.add("Transformer3_27", transformer3_0);
                    myDiagram.nodeTemplateMap.add("Text_0", text);
                    myDiagram.nodeTemplateMap.add("Text_1", text);
                    myDiagram.nodeTemplateMap.add("Text", text);
                    myDiagram.nodeTemplateMap.add("Text_selected", text_selected);
                    myDiagram.nodeTemplateMap.add("BusbarSection_0", busbarsection);


                    // if (localStorage.showAttr == "true") {
                    //     myDiagram.groupTemplateMap.add("OfNodes", groupNodeShow);
                    //     myDiagram.nodeTemplateMap.add("TextNode", attrNodeShow);
                    //     // localStorage.showAttr = false;
                    // } else {
                        myDiagram.groupTemplateMap.add("OfNodes", groupNode);
                        myDiagram.nodeTemplateMap.add("TextNode", attrNode);
                    // }
                    myDiagram.groupTemplateMap.add("OfNodes_selected", groupNode_selected);
                    myDiagram.nodeTemplateMap.add("TextNode_selected", attrNode_selected);
                    myDiagram.model.linkFromPortIdProperty = "fromPort";
                    myDiagram.model.linkFromPortIdProperty = "toPort";
                    // myDiagram.model=  new go.GraphLinksModel(nodeDataArray, linkDataArray);
                    myDiagram.model = go.Model.fromJson(model);
                    getParaPanel();
                    loop();
                }
            }
        }
    }
};
var div1State = 1;
function setBigScreen() {

    if(div1State){
        launchFullScreen(window.document.querySelector('#sample'));
        this.title = "点击退出"
        div1State = 0;

    }else{

        exitFullscreen(window.document.querySelector('#sample'));
        this.title = "点击全屏预览"
        div1State = 1;
    }
}
// 开启全屏
function launchFullScreen(element) {
    if(element.requestFullScreen) {
        element.requestFullScreen();
    }else if(element.mozRequestFullScreen) { //兼容moz
        element.mozRequestFullScreen();
    }else if(element.webkitRequestFullScreen) { //兼容webkit
        element.webkitRequestFullScreen();
    }
}
//退出全屏
function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    }else if(document.mozCancelFullScreen) { //兼容moz
        document.mozCancelFullScreen();
    }else if(document.webkitExitFullscreen) { //兼容webkit
        document.webkitExitFullscreen();
    }
}
function loop() {
    setTimeout(function() {
        var save_model=JSON.stringify(myDiagram.model.toJson());
        save_model=save_model.replace(/TextNode_selected/g, 'TextNode');
        save_model=save_model.replace(/OfNodes_selected/g, 'OfNodes');
        var save_modelJson=JSON.parse(save_model)
        document.getElementById('swan-res').value=save_modelJson;
        loop();
    }, 60);
}

function onSelectionChanged(e) {
}

//tab切换效果
function setTab(tab_id) {

    var menu = document.getElementById("m" + tab_id);
    var pic = document.getElementById("pic" + tab_id);
    if(menu.style.display=="none")
    {
        menu.style.display="block";
        pic.src="images/back.png";
    }
    else
    {
        menu.style.display="none";
        pic.src="images/unfold.png";
    }
}
//获取参数列表
// function getParaPanel() {
//     for (var k=0;k<attrs.length;k++) {
//         var node_attrs=attrs[k];
//         if (node_attrs.length > 0) {
//             var goKey = node_attrs[0].objId;
//             var para = {};
//             var ids={};
//             var onm = {};
//             var ons = {};
//             var ofs = {};
//             for (var j=0;j<node_attrs.length;j++) {
//                 para[node_attrs[j]["name"]] = node_attrs[j]["name"];
//                 ids[node_attrs[j]["name"]]=node_attrs[j]["id"];
//                 onm[attrs[j]["objName"]] = node_attrs[j]["onlineMonitor"];
//                 ons[attrs[j]["objName"]] = node_attrs[j]["onlineSim"];
//                 ofs[attrs[j]["objName"]] = node_attrs[j]["offlineSim"];
//             }
//             //获取父元素的坐标
//             var group = myDiagram.model.findNodeDataForKey(goKey);
//             var pos=group["pos"].trim().split(" ")
//             var x=new Number(pos[0])+30;
//             var y=new Number(pos[1]);
//             var loc=(x).toString()+" "+(y).toString();
//             //添加参数panel
//             var para_key=goKey + "_para";
//             var para_panel=myDiagram.model.findNodeDataForKey(para_key)
//             if(para_panel==null){
//                 var para_node = {}
//                 para_node["key"] = goKey + "_para";
//                 para_node["isGroup"] = true;
//                 para_node["category"] = "OfNodes";
//                 para_node["pos"]=loc;
//                 para_node["panel_objId"]=goKey;//所属图元
//                 myDiagram.model.addNodeData(para_node);
//             }
//
//             //添加各参数
//             for (var i in para) {
//                 var attr_key=ids[i];
//                 var attr=myDiagram.model.findNodeDataForKey(attr_key)
//                 if(attr==null)
//                 {
//                     var node = {};
//                     node["key"] = attr_key;
//                     node["text"] = i;//指标名称
//                     node["value"] = 0;//指标值
//                     node["group"] = goKey + "_para";//所属panel
//                     node["attr_objId"]=goKey;//所属图元
//                     node["category"] = "OfNodes";
//                     node["onm"]=onm[i];
//                     node["ons"]=ons[i];
//                     node["ofs"]=ofs[i];
//                     myDiagram.model.addNodeData(node);
//                 }
//             }
//         }
//     }
// }

//获取参数列表
function getParaPanel() {
    for (var i in swan_objs_res) {
        var attrs = swan_objs_res[i].attrs;
        console.log("attrs:",attrs);
        if (attrs.length > 0) {
            var goKey = swan_objs_res[i].goKey;
            var para = {};
            var onm = {};
            var ons = {};
            var ofs = {};
            var ids={};
            for (var j in attrs) {
                para[attrs[j]["objName"]] = swan_redis_data[attrs[j]["id"].toString()];
                // if(attrs[j]["onlineMonitor"]==true){onm[attrs[j]["objName"]] ="show"}else {onm[attrs[j]["objName"]] ="noshow"}
                // if(attrs[j]["onlineSim"]==true){ons[attrs[j]["objName"]] ="show"}else {ons[attrs[j]["objName"]] ="noshow"}
                // if(attrs[j]["offlineSim"]==true){ofs[attrs[j]["objName"]] ="show"}else {ofs[attrs[j]["objName"]] ="noshow"}
                onm[attrs[j]["objName"]] = attrs[j]["onlineMonitor"];
                ons[attrs[j]["objName"]] = attrs[j]["onlineSim"];
                ofs[attrs[j]["objName"]] = attrs[j]["offlineSim"];
                ids[attrs[j]["objName"]]=attrs[j]["id"]
            }

            //获取父元素的坐标
            // var group = myDiagram.model.findNodeDataForKey(goKey);
            // var pos=group["pos"].trim().split(" ")
            // var x=new Number(pos[0])-75;
            // var y=new Number(pos[1])-100;
            // var loc=(x).toString()+" "+(y).toString();
            // console.log("loc:",loc);
            var group = myDiagram.model.findNodeDataForKey(goKey);
            var pos=group["pos"].trim().split(" ");
            var x=new Number(pos[0])+30;
            var y=new Number(pos[1]);
            var loc=(x).toString()+" "+(y).toString();
            //添加参数panel
            var para_key=goKey + "_para";
            var para_panel=myDiagram.model.findNodeDataForKey(para_key)
            if(para_panel==null){
                var para_node = {}
                para_node["key"] = goKey + "_para";
                para_node["text"] = "参数";
                para_node["isGroup"] = true;
                para_node["category"] = "OfNodes";
                para_node["pos"]=loc;
                para_node["pic_node"]=goKey;
                para_node["panel_objId"]=goKey;
                myDiagram.model.addNodeData(para_node);
            }

            //添加各参数
            for (var i in para) {
                var attr_key=ids[i];
                var attr=myDiagram.model.findNodeDataForKey(attr_key)
                if(attr==null)
                {
                    if(onm[i]==true){
                        console.log("onm:",onm[i]);
                        console.log("ons:",ons[i]);
                        console.log("ofs:",ofs[i]);
                        var node = {};
                        node["key"] = attr_key;
                        node["text"] = i;
                        node["value"] = 0;
                        node["group"] = goKey + "_para";
                        node["category"] = "TextNode";
                        node["attr_objId"]=goKey;
                        node["onm"]=onm[i];
                        node["ons"]=ons[i];
                        node["ofs"]=ofs[i];
                        myDiagram.model.addNodeData(node);
                    }
                }
            }
        }
    }
}


/**
* 更改显示状态
*/
//在线监测显示状态
function changeParaOnm(checkbox,attr_id) {
    var data = {};
    var label;
    //获取参数
    for (var i in swan_objs_res) {
        var goKey = swan_objs_res[i].goKey;
        console.log("key:", goKey);
        if (goKey != null) {
            if (checkbox.name == goKey.toString()) {
                var attrs = swan_objs_res[i].attrs;
                for (var j in attrs) {
                    if (attrs[j].id.toString() == checkbox.id) {
                        console.log("attrs:", attrs[j]);
                        data = attrs[j];
                    }
                }
            }
        }
    }
    if (checkbox.checked == false) {
        data.onlineMonitor = false;
        label = false;

    }
    if (checkbox.checked == true) {
        data.onlineMonitor = true;
        label = true;
    }
    //修改组态图节点属性
    var node_onm = myDiagram.model.findNodeDataForKey(attr_id);//首先拿到这个节点的对象
    if (node_onm != null) {
        myDiagram.model.setDataProperty(node_onm, 'onm', label);
    }
    //修改数据库的值
    var xmlHttpOmn = new XMLHttpRequest();
    xmlHttpOmn.open("POST", "../../../sys/sifanyobj/updateonm", true);
    xmlHttpOmn.setRequestHeader('Content-Type', 'application/json');
    console.log("2");
    xmlHttpOmn.send(JSON.stringify(data));
    console.log("3");
    xmlHttpOmn.onreadystatechange = function () {
        if (xmlHttpOmn.readyState === 4 && xmlHttpOmn.status === 200) {
            console.log("message:", xmlHttpOmn.responseText);
        }
        console.log("message:", xmlHttpOmn.responseText);
    }
}


function ok_onm(){
    var div_onm=document.getElementById("layer_onm");
    div_onm.style.display="none";
    ok()
}

//保存页面配置
function ok() {
    //保存当前页面
    console.log("id:",selectSceneId);
    var model={id:null,content:null};
    model.id=selectSceneId;
    model.content=myDiagram.model.toJson();
    console.log("sent_content",model);

    var sent_content=JSON.stringify(model);
    sent_content=sent_content.replace(/TextNode_selected/g, 'TextNode');
    sent_content=sent_content.replace(/OfNodes_selected/g, 'OfNodes');
    var xmlHttpSave = new XMLHttpRequest();
    xmlHttpSave.open("POST", "../../../sys/sifanydatatext/update", true);
    xmlHttpSave.setRequestHeader('Content-Type', 'application/json');
    // model = sent_content.toJSON();
    xmlHttpSave.send(sent_content);
    xmlHttpSave.onreadystatechange = function () {
        if (xmlHttpSave.readyState === 4 && xmlHttpSave.status === 200) {
            alert("success");
        }
    }
    window.location.reload();
}

