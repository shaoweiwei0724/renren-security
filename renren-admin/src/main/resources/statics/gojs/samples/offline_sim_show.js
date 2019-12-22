var map;
var swan_objs=[];
var swan_objs_res;
var icon={};
var swan_redis_data={}
var baseIP="../../../";
var selectSceneId=localStorage.selectSceneId;
var nodeDataArray = [];
var linkDataArray = [];
var str = {};


function init() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this



    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", baseIP + "sys/sifanyclass/scenes/" + selectSceneId, true);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            str = JSON.parse(xmlHttp.responseText);
            map = JSON.parse(str.mapJsonLxfz);
            swan_objs_res = str.objs;
            for (var i in swan_objs_res) {
                var attrs = swan_objs_res[i].attrs;
                if (attrs.length > 0) {
                    for (var j in attrs) {
                        swan_redis_data[attrs[j]["id"].toString()] = 0
                    }
                }
            }
            console.log("str:",str);
            for (var i = 0; i < map.nodeDataArray.length; i++) {

                if(map.nodeDataArray[i].category=="TextNode"||map.nodeDataArray[i].category=="OfNodes"){
                }
                else {
                    icon[map.nodeDataArray[i].icon] = map.nodeDataArray[i].source.icons;
                }
                if(map.nodeDataArray[i].category=="TextNode")
                {
                    if(map.nodeDataArray[i].ofs==true)
                    {
                        nodeDataArray.push(map.nodeDataArray[i]);
                    }
                }
                else {
                    nodeDataArray.push(map.nodeDataArray[i]);
                }

            }
            for (var j = 0; j < map.linkDataArray.length; j++) {
                linkDataArray.push(map.linkDataArray[j]);
            }
            var $ = go.GraphObject.make;  // for conciseness in defining templates
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

            function highlightGroup(e, grp, show) {
                if (!grp) return;
                e.handled = true;
                if (show) {
                    // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
                    // instead depend on the DraggingTool.draggedParts or .copiedParts
                    var tool = grp.diagram.toolManager.draggingTool;
                    var map = tool.draggedParts || tool.copiedParts;  // this is a Map
                    // now we can check to see if the Group will accept membership of the dragged Parts
                    if (grp.canAddMembers(map.toKeySet())) {
                        grp.isHighlighted = true;
                    }
                }
                grp.isHighlighted = false;
            }

            function finishDrop(e, grp) {
                var ok = (grp !== null
                    ? grp.addMembers(grp.diagram.selection, true)
                    : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
                if (!ok) e.diagram.currentTool.doCancel();
            }

            myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
                {
                    // "LinkDrawn":test,     // these two DiagramEvents call a
                    grid: $(go.Panel, "Grid",
                        $(go.Shape, "LineH", {stroke: "rgba(0,0,0,0)", strokeWidth: 0.5}),
                        $(go.Shape, "LineH", {stroke: "rgba(0,0,0,0)", strokeWidth: 0.5, interval: 10}),
                        $(go.Shape, "LineV", {stroke: "rgba(0,0,0,0)", strokeWidth: 0.5}),
                        $(go.Shape, "LineV", {stroke: "rgba(0,0,0,0)", strokeWidth: 0.5, interval: 10})
                    ),
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
                    "commandHandler.archetypeGroupData": {isGroup: true, category: "OfNodes"},
                    mouseDrop: function (e) {
                        finishDrop(e, null);
                    },
                });


            // A data binding conversion function. Given an name, return the Geometry.
            // If there is only a string, replace it with a Geometry object, which can be shared by multiple Shapes.

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
                        port.fill = show ? "rgba(0,0,0,.3)" : null;
                    }
                });
            }

            function commonNodeStyle() {
                return [
                    {
                        locationSpot: go.Spot.Center,
                    },
                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                ];
            }

            myDiagram.nodeTemplateMap.add("Exclusive1",
                $(go.Node, commonNodeStyle(),
                    { // special resizing: just at the ends
                        resizable: true, resizeObjectName: "SHAPE", resizeAdornmentTemplate: resizeAdornment,
                        rotatable: true,
                        fromLinkable: true, toLinkable: true
                    },
                    $(go.Shape,
                        { // horizontal line stretched to an initial width of 200
                            name: "SHAPE", geometryString: "M0 0 L100 0",
                            fill: "transparent", stroke: "#CD0000", width: 100
                        },
                        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify))
                ));

            myDiagram.groupTemplateMap.add("OfGroups",
                $(go.Group, "Auto",
                    {
                        background: "transparent",
                        // highlight when dragging into the Group
                        mouseDragEnter: function (e, grp, prev) {
                            highlightGroup(e, grp, true);
                        },
                        mouseDragLeave: function (e, grp, next) {
                            highlightGroup(e, grp, false);
                        },
                        computesBoundsAfterDrag: true,
                        // when the selection is dropped into a Group, add the selected Parts into that Group;
                        // if it fails, cancel the tool, rolling back any changes
                        mouseDrop: finishDrop,
                        handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
                        // Groups containing Groups lay out their members horizontally
                        layout:
                            $(go.GridLayout,
                                {
                                    wrappingWidth: Infinity, alignment: go.GridLayout.Position,
                                    cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                                })
                    },
                    new go.Binding("background", "isHighlighted", function (h) {
                        return h ? "rgba(255,0,0,0.2)" : "transparent";
                    }).ofObject(),
                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                    $(go.Shape, "Rectangle",
                        {fill: null, stroke: "#435d80", strokeWidth: 2}),
                    $(go.Panel, "Vertical",  // title above Placeholder
                        $(go.Panel, "Horizontal",  // button next to TextBlock
                            {stretch: go.GraphObject.Horizontal, background: "transparent"},
                            $("SubGraphExpanderButton",
                                {alignment: go.Spot.Right, margin: 5}),
                            $(go.TextBlock,
                                {
                                    alignment: go.Spot.Left,
                                    editable: true,
                                    margin: 5,
                                    font: "bold 18px sans-serif",
                                    opacity: 0.75,
                                    stroke: "#fff"
                                },
                                new go.Binding("text", "text").makeTwoWay())
                        ),  // end Horizontal Panel
                        $(go.Placeholder,
                            {padding: 5, alignment: go.Spot.TopLeft})
                    )  // end Vertical Panel
                ));  // end Group and call to add to template Map

            myDiagram.groupTemplateMap.add("OfNodes",

                $(go.Group, "Auto",
                    {
                        isShadowed: true,//阴影
                        movable: true,//允许拖动
                        deletable: false,//禁止删除
                        shadowOffset: new go.Point(4, 4),//阴影的位置偏移
                        locationSpot: new go.Spot(0.5, 1, 0, -21), locationObjectName: "SHAPE",
                        selectionObjectName: "SHAPE", rotatable: true,
                        background: "transparent",
                        ungroupable: true,
                        // highlight when dragging into the Group
                        mouseDragEnter: function (e, grp, prev) {
                            console.log(grp);
                            highlightGroup(e, grp, true);
                        },
                        mouseDragLeave: function (e, grp, next) {
                            console.log(grp);
                            highlightGroup(e, grp, false);
                        },
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
                        {fill: "rgba(67,93,128,0.3)", stroke: null, strokeWidth: 2}),
                    $(go.Panel, "Vertical",  // title above Placeholder
                        // $(go.Panel, "Horizontal",  // button next to TextBlock
                        //     {stretch: go.GraphObject.Horizontal, background: "transparent"},
                        //     $("SubGraphExpanderButton",
                        //         {alignment: go.Spot.Right, margin: 5})
                        // ),  // end Horizontal Panel
                        $(go.Placeholder,
                            {padding: 5, alignment: go.Spot.TopLeft})
                    ),  // end Vertical Panel
                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)

                ));  // end Group and call to add to template Map

            // replace the default Node template in the nodeTemplateMap
            myDiagram.nodeTemplateMap.add("TextNode",
                $(go.Node, "Auto",
                    { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
                        mouseDrop: function (e, nod) {
                            finishDrop(e, nod.containingGroup);
                        }
                    },
                    $(go.Shape, "Rectangle",
                        {fill: "rgba(67,93,128,0.3)", stroke: null},
                        new go.Binding("fill", "color")),
                    $(go.Panel, "Table",
                        {
                            minSize: new go.Size(130, NaN),
                            maxSize: new go.Size(150, NaN),
                            margin: new go.Margin(6, 10, 0, 6),
                            defaultAlignment: go.Spot.Left
                        },
                        $(go.RowColumnDefinition, {column: 2, width: 1}),
                        $(go.TextBlock, // the name
                            {
                                row: 0, column: 0,
                                font: "8pt Segoe UI,sans-serif",
                                stroke: "#fff",
                                editable: true, isMultiline: false,
                            },
                            new go.Binding("text", "text").makeTwoWay()),
                        $(go.TextBlock,
                            {
                                row: 0, column: 1,
                                font: "8pt Segoe UI,sans-serif",
                                editable: true, isMultiline: false,
                                stroke: "#fff",
                                margin: new go.Margin(0, 0, 0, 3)
                            },
                            new go.Binding("text", "value").makeTwoWay())
                    ), // end Table Panel
                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)
                )
            );
            myDiagram.nodeTemplateMap.add("PicNode",
                $(go.Node, "Spot",
                    { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
                    },
                    $(go.Picture,  // the icon showing the logo
                        // You should set the desiredSize (or width and height)
                        // whenever you know what size the Picture should be.
                        {desiredSize: new go.Size(150, 100)},
                        new go.Binding("source", "icon", convertKeyImage)),
                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)
                ));

            myDiagram.nodeTemplate =
                $(go.Node, "Spot",
                    {
                        locationObjectName: 'main',
                        locationSpot: go.Spot.Center,
                        rotatable: true,
                        // resizable: true,

                    },
                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                    // The main element of the Spot panel is a vertical panel housing an optional icon,
                    // plus a rectangle that acts as the port
                    $(go.Panel, "Vertical",
                        $(go.Picture,
                            {
                                desiredSize: new go.Size(100, 100)
                            },
                            new go.Binding("source", "icon", convertKeyImage)),
                        $(go.TextBlock,
                            {
                                font: "8pt Lato, sans-serif",
                                textAlign: "center",
                                stroke:"white",
                                maxSize: new go.Size(100, NaN),isMultiline: false,
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
                );

            function portStyle(input) {
                return {
                    // fromSpot: go.Spot.Right,
                    fromLinkable: input,
                    // toSpot: go.Spot.Left,
                    toLinkable: input,
                    toMaxLinks: 100,
                    cursor: "pointer"
                };
            }

            // Some links need a custom to or from spot
            function convertKeyImage(geoname) {
                var geo = icon[geoname];
                // console.log("geo:",geo);
                return baseIP + "sys/sifanydataimage/image/" + geo + ".svg";
            }

            function spotConverter(dir) {
                if (dir === "top") return go.Spot.TopSide;
                if (dir === "left") return go.Spot.LeftSide;
                if (dir === "right") return go.Spot.RightSide;
                if (dir === "bottom") return go.Spot.BottomSide;
                if (dir === "rightsingle") return go.Spot.Right;
            }

            myDiagram.model.addLinkData({"category":"PicPara"});
            myDiagram.linkTemplateMap.add("PicPara",
                $(go.Link,
                    { routing: go.Link.AvoidsNodes, curve: go.Link.JumpGap, corner: 10, reshapable: true, toShortLength: 7,deletable:false},
                    new go.Binding("points").makeTwoWay(),

                    $(go.Shape, {stroke: "#cd0000", strokeWidth:3 })
                )
            );
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
                        // mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "#fff"; },
                        // mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "#fff";; },
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
                    $(go.Shape, {isPanelMain: true, stroke: "#13e28e"/* blue*/, strokeWidth: 2},
                        new go.Binding("stroke", "color"))
                );
            myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
            // getPic(nodeDataArray);
            listenRedis();//监听redis添加参数


        }
    }
}


