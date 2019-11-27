var map;
var swan_objs=[];
var swan_objs_res;
var icon={};
var swan_redis_data={}
var baseIP="../../../";
var selectSceneId=localStorage.selectSceneId;
// var nodeDataArray = [
//     {"icon":23, "title":"涡轮增压发动机","iconWidth":30, "iconHeight":60, "text":"涡轮增压发动机", "source":{"id":23, "name":"涡轮增压发动机", "parentId":19, "createTime":1572600610625, "updateTime":null, "status":1, "userId":1, "icons":"26", "childs":null}, "key":-1, "pos":"-360 -100"},
//     {"icon":24, "title":"涡轮增压发动机","iconWidth":30, "iconHeight":60, "text":"自然吸气发动机", "source":{"id":24, "name":"自然吸气发动机", "parentId":19, "createTime":1572600708465, "updateTime":null, "status":1, "userId":1, "icons":"27", "childs":null}, "key":-2, "pos":"0 30"},
//     {"icon":25, "title":"涡轮增压发动机","iconWidth":30, "iconHeight":60, "text":"双离合", "source":{"id":25, "name":"双离合", "parentId":22, "createTime":1572607538299, "updateTime":null, "status":1, "userId":1, "icons":"28", "childs":null}, "key":-3, "pos":"-370 140"}            ];
// var linkDataArray = [
//     {"from":-1, "to":-2, "points":[-310,-99.99999999999999,-300,-99.99999999999999,-180,-99.99999999999999,-180,30.000000000000014,-60,30.000000000000014,-50,30.000000000000014]},
//     {"from":-3, "to":-2, "points":[-320,140,-310,140,-185,140,-185,30.000000000000014,-60,30.000000000000014,-50,30.000000000000014]}
// ];



