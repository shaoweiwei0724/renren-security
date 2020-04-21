
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
var iconsId=localStorage.iconsId ;
function init() {

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
            console.log("str:", str);
            var html = "";
            for (var i = 0; i < str.classLists.length; i++) { //一级目录
                html += '<div style=" width: 100%;height:100%;">\n' +
                    '                <div  style="float: top; cursor: pointer;z-index: 99;height: 40px; width: 100%;background: linear-gradient(to right,#363c6e,#081e41);vertical-align:middle ">\n' +
                    '                    <input id="model' + (i + 1) + '" readonly="readonly" style=" background-color:transparent;cursor: pointer; left: 2px;font-size: large; width:20%; height:100%;margin-left:5%; border:0px; color:#EBEBEB"  value="' + str.classLists[i].name + '"/>\n' +
                    '                   <span onclick="setBigScreen()" style=" background-color:transparent;cursor: pointer; left: 2px;font-size: large; width:20%; height:100%;margin-left:5%; border:0px; color:#EBEBEB" >大屏</span>\n' +
                    '                    <img id="pic' + (i + 1) + '" style=" width:13%; margin-left: 10%; margin-right: 10%;"  onclick="setTab(\'' + (i + 1) + '\')"  src="images/back.png"/>\n' +
                    '                    <!--                    <a target="_self" href="#" rel="external nofollow" rel="external nofollow" rel="external nofollow" onclick="setTab(\'one\',2,3)" id="one2">锅炉类</a>-->\n' +
                    '                </div>\n' +
                    '                    <div   style="display: block; width: 100%;height:100%;" id="m' + (i + 1) + '"><div id="myPaletteDiv' + (i + 1) + '" style="height:100%;width: 100%;  border: solid 1px black;margin: 0 auto;background: rgb(1,10,34,0.3)"></div></div>\n' +
                    '            </div>';
            }
            // document.getElementById("bu").innerHTML = (html);

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
                                "source": child_i
                            });
                            break;
                        case "发电机2":
                            swan_obj_i.push({
                                "icon": child_i.id,
                                "iconWidth": 15,
                                "iconHeight": 30,
                                "category": "Generator_0",
                                "text": child_i.name,
                                "source": child_i
                            });
                            break;
                        case "两卷变2":
                            swan_obj_i.push({
                                "icon": child_i.id,
                                "iconWidth": 15,
                                "iconHeight": 30,
                                "category": "Transformer2_0",
                                "text": child_i.name,
                                "source": child_i
                            });
                            break;
                        default:
                            swan_obj_i.push({
                                "icon": child_i.id,
                                "iconWidth": 15,
                                "iconHeight": 30,
                                "text": child_i.name,
                                "source": child_i
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

            //         model_icons=["Capacitor_P_0", "Capacitor_S_0","Breaker_1",
            //     "Breaker_2","Disconnector_1","Disconnector_2","Disconnector_3","EnergyConsumer_0",
            //     "EnergyConsumer_1","GeneralMeter_0", "Generator_0","GroundDisconnector_1","GroundDisconnector_2",
            //     "Reactor_P_0", "Reactor_S_0", "1_Station_1", "1_Station_2",
            //     "1_Station_3",  "2_Station_1", "2_Station_2", "2_Station_3",
            //     "Transformer2_0","Transformer2_1","Transformer2_2","Transformer2_3","Transformer2_4",
            //     "Transformer2_5","Transformer2_6","Transformer2_7","Transformer2_8","Transformer3_0",
            //     "Transformer3_1","Transformer3_2","Transformer3_3","Transformer3_4","Transformer3_5","Transformer3_6",
            //     "Transformer3_7","Transformer3_8","Transformer3_9","Transformer3_10","Transformer3_11",
            //     "Transformer3_12","Transformer3_13","Transformer3_14","Transformer3_15","Transformer3_16",
            //     "Transformer3_17","Transformer3_18","Transformer3_19","Transformer3_20","Transformer3_21",
            //     "Transformer3_22","Transformer3_23","Transformer3_24","Transformer3_25","Transformer3_26"]
            //
            // // model_icons=["Capacitor_P_0", "Capacitor_S_0","Breaker_1","Breaker_2"]
            // iconss={"Capacitor_P_0":"capacitor_p", "Capacitor_S_0":"capacitor_s", "Breaker_1":"cbreaker_0","Breaker_2":"cbreaker_1",
            //     "Disconnector_1":"disconnector_1","Disconnector_2":"disconnector_2","Disconnector_3":"disconnector_3",
            //     "EnergyConsumer_0":"energyConsumer_1", "EnergyConsumer_1" : "energyConsumer_0","GeneralMeter_0":"generalMeter", "Generator_0":"generator",
            //     "GroundDisconnector_1":"groundDisconnector_1","GroundDisconnector_2":"groundDisconnector_2",
            //     "Reactor_P_0":"reactor_p", "Reactor_S_0":"reactor_s",
            //     "1_Station_1":"station_1_1", "1_Station_2":"station_1_2",
            //     "1_Station_3":"station_1_3",  "2_Station_1":"station_2_1", "2_Station_2":"station_2_2", "2_Station_3":"station_2_3",
            //     "Transformer2_0":"transformer2_0","Transformer2_1":"transformer2_1","Transformer2_2":"transformer2_2","Transformer2_3":"transformer2_3","Transformer2_4":"transformer2_4",
            //     "Transformer2_5":"transformer2_5","Transformer2_6":"transformer2_6","Transformer2_7":"transformer2_7","Transformer2_8":"transformer2_8","Transformer3_0":"transformer3_0",
            //     "Transformer3_1":"transformer3_1","Transformer3_2":"transformer3_2","Transformer3_3":"transformer3_3","Transformer3_4":"transformer3_4","Transformer3_5":"transformer3_5","Transformer3_6":"transformer3_6",
            //     "Transformer3_7":"transformer3_7","Transformer3_8":"transformer3_8","Transformer3_9":"transformer3_9","Transformer3_10":"transformer3_10","Transformer3_11":"transformer3_11",
            //     "Transformer3_12":"transformer3_12","Transformer3_13":"transformer3_13","Transformer3_14":"transformer3_14","Transformer3_15":"transformer3_15","Transformer3_16":"transformer3_16",
            //     "Transformer3_17":"transformer3_17","Transformer3_18":"transformer3_18","Transformer3_19":"transformer3_19","Transformer3_20":"transformer3_20","Transformer3_21":"transformer3_21",
            //     "Transformer3_22":"transformer3_22","Transformer3_23":"transformer3_23","Transformer3_24":"transformer3_24","Transformer3_25":"transformer3_25","Transformer3_26":"transformer3_26"}
            //
            // var html = "";
            // divs = ["元件"]
            // for (var i = 0; i < divs.length; i++) {
            //     html += '<div style=" width: 200px;height:100%;">\n' +
            //         '                <div onclick="setTab(\'' + (i + 1) + '\')"  style="float: top; cursor: pointer;z-index: 99;height: 50px; width: 200px;background: linear-gradient(to right,#363c6e,#081e41);vertical-align:middle ">\n' +
            //         '                    <input id="model' + (i + 1) + '"  style=" background-color:transparent;cursor: pointer; font-size: large; width:50%; height:100%;margin-left:15%; border:0px; color:#EBEBEB"  value="' + divs[i] + '"/>\n' +
            //         '                    <img id="pic' + (i + 1) + '" style=" width:13%;  margin-right: 10%"    src="images/back.png"/>\n' +
            //         '                    <!--                    <a target="_self" href="#" rel="external nofollow" rel="external nofollow" rel="external nofollow" onclick="setTab(\'one\',2,3)" id="one2">锅炉类</a>-->\n' +
            //         '                </div>\n' +
            //         '                    <div   style="display: block; width: 200px;height:100%;" id="m' + (i + 1) + '"><div id="myPaletteDiv' + (i + 1) + '" style="height:100%;width: 200px;  border: solid 1px black;margin: 0 auto;background: rgb(1,10,34,0.3)"></div></div>\n' +
            //         '            </div>';
            // }
            // document.getElementById("bu").innerHTML = (html);
            //
            // models=[];
            //
            // models.push({"icon":"BusbarSection_0", "iconWidth":15, "iconHeight":30, "category":"BusbarSection_0", "text":"busbarsection"})
            // for(var i in model_icons){
            //     swan_model = {"icon":model_icons[i],category:model_icons[i], "iconWidth":30, "iconHeight":60,"color":model_icons[i],  "text":model_icons[i]};
            //     models.push(swan_model);
            // }
            //
            // function geoFunc(geoname) {
            //     // alert(geoname);
            //     var geo=iconss[geoname];
            //     // return "images/" + geoname+".svg";
            //     return "images/" + geo + ".svg";
            // }
            function geoFunc(geoname) {
                var geo = icon[geoname];
                return "../../../sys/sifanydataimage/image/" + geo + ".svg";
            }

            xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", baseIP + "sys/sifanygjson/getGJson?idd=" + localStorage.onlineSimModelId, true);
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    var json = JSON.parse(xmlHttp.responseText);
                    nodeDataArray = json.node;
                    // console.log("nodeDataArray",nodeDataArray);
                    linkDataArray = json.link;
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
                                    swan_redis_data[attr["id"].toString()] = 0
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
                    icons.cbreaker_1 = "M0,3h8v20H0V3z";
                    icons.cbreaker_2 = "M0,3h8v20H0V3z";
                    icons.disconnector_1 = "M6,3v5 M6,28v5 M0,28h12 M6,8v20";
                    icons.disconnector_2 = "M6,3v5 M6,28v5 M0,28h12 M6,8l6,20";
                    icons.disconnector_3 = "M6,0v36";
                    icons.energyconsumer_0 = "M12,2v4 M0,6h24L12,24L0,6z";
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
                    icons.transformer2_0 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z"
                    icons.transformer2_1 = "M16,2.4c8.8,0,16,7.2,16,16s-7.2,16-16,16s-16-7.2-16-16S7.2,2.4,16,2.4z M16,24.8c8.8,0,16,7.2,16,16\n" +
                        "\ts-7.2,16-16,16s-16-7.2-16-16S7.2,24.8,16,24.8z M8,9.6l8,4.8 M24,9.6l-8,4.8 M16,24v-9.6"
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
                            desiredSize: new go.Size(0.1, 0.1),
                        };
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
                        if (node.category === "Exclusive1") {
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
                        if (node.category === "Exclusive1") {
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
                                locationSpot: go.Spot.TopLeft,
                                // resizeObjectName: "SHAPE", resizeAdornmentTemplate: resizeAdornment,
                                // rotatable:true,
                                // fromLinkable: true, toLinkable: true,
                                // locationSpot: go.Spot.Center,
                                rotatable: false,
                                movable:false,
                            },
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                            new go.Binding("angle", "angle"),
                            new go.Binding("scale", "scale"),
                            // four small named ports, one on each side:
                            makePort("T", go.Spot.Top, true, true),
                            makePort("L", go.Spot.Left, true, true),
                            makePort("R", go.Spot.Right, true, true),
                            makePort("B", go.Spot.Bottom, true, true),
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
                        // var node_select=node.key;
                        // var texts_select=myDiagram.findNodesByExample({"msp":node_select});
                        // var attr_panel=myDiagram.findNodesByExample({"panel_objId":node_select});
                        // var attr_text=myDiagram.findNodesByExample({"attr_objId":node_select});
                        // // if(node.isSelected) {
                        // if (texts_select.first() != null && texts_select.first().category == "Text_0") {
                        //         console.log("++++++++++++++++++++++++++++++++");
                        //         console.log(node_select);
                        //         console.log("++++++++++++++++++++++++++++++++");
                        //         console.log(texts_select.first().category);
                        //         console.log("++++++++++++++++++++++++++++++++");
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
                        // }

                    }

                    myDiagram.addDiagramListener("ObjectSingleClicked", function (e) { //点击事件
                        var node_select = e.subject.part.data.key || null;    //e.subject.part.data即获取到的data
                        var texts_select = myDiagram.findNodesByExample({"msp": node_select}) || null;
                        var attr_panel = myDiagram.findNodesByExample({"panel_objId": node_select}) || null;
                        var attr_text = myDiagram.findNodesByExample({"attr_objId": node_select}) || null;
                        if (texts_select != null && texts_select != "undefined") { //如果点击的不是结点，会报错
                            // if(node.isSelected) {
                            if (texts_select.first() != null && texts_select.first().category == "Text_0") {
                                texts_select.each(function (text_select) {
                                    text_select.category = "Text_selected";
                                });
                                attr_panel.each(function (panel_select) {
                                    panel_select.category = "OfNodes_selected";
                                });
                                attr_text.each(function (attr_select) {
                                    attr_select.category = "TextNode_selected";
                                })
                            }
                            else {
                                texts_select.each(function (text_select) {
                                    text_select.category = "Text_0";
                                });
                                attr_panel.each(function (panel_select) {
                                    panel_select.category = "OfNodes";
                                });
                                attr_text.each(function (attr_select) {
                                    attr_select.category = "TextNode";
                                })
                            }
                        }

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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    geometry: go.Geometry.parse(icons.capacitor_p, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)})
                        );
                    var capacitor_s =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    geometry: go.Geometry.parse(icons.capacitor_s, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0, 0.5)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(1, 0.5)})
                        );
                    var cbreaker_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.cbreaker_1, true)
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
                    var cbreaker_2 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    geometry: go.Geometry.parse(icons.cbreaker_2, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)})
                        );
                    var disconnector_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    geometry: go.Geometry.parse(icons.disconnector_1, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)})
                        );
                    var disconnector_2 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    geometry: go.Geometry.parse(icons.disconnector_2, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)})
                        );
                    var disconnector_3 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    geometry: go.Geometry.parse(icons.disconnector_3, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(0.5, 1)})
                        );
                    var energyconsumer_0 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.energyconsumer_0, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)})
                        );
                    var energyconsumer_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.energyconsumer_1, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                        );
                    var generalmeter =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    geometry: go.Geometry.parse(icons.generalmeter, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            )
                        );
                    var generator =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.generator, true)
                                },
                                new go.Binding("stroke", "stroke_color")
                                // new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                        );
                    var grounddisconnector_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    geometry: go.Geometry.parse(icons.grounddisconnector_1, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)})
                        );
                    var grounddisconnector_2 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    geometry: go.Geometry.parse(icons.grounddisconnector_2, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)})
                        );
                    var reactor_p =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    geometry: go.Geometry.parse(icons.reactor_p, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0)})
                        );
                    var reactor_s =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    geometry: go.Geometry.parse(icons.reactor_s, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0, 0.5)}),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "1", alignment: new go.Spot(1, 0.5)})
                        );
                    var station_1_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.station_1_1, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                        );
                    var station_1_2 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.station_1_2, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                        );
                    var station_1_3 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.station_1_3, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                        );
                    var station_2_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.station_2_1, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                        );
                    var station_2_2 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.station_2_2, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                        );
                    var station_2_3 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.station_2_3, true)
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                                // new go.Binding("strokeWidth", "lw")
                            ),
                            $(go.Shape, "Circle", portStyle(true),
                                {portId: "0", alignment: new go.Spot(0.5, 0.5)})
                        );
                    var transformer2_0 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer2_0, true)
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
                    var transformer2_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                    var transformer3_0 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
                            $(go.Shape, {
                                    name: 'icon',
                                    strokeWidth: 2,
                                    fill: "rgba(0,0,0,0)",
                                    geometry: go.Geometry.parse(icons.transformer3_0, true)
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
                    var transformer3_1 =
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                        $(go.Node, "Spot", SelectNode(), NodeStyle(),
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
                                {fill: "rgba(0,0,0,0)", stroke: null, strokeWidth: 2}),
                            // {fill: "rgba(255,102,102,0.3)", stroke: null, strokeWidth: 2}),
                            $(go.Panel, "Vertical",  // title above Placeholder
                                $(go.Placeholder,
                                    {padding: 5, alignment: go.Spot.TopRight})
                            ),  // end Vertical Panel
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)
                        )

                    var groupNodeShow =
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
                            }
                            // $(go.Shape, "Rectangle",
                            //     {fill: "rgba(0,0,0,0)", stroke: null},
                            //     // {fill: "rgba(255,102,102,0.3)", stroke: null},
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
                            //             stroke: null,
                            //             // stroke: "#000",
                            //             editable: true, isMultiline: false,
                            //         },
                            //         new go.Binding("text", "text").makeTwoWay()),
                            //     $(go.TextBlock,
                            //         {
                            //             row: 0, column: 1,
                            //             font: "5pt Segoe UI,sans-serif",
                            //             editable: true, isMultiline: false,
                            //             stroke: null,
                            //             // stroke: "#000",
                            //             margin: new go.Margin(0, 0, 0, 3)
                            //         },
                            //         new go.Binding("text", "value").makeTwoWay())
                            // ), // end Table Panel
                            // new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)

                        )

                    var attrNodeShow =
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
                            $(go.Shape, "Rectangle",
                                // {fill: "rgba(255,153,51,0.6)", stroke: null},
                                {fill: "rgba(0,0,0,0)", stroke: null},
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
                                        stroke: "#000",
                                        editable: true, isMultiline: false,
                                    },
                                    new go.Binding("text", "text").makeTwoWay()),
                                $(go.TextBlock,
                                    {
                                        row: 0, column: 1,
                                        font: "5pt Segoe UI,sans-serif",
                                        editable: true, isMultiline: false,
                                        stroke: "#000",
                                        margin: new go.Margin(0, 0, 0, 3)
                                    },
                                    new go.Binding("text", "value").makeTwoWay())
                            ), // end Table Panel
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)
                        )
                    myDiagram.nodeTemplate =
                        $(go.Node, "Auto",
                            {
                                locationObjectName: 'main',
                                locationSpot: go.Spot.TopLeft,
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
                                toShortLength: 1,
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
                            $(go.Shape,
                                {
                                    figure: "Resistor",
                                    desiredSize: new go.Size(18, 6),
                                    segmentOrientation: go.Link.OrientUpright,
                                    alignmentFocus: new go.Spot(0.5, 0.5),
                                    // alignmentFocus:new go.Spot(0.4, 0.5),
                                },
                                new go.Binding("stroke", "stroke_color"),
                                new go.Binding("fill", "fill_color")
                            )
                        ));
                    //直流线
                    myDiagram.linkTemplateMap.add("DCLineEnd",
                        $(go.Link,
                            {relinkableFrom: true, relinkableTo: true, reshapable: true},
                            {
                                routing: go.Link.Normal,
                                curve: go.Link.JumpOver,
                                corner: 0,
                                toShortLength: 1,
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
                    // myDiagram.linkTemplate =
                    //     $(go.Link,
                    //         { relinkableFrom: true, relinkableTo: true, reshapable: true },
                    //         {
                    //             routing: go.Link.Normal,
                    //             curve: go.Link.JumpOver,
                    //             corner: 0,
                    //             toShortLength: 1
                    //         },
                    //         new go.Binding("points","points").makeTwoWay(),
                    //         $(go.Shape,
                    //             new go.Binding("stroke", "stroke_color"),
                    //             new go.Binding("fill", "fill_color"),
                    //             new go.Binding("strokeWidth", "lw"),
                    //             new go.Binding("strokeDashArray", "ls"),
                    //             new go.Binding("angle", "angle"),
                    //             new go.Binding("scale", "scale")
                    //         ));

                    function makePort(name, spot, output, input) {
                        // the port is basically just a small transparent square
                        return $(go.Shape, "Circle",
                            {
                                fill: null,  // not seen, by default; set to a translucent gray by showSmallPorts, defined below
                                stroke: null,
                                desiredSize: new go.Size(10, 10),
                                alignment: spot,  // align the port on the main Shape
                                alignmentFocus: spot,  // just inside the Shape
                                portId: name,  // declare this object to be a "port"
                                fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
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
                        $(go.Node, "Spot",
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
                            makePort("T", go.Spot.Top, true, true),
                            makePort("L", go.Spot.Left, true, true),
                            makePort("R", go.Spot.Right, true, true),
                            makePort("B", go.Spot.Bottom, true, true),
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
                            $(go.Node, "Spot",
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
                                makePort("T", go.Spot.Top, true, true),
                                makePort("L", go.Spot.Left, true, true),
                                makePort("R", go.Spot.Right, true, true),
                                makePort("B", go.Spot.Bottom, true, true),
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
                            $(BarLink, {
                                    routing: go.Link.Orthogonal,
                                    selectionAdorned: true,
                                    curve: go.Link.JumpOver,
                                    corner: 0, toShortLength: 4,
                                    relinkableFrom: true,
                                    relinkableTo: true,
                                    reshapable: true,
                                    resegmentable: true,
                                    // mouse-overs subtly highlight links:
                                    mouseEnter: function (e, link) {
                                        link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
                                    },
                                    mouseLeave: function (e, link) {
                                        link.findObject("HIGHLIGHT").stroke = "transparent";
                                    },
                                    selectionAdorned: true
                                },
                                // make sure links come in from the proper direction and go out appropriately
                                new go.Binding("fromSpot", "fromSpot", function (d) {
                                    return spotConverter(d);
                                }),
                                new go.Binding("toSpot", "toSpot", function (d) {
                                    return spotConverter(d);
                                }),
                                new go.Binding("points").makeTwoWay(),
                                // mark each Shape to get the link geometry with isPanelMain: true
                                $(go.Shape, {isPanelMain: true, strokeWidth: 2},
                                    new go.Binding("stroke", "color"))
                            ))


                    // var myPalettes = [];
                    // for (var i = 0; i < swan_obj_list.length; i++) {
                    //     myPalette =
                    //         $(go.Palette, "myPaletteDiv" + (i + 1),  // must name or refer to the DIV HTML element
                    //             {
                    //                 scale: 0.7,
                    //                 maxSelectionCount: 1,
                    //                 nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
                    //                 linkTemplate: // simplify the link template, just in this Palette
                    //                     $(go.Link,
                    //                         { // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
                    //                             // to line up the Link in the same manner we have to pretend the Link has the same location spot
                    //                             locationSpot: go.Spot.Center,
                    //                             selectionAdornmentTemplate:
                    //                                 $(go.Adornment, "Link",
                    //                                     {locationSpot: go.Spot.Center},
                    //                                     $(go.Shape,
                    //                                         {
                    //                                             isPanelMain: true,
                    //                                             fill: null,
                    //                                             stroke: "deepskyblue",
                    //                                             strokeWidth: 0
                    //                                         }),
                    //                                     $(go.Shape,  // the arrowhead
                    //                                         {toArrow: "Standard", stroke: null})
                    //                                 )
                    //                         },
                    //                         {
                    //                             routing: go.Link.AvoidsNodes,
                    //                             curve: go.Link.JumpOver,
                    //                             corner: 5,
                    //                             toShortLength: 4
                    //                         },
                    //                         new go.Binding("points"),
                    //                         $(go.Shape,  // the link path shape
                    //                             {isPanelMain: true, strokeWidth: 2}),
                    //                         $(go.Shape,  // the arrowhead
                    //                             {toArrow: "Standard", stroke: null})
                    //                     ),
                    //                 model: new go.GraphLinksModel(swan_objs[i])
                    //
                    //             });
                    //     myPalettes.push(myPalette)
                    // }
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
                    myDiagram.nodeTemplateMap.add("Text_selected", text_selected);
                    myDiagram.nodeTemplateMap.add("BusbarSection_0", busbarsection);
                    myDiagram.groupTemplateMap.add("OfNodes", groupNodeShow);
                    myDiagram.nodeTemplateMap.add("TextNode", attrNodeShow);

                    // if (localStorage.showAttr == "true") {
                    //     myDiagram.groupTemplateMap.add("OfNodes", groupNodeShow);
                    //     myDiagram.nodeTemplateMap.add("TextNode", attrNodeShow);
                    //     // localStorage.showAttr = false;
                    // } else {
                    //     myDiagram.groupTemplateMap.add("OfNodes", groupNode);
                    //     myDiagram.nodeTemplateMap.add("TextNode", attrNode);
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

//保存页面配置
function ok() {
    //保存当前页面
    // console.log("id:",selectSceneId);
    var model={};
    model.id=localStorage.onlineSimModelId;
    model.content=myDiagram.model.toJson();
    var sent_content=JSON.stringify(model);
    // sent_content=sent_content.replace(/TextNode_selected/g, 'TextNode');
    // sent_content=sent_content.replace(/OfNodes_selected/g, 'OfNodes');
    var xmlHttpSave = new XMLHttpRequest();
    xmlHttpSave.open("POST", "../../../sys/sifanydatatext/update", true);
    xmlHttpSave.setRequestHeader('Content-Type', 'application/json');
    xmlHttpSave.send(sent_content);
    xmlHttpSave.onreadystatechange = function () {
        if (xmlHttpSave.readyState === 4 && xmlHttpSave.status === 200) {
        }
    }
    window.location.reload();
}
//获取参数列表
function getParaPanel() {
    for (var k=0;k<attrs.length;k++) {
        var node_attrs=attrs[k];
        if (node_attrs.length > 0) {
            var goKey = node_attrs[0].objId;
            var para = {};
            var ids={};
            for (var j=0;j<node_attrs.length;j++) {
                para[node_attrs[j]["name"]] = node_attrs[j]["name"];
                ids[node_attrs[j]["name"]]=node_attrs[j]["id"];
            }
            //获取父元素的坐标
            var group = myDiagram.model.findNodeDataForKey(goKey);
            var pos=group["pos"].trim().split(" ")
            var x=new Number(pos[0])+30;
            var y=new Number(pos[1]);
            var loc=(x).toString()+" "+(y).toString();
            //添加参数panel
            var para_key=goKey + "_para";
            var para_panel=myDiagram.model.findNodeDataForKey(para_key)
            if(para_panel==null){
                var para_node = {}
                para_node["key"] = goKey + "_para";
                para_node["isGroup"] = true;
                para_node["category"] = "OfNodes";
                para_node["pos"]=loc;
                para_node["panel_objId"]=goKey;//所属图元
                myDiagram.model.addNodeData(para_node);
            }

            //添加各参数
            for (var i in para) {
                var attr_key=ids[i];
                var attr=myDiagram.model.findNodeDataForKey(attr_key)
                if(attr==null)
                {
                    var node = {};
                    node["key"] = attr_key;
                    node["text"] = i;//指标名称
                    node["value"] = 0;//指标值
                    node["group"] = goKey + "_para";//所属panel
                    node["attr_objId"]=goKey;//所属图元
                    node["category"] = "TextNode";
                    myDiagram.model.addNodeData(node);
                }
            }
        }
    }
}