function listenRedis() {
    setInterval(function () {
        changeAllPara();
    }, 1000);
}


//获取参数
var para = {"id": 23, "name": "涡轮增压发动机", "额定电压": "220V", "额定电流": "12A", "创建时间": "2019-11-02"};

setInterval(function () {
    var keys = []
    for (var key in swan_redis_data) {
        keys.push(key)

    }
    keys = keys.join(",")
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:5005/getRedis?key=" + keys, true);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var jsons = JSON.parse(xmlHttp.responseText);
            for (var key in jsons) {
                swan_redis_data[key] = jsons[key]
            }
        }
        ;
    }
}, 1000)

//改变参数
function changeAllPara() {
    console.log("res:",swan_objs_res);
    for (var i in swan_objs_res) {
        var attrs = swan_objs_res[i].attrs;
        if (attrs.length > 0) {
            var goKey = swan_objs_res[i].goKey;
            var para = {}
            var attr_ids={}
            for (var j in attrs) {
                para[attrs[j]["objName"]] = swan_redis_data[attrs[j]["id"].toString()]
                attr_ids[attrs[j]["objName"]]=attrs[j]["id"];
            }
            console.log("key",goKey);
            console.log("para:",para);
            console.log("attrs:",attrs);
            console.log("attr_ids:",attr_ids);
            changePara(goKey, para,attr_ids);
        }
    }
}