function init() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this

    // Icons derived from SVG paths designed by freepik: http://www.freepik.com/
    // var str={"msg":"success","code":0,"classLists":[{"id":14,"name":"锅炉","parentId":0,"createTime":1571723750240,"updateTime":null,"status":1,"userId":1,"icon":null},{"id":15,"name":"燃气锅炉","parentId":14,"createTime":1571723764897,"updateTime":null,"status":1,"userId":1,"icon":"m237.06845,147.66667l-66.84232,92.00056l-108.15315,-35.14109l0,-113.71895l108.15315,-35.14109l66.84232,92.00056z m72.33333,115.66667c0,-12.1547 15.21547,-22 34,-22c18.78453,0 34,9.8453 34,22c0,12.1547 -15.21547,22 -34,22c-18.78453,0 -34,-9.8453 -34,-22z m100.33333,175.66667c0,-13.25967 17.00552,-24 38,-24c20.99448,0 38,10.74033 38,24c0,13.25967 -17.00552,24 -38,24c-20.99448,0 -38,-10.74033 -38,-24z"},{"id":16,"name":"燃煤锅炉","parentId":14,"createTime":1571723783721,"updateTime":null,"status":1,"userId":1,"icon":null}]}
    //
    // var list=str.classLists;
    var str={};
    var nodeDataArray=[];
    var linkDataArray=[];
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", baseIP+"sys/sifanyclass/scenes/"+selectSceneId, true);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status ===200){
            str=JSON.parse(xmlHttp.responseText);
            map=JSON.parse(str.mapJson);
            console.log(str);
            swan_objs_res=str.objs;
            for(var i in swan_objs_res){
                var attrs=swan_objs_res[i].attrs;
                if(attrs.length>0){

                    for(var j in attrs){
                        swan_redis_data[attrs[j]["id"].toString()]=0
                    }

                }
            }
            for(var i=0; i<map.nodeDataArray.length;i++){
                icon[map.nodeDataArray[i].icon]=map.nodeDataArray[i].source.icons;
                nodeDataArray.push(map.nodeDataArray[i]);
            }
            for(var j=0;j<map.linkDataArray.length;j++){
                linkDataArray.push(map.linkDataArray[j]);
            }
            console.log(nodeDataArray);
            console.log(map);

            //
            // for(var i in swan_obj_list){
            //     var swan_obj_list_i=swan_obj_list[i]
            //     var swan_obj_i=[];
            //     for(var i in swan_obj_list_i['childs']){
            //         var child_i=swan_obj_list_i['childs'][i];
            //         icon[child_i.id]=child_i.icons;
            //         swan_obj_i.push({"icon":child_i.id, "iconWidth":30, "iconHeight":60,  "text":child_i.name, "source":child_i});
            //     }
            //     swan_objs.push(swan_obj_i)
            // }

            var $ = go.GraphObject.make;  // for conciseness in defining templates
            myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
                {
                    grid: $(go.Panel, "Grid",
                        $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
                        $(go.Shape, "LineH", { stroke: "gray", strokeWidth: 0.5, interval: 10 }),
                        $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
                        $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0.5, interval: 10 })
                    ),
                    // "draggingTool.dragsLink": true,
                    "draggingTool.isGridSnapEnabled": true,
                    "linkingTool.isUnconnectedLinkValid": true,
                    "linkingTool.portGravity": 20,
                    "relinkingTool.isUnconnectedLinkValid": true,
                    "relinkingTool.portGravity": 20,
                    "relinkingTool.fromHandleArchetype":
                        $(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(12, 12), fill: "tomato", stroke: "darkred" }),
                    "relinkingTool.toHandleArchetype":
                        $(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(12,12), fill: "darkred", stroke: "tomato" }),
                    "linkReshapingTool.handleArchetype":
                        $(go.Shape, "Diamond", { desiredSize: new go.Size(15, 15), fill: "lightblue", stroke: "deepskyblue" }),
                    "rotatingTool.handleAngle": 270,
                    "rotatingTool.handleDistance": 30,
                    "rotatingTool.snapAngleMultiple": 15,
                    "rotatingTool.snapAngleEpsilon": 15,
                    "undoManager.isEnabled": true,
                    maxSelectionCount: 1, // users can select only one part at a time
                    "toolManager.hoverDelay": 10,  // how quickly tooltips are shown
                    initialAutoScale: go.Diagram.Uniform,  // scale to show all of the contents
                    "ChangedSelection": onSelectionChanged, // view additional information
                });

            function infoString(obj) {
                var part = obj.part;
                if (part instanceof go.Adornment) part = part.adornedPart;
                var msg = "";
                if (part instanceof go.Link) {
                    msg = "";
                } else if (part instanceof go.Node) {
                    msg = part.data.text + ":\n\n" + part.data.description;
                }
                return msg;
            }

            // A data binding conversion function. Given an name, return the Geometry.
            // If there is only a string, replace it with a Geometry object, which can be shared by multiple Shapes.
            function geoFunc(geoname) {
                var geo=icon[geoname];
                console.log(geo);
                return baseIP+"sys/sifanydataimage/image/"+geo+".svg";
            }
            function textStyle() {
                return { font: "9pt  Segoe UI,sans-serif", stroke: "#fff" };
            }
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
                node.ports.each(function(port) {
                    if (port.portId !== "") {  // don't change the default port, which is the big shape
                        port.fill = show ? "rgba(0,0,0,.3)" : null;
                    }
                });
            }

            myDiagram.nodeTemplate =
                $(go.Node, "Auto",
                    {
                        locationObjectName: 'main',
                        locationSpot: go.Spot.Center,
                    },
                    // for sorting, have the Node.text be the data.name
                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                    // new go.Binding("text", "text"),

                    // define the node's outer shape
                    $(go.Shape, "Rectangle",
                        {
                            name: "SHAPE", fill: "#3A5FCD", stroke: null,
                            // set the port properties:
                            portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
                        }),
                    $(go.Panel, "Horizontal",
                        $(go.Picture,
                            {
                                name: "Picture",
                                desiredSize: new go.Size(50, 50),
                                margin: new go.Margin(6, 8, 6, 10),
                            },
                            new go.Binding("source", "icon", geoFunc)),
                        // define the panel where the text will appear
                        $(go.Panel, "Table",
                            {
                                maxSize: new go.Size(150, 999),
                                margin: new go.Margin(6, 10, 0, 3),
                                defaultAlignment: go.Spot.Left
                            },
                            $(go.RowColumnDefinition, { column: 2, width: 4 }),
                            $(go.TextBlock, textStyle(),  // the name
                                {
                                    row: 0, column: 0, columnSpan: 5,
                                    font: "12pt Segoe UI,sans-serif",
                                    editable: true, isMultiline: false,
                                    minSize: new go.Size(10, 16)
                                },
                                new go.Binding("text", "text").makeTwoWay()),
                            $(go.TextBlock, textStyle(),  // the name
                                {
                                    row: 1, column: 0,
                                },
                                new go.Binding("text", "parameters").makeTwoWay())
                        )  // end Table Panel
                    ) // end Horizontal Panel
                );  // end Node



            myDiagram.nodeTemplate.contextMenu =
                $("ContextMenu",
                    $("ContextMenuButton",
                        $(go.TextBlock, "删除"),
                        {
                            click: function(e, obj) {
                                var node = obj.part.adornedPart;
                                var removeLinks=[];

                                node.findLinksConnected().each(function(link) {
                                    removeLinks.push(link.data);
                                });
                                myDiagram.model.removeLinkDataCollection(removeLinks);
                                myDiagram.model.removeNodeData(node.data)

                            }
                        }
                    ),
                    $("ContextMenuButton",
                        $(go.TextBlock, "Remove Role"),
                        {
                            click: function(e, obj) {

                            }
                        }
                    ),
                    $("ContextMenuButton",
                        $(go.TextBlock, "Remove Department"),
                        {
                            click: function(e, obj) {
                            }
                        }
                    )
                );
            // Some links need a custom to or from spot
            function spotConverter(dir) {
                console.log(dir)
                if (dir === "top") return go.Spot.TopSide;
                if (dir === "left") return go.Spot.LeftSide;
                if (dir === "right") return go.Spot.RightSide;
                if (dir === "bottom") return go.Spot.BottomSide;
                if (dir === "rightsingle") return go.Spot.Right;
            }

            myDiagram.linkTemplate =
                $(go.Link, {
                        toShortLength: -2,
                        fromShortLength: -2,
                        layerName: "Background",
                        routing: go.Link.Orthogonal,
                        corner: 15,

                        // fromSpot: go.Spot.RightSide,
                        // toSpot: go.Spot.LeftSide
                    },
                    // make sure links come in from the proper direction and go out appropriately
                    new go.Binding("fromSpot", "fromSpot", function(d) { return spotConverter(d); }),
                    new go.Binding("toSpot", "toSpot", function(d) { return spotConverter(d); }),

                    new go.Binding("points").makeTwoWay(),
                    // mark each Shape to get the link geometry with isPanelMain: true
                    $(go.Shape, { isPanelMain: true, stroke: "#41BFEC"/* blue*/, strokeWidth: 10 },
                        new go.Binding("stroke", "color")),
                    $(go.Shape, { isPanelMain: true, stroke: "white", strokeWidth: 3, name: "PIPE", strokeDashArray: [20, 40] })
                );
            myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
            listenRedis();//监听redis添加参数
            loop();  // animate some flow through the pipes
        }
    };
}