function changePara(goKey, para,attr_ids) {
    for (var i in para) {
        getPara(attr_ids[i], goKey, i, para[i]);
    }
}

function getPara(j, key, i, value) {

    var para = myDiagram.model.findNodeDataForKey(j);//首先拿到这个节点的对象
    myDiagram.model.setDataProperty(para, "value", value)
}

//end改变参数




function onSelectionChanged(e) {
}

/**
 * 连线的样式
 */
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
    // console.log("op:",op);
    // console.log("r:",r);
    var below = op.y > r.centerY;
    var below_x = op.x > r.centerX;
    var y = below ? r.bottom : r.top;
    var x = below_x ? r.left : r.right;
    if (node.category === "Exclusive1") {
        if (r.right - r.left < 2) {
            if (op.y < r.top + 30) return new go.Point(x, r.top + 30);
            if (op.y > r.bottom - 30) return new go.Point(x, r.bottom - 30);
            return new go.Point(x, op.y);
        } else if (r.top - r.bottom < 2) {
            if (op.x < r.left + 30) return new go.Point(r.left + 30, y);
            if (op.x > r.right - 30) return new go.Point(r.right - 30, y);
            return new go.Point(op.x, y);
        } else {
            return new go.Point(op.x, op.y);
        }
    } else {
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
        } else if (r.top - r.bottom < 2) {
            if (below) res = 90;
            else res = 270;
        } else {
            res = 0;
        }
    } else {
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
}