function listenRedis() {
    setInterval(function() {
        changeAllPara();
    }, 1000);
}

// //根据id获取key
// var key_i={};
// for(var i=0;i<nodeDataArray.length;i++){
//     var k=nodeDataArray[i].icon;
//     var v=nodeDataArray[i].key;
//     key_i[k]=v;
// }

//获取参数
var para={"id":23, "name":"涡轮增压发动机", "额定电压":"220V", "额定电流":"12A", "创建时间":"2019-11-02"};

setInterval(function () {
    var keys=[]
    for(var key in swan_redis_data){
        keys.push(key)



    }
    keys=keys.join(",")
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://127.0.0.1:5005/getRedis?key="+keys, true);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status ===200){
            var jsons=JSON.parse(xmlHttp.responseText);
            for(var key in jsons){

                swan_redis_data[key]=jsons[key]



            }


        };
    }
},1000)

//改变参数
function changeAllPara() {
    for(var i in swan_objs_res){
        var attrs=swan_objs_res[i].attrs;
        if(attrs.length>0){
            var goKey=swan_objs_res[i].goKey;
            var para={}
            for(var j in attrs){
                para[attrs[j]["objName"]]=swan_redis_data[attrs[j]["id"].toString()]
            }
            console.log(goKey)
            console.log(para)
            changePara(goKey,para)
        }
    }
}

function changePara(goKey,para){
    var parameters='\n'
    for(var i in para){
        parameters+=i+":"+para[i]+'\n';
        getPara(goKey,parameters);
    }
}
function getPara(key,value) {
    var node = myDiagram.model.findNodeDataForKey(key);//首先拿到这个节点的对象
    myDiagram.model.setDataProperty(node,"parameters",value);//然后对这个对象的属性进行更改
}


//end改变参数
var opacity = 1;
var down = true;
function loop() {
    var diagram = myDiagram;
    setTimeout(function() {
        var oldskips = diagram.skipsUndoManager;
        diagram.skipsUndoManager = true;
        diagram.links.each(function(link) {
            var shape = link.findObject("PIPE");

            try{
                shape.strokeDashOffset
            }catch(e){
                return
            }
            var off = shape.strokeDashOffset - 3;
            // animate (move) the stroke dash
            shape.strokeDashOffset = (off <= 0) ? 60 : off;
            // animte (strobe) the opacity:
            if (down) opacity = opacity - 0.01;
            else opacity = opacity + 0.003;
            if (opacity <= 0) { down = !down; opacity = 0; }
            if (opacity > 1) { down = !down; opacity = 1; }
            shape.opacity = opacity;
        });
        diagram.skipsUndoManager = oldskips;
        loop();
    }, 60);
}


function onSelectionChanged(e) {}
