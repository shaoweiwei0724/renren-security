
var baseIP="../../../";
var nodeDataArray;
var linkDataArray;
var attrs=[];
var text_node={};
function init() {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", baseIP + "sys/sifanygjson/getGJson?idd="+localStorage.fileId, true);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var json=JSON.parse(xmlHttp.responseText);
            nodeDataArray=json.node;
            linkDataArray=json.link;
            console.log("length:",nodeDataArray.length)
            for (var j = 0; j < nodeDataArray.length; j++) {
               var nodedata=nodeDataArray[j]
                var node_attr=[];
                if(nodedata.type!="Text"){
                    if(nodedata.attrs!=""){
                    for(var i=0;i<nodedata.attrs.length;i++)
                    {
                        var attr={};
                        attr=nodedata.attrs[i];
                        attr.objId=nodeDataArray[j].key;
                        node_attr.push(attr);
                    }
                    attrs.push(node_attr);
                }}
                else {
                    var msp=nodedata.msp;
                    var node_text=[];
                    if(text_node[msp]!=undefined){
                        node_text=text_node[msp];
                    }
                    node_text.push(nodedata.key);
                    text_node[msp]=node_text;
                }
            }
            //定义模型
            var model={};
            model.class="go.GraphLinksModel";
            model.linkFromPortIdProperty="fromPort";
            model.linkToPortIdProperty="toPort";
            model.nodeDataArray=nodeDataArray;
            model.linkDataArray=linkDataArray;
            var $ = go.GraphObject.make;  // for conciseness in defining templates
            var resizeAdornment =
                $(go.Adornment, go.Panel.Spot,
                    $(go.Placeholder),
                    $(go.Shape,  // left resize handle
                        {
                            alignment: go.Spot.Left, cursor: "col-resize",
                            desiredSize: new go.Size(6, 6),
                        }),
                    $(go.Shape,  // right resize handle
                        {
                            alignment: go.Spot.Right, cursor: "col-resize",
                            desiredSize: new go.Size(6, 6),
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
                        $(go.Shape, "LineH", { stroke: "rgb(0,0,0,0)", strokeWidth: 0.5 }),
                        $(go.Shape, "LineH", { stroke: "rgb(0,0,0,0)", strokeWidth: 0.5, interval: 10 }),
                        $(go.Shape, "LineV", { stroke: "rgb(0,0,0,0)", strokeWidth: 0.5 }),
                        $(go.Shape, "LineV", { stroke: "rgb(0,0,0,0)", strokeWidth: 0.5, interval: 10 })
                    ),
                    "draggingTool.isGridSnapEnabled": true,  // dragged nodes will snap to a grid of 10x10 cells
                    "undoManager.isEnabled": true,
                    "ChangedSelection": onSelectionChanged, // view additional information
                    "commandHandler.archetypeGroupData": {isGroup: true, category: "OfNodes"},
                    mouseDrop: function (e) {
                        finishDrop(e, null);
                    },
                });

            // A data binding conversion function. Given an name, return the Geometry.
            // If there is only a string, replace it with a Geometry object, which can be shared by multiple Shape

            function portStyle(input) {
                return {
                    fill: "rgba(255,255,255,0)",
                    stroke:"rgba(0,0,0,0)",
                    // fromSpot: go.Spot.Right,
                    fromLinkable: true,
                    // toSpot: go.Spot.Left,
                    toLinkable: true,
                    toMaxLinks: 100,
                    cursor: "pointer",
                    desiredSize: new go.Size(0.1, 0.1),
                };
            }
            function NodeStyle() {
                return[
                    {
                    locationObjectName: 'main',
                    locationSpot: go.Spot.TopLeft,
                },
                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                    new go.Binding("angle", "angle"),
                    new go.Binding("scale", "scale")
                ]
            }
            //点击图元参数高亮
            function SelectNode() {
                return[
                    {
                        selectionChanged: function(node) {
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
                if(node.isSelected){
                    texts_select.each(function(text_select) {
                        text_select.category = "Text_selected";
                    });
                    attr_panel.each(function(panel_select) {
                        panel_select.category = "OfNodes_selected";
                    });
                    attr_text.each(function(attr_select) {
                        attr_select.category = "TextNode_selected";
                    })
                    }
                  else {
                    texts_select.each(function(text_select){
                        text_select.category="Text_0";
                    } );
                    attr_panel.each(function(panel_select) {
                        panel_select.category= "OfNodes";
                    });
                    attr_text.each(function(attr_select) {
                        attr_select.category = "TextNode";
                    })
                        }
            }
            //定义母线节点
            for(var i=0;i<nodeDataArray.length;i++){
                if(nodeDataArray[i].type=="BusbarSection"){
                    var Spots=[];
                    var pin=nodeDataArray[i].pin;
                    console.log("pin:",pin);
                    for(var j=0;j<pin.length;j++){
                        var Spot=
                            $(go.Shape, "Circle",
                                {
                                    fill: pin[j].fill_color,
                                    stroke:pin[j].stroke_color,
                                    fromLinkable:true,
                                    toLinkable: true,
                                    toMaxLinks: 100,
                                    cursor: "pointer",
                                    desiredSize: new go.Size(pin[j].r, pin[j].r),
                                },
                                { portId:pin[j].index ,alignment: new go.Spot(pin[j].x_pin, pin[j].y_pin) ,})

                        Spots.push(Spot);
                    }
                    console.log("spot:", Spots);
                    myDiagram.nodeTemplateMap.add(nodeDataArray[i].key,
                        $(go.Node,"Spot",SelectNode(),
                            {
                                locationSpot: go.Spot.Center,
                            },
                            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),

                            $(go.Shape, "Rectangle",
                                {
                                    name: "NODESHAPE",strokeWidth: 3
                                },
                                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)
                            ),
                            new go.Binding("stroke", "stroke_color"),
                            new go.Binding("fill", "fill_color"),
                            Spots
                        )
                    )
                }
            }
            var busbarsection=
                $(go.Node,SelectNode(), {
                        locationObjectName: 'main',
                        locationSpot: go.Spot.TopLeft,
                    },
                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                    { // special resizing: just at the ends
                        resizable: true, resizeObjectName: "SHAPE", resizeAdornmentTemplate: resizeAdornment,
                        rotatable:true,
                        fromLinkable: true, toLinkable: true
                    },
                    $(go.Shape,
                        { // horizontal line stretched to an initial width of 200
                            name: "SHAPE", geometryString: "M0 0 L100 0 H1",
                            width: 100
                        },
                        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
                    new go.Binding("stroke", "stroke_color"),
                    new go.Binding("fill", "fill_color")
                );
            var capacitor_p =
                $(go.Node, "Spot",SelectNode(),  NodeStyle(),
                    $(go.Picture,"images/capacitor_p.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) })
                );
            var capacitor_s =
                $(go.Node, "Spot",SelectNode(),  NodeStyle(),
                    $(go.Picture,"images/capacitor_s.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0, 0.5) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(1, 0.5) })
                );
            var cbreaker_1 =
                $(go.Node, "Spot",SelectNode(), NodeStyle(),
                    $(go.Picture,"images/cbreaker_1.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var cbreaker_2 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/cbreaker_2.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var disconnector_1 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/disconnector_1.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var disconnector_2 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/disconnector_2.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var disconnector_3 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/disconnector_3.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var energyconsumer_0 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/energyconsumer_1.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) })
                );
            var energyconsumer_1 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/energyconsumer_0.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0.5) })
                );
            var generalmeter =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/generalmeter.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        })
                );
            var generator =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/generator.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0.5) })
                );
            var grounddisconnector_1 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/grounddisconnector_1.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) })
                );
            var grounddisconnector_2 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/grounddisconnector_2.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) })
                );
            var reactor_p =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/reactor_p.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) })
                );
            var reactor_s =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/reactor_s.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0, 0.5) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(1, 0.5) })
                );
            var station_1_1 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/station_1_1.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0.5) })
                );
            var station_1_2 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/station_1_2.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0.5) })
                );
            var station_1_3 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/station_1_3.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0.5) })
                );
            var station_2_1 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/station_2_1.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0.5) })
                );
            var station_2_2 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/station_2_2.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0.5) })
                );
            var station_2_3 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/station_2_3.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0.5) })
                );
            var transformer2_0 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer2_0.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var transformer2_1 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer2_1.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var transformer2_2 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer2_2.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var transformer2_3 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer2_3.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var transformer2_4 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer2_4.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var transformer2_5 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer2_5.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var transformer2_6 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer2_6.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var transformer2_7 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer2_7.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var transformer2_8 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer2_8.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) })
                );
            var transformer3_0 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_0.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
            var transformer3_1 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_1.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
            var transformer3_2 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_2.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
            var transformer3_3 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_3.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
            var transformer3_4 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_4.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
            var transformer3_5 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_5.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
            var transformer3_6 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_6.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
            var transformer3_7 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_7.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
            var transformer3_8 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_8.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
            var transformer3_9 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_9.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_10 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_10.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_11 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_11.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_12 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_12.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_13 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_13.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_14 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_14.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_15 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_15.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_16 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_16.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_17 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_17.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_18 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_18.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_19 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_19.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_20 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_20.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_21 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_21.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_22 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_22.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_23 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_23.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_24 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_24.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
                var transformer3_25 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_25.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
                );
            var transformer3_26 =
                $(go.Node, "Spot",SelectNode(),NodeStyle(),
                    $(go.Picture,"images/transformer3_26.svg",
                        {
                            name: "Picture",
                            margin: 1.5,
                        }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "0", alignment: new go.Spot(0.5, 0) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "1", alignment: new go.Spot(0.5, 1) }),
                    $(go.Shape, "Circle", portStyle(true),
                        { portId: "2", alignment: new go.Spot(1, 0.5) })
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
                                editable: true,
                                opacity: 0.75,
                                stroke: "#f00",
                            },
                            new go.Binding("text", "ts").makeTwoWay(),
                            new go.Binding("font", "ff"),
                            new go.Binding("strokeWidth", "lw"),
                            new go.Binding("strokeDashArray", "ls"),
                            new go.Binding("angle", "angle"),
                            new go.Binding("scale", "scale"))
                    )
                );
            var groupNode=
                $(go.Group, "Auto",
                    {
                        isShadowed: true,//阴影
                        movable: true,//允许拖动
                        locationSpot: go.Spot.RightCenter, locationObjectName: "SHAPE",
                        selectionObjectName: "SHAPE", rotatable: true,
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
                        {fill: "rgba(255,102,102,0.3)", stroke: null, strokeWidth: 2}),
                    $(go.Panel, "Vertical",  // title above Placeholder
                        $(go.Placeholder,
                            {padding: 5, alignment: go.Spot.TopRight})
                    ),  // end Vertical Panel
                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)

                )
            var groupNode_selected=
                $(go.Group, "Auto",
                    {
                        isShadowed: true,//阴影
                        movable: true,//允许拖动
                        locationSpot: go.Spot.RightCenter, locationObjectName: "SHAPE",
                        selectionObjectName: "SHAPE", rotatable: true,
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
            var attrNode=
                $(go.Node, "Auto",
                    { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
                        mouseDrop: function (e, nod) {
                            finishDrop(e, nod.containingGroup);
                        }
                    },
                    $(go.Shape, "Rectangle",
                        {fill: "rgba(255,102,102,0.3)", stroke: null},
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
                                stroke: "#fff",
                                editable: true, isMultiline: false,
                            },
                            new go.Binding("text", "text").makeTwoWay()),
                        $(go.TextBlock,
                            {
                                row: 0, column: 1,
                                font: "5pt Segoe UI,sans-serif",
                                editable: true, isMultiline: false,
                                stroke: "#fff",
                                margin: new go.Margin(0, 0, 0, 3)
                            },
                            new go.Binding("text", "value").makeTwoWay())
                    ), // end Table Panel
                    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)
                )
            var attrNode_selected=
                $(go.Node, "Auto",
                    { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
                        mouseDrop: function (e, nod) {
                            finishDrop(e, nod.containingGroup);
                        }
                    },
                    $(go.Shape, "Rectangle",
                        {fill: "rgba(255,153,51,0.6)", stroke: null},
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
                                stroke: "#fff",
                                editable: true, isMultiline: false,
                            },
                            new go.Binding("text", "text").makeTwoWay()),
                        $(go.TextBlock,
                            {
                                row: 0, column: 1,
                                font: "5pt Segoe UI,sans-serif",
                                editable: true, isMultiline: false,
                                stroke: "#fff",
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
                            name: "SHAPE", fill:"transparent",stroke: null,
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
                    { relinkableFrom: true, relinkableTo: true, reshapable: true },
                    {
                        routing: go.Link.Orthogonal,
                        curve: go.Link.JumpOver,
                        corner: 0,
                        toShortLength: 1,
                    },
                    new go.Binding("points","points").makeTwoWay(),
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
                            figure:"Resistor",
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
                    { relinkableFrom: true, relinkableTo: true, reshapable: true },
                    {
                        routing: go.Link.Orthogonal,
                        curve: go.Link.JumpOver,
                        corner: 0,
                        toShortLength: 1,
                    },
                    new go.Binding("points","points").makeTwoWay(),
                    $(go.Shape,
                        new go.Binding("stroke", "stroke_color"),
                        new go.Binding("fill", "fill_color"),
                        new go.Binding("strokeWidth", "lw"),
                        new go.Binding("strokeDashArray", "ls"),
                        new go.Binding("angle", "angle"),
                        new go.Binding("scale", "scale")
                    ),
                    $(go.Shape,  // the "to" arrowhead
                        { fromArrow:"BackwardLineFork",scale: 2,},
                        new go.Binding("stroke", "stroke_color"),
                        new go.Binding("fill", "fill_color")
                    ),
            $(go.Shape,  // the "to" arrowhead
                { toArrow:"LineFork",scale: 2,},
                new go.Binding("stroke", "stroke_color"),
                new go.Binding("fill", "fill_color")
            )
                ));
            //普通连线
            myDiagram.linkTemplate =
                $(go.Link,
                    { relinkableFrom: true, relinkableTo: true, reshapable: true },
                    {
                        routing: go.Link.Orthogonal,
                        curve: go.Link.JumpOver,
                        corner: 0,
                        toShortLength: 1
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
            // myDiagram.addDiagramListener("ObjectSingleClicked", function(e) {
            //     var Select_Port = e.subject.part.data.key;
            //     for(var i in text_node[Select_Port]){
            //
            //         var node_select= myDiagram.model.findNodeDataForKey(text_node[Select_Port][i]);
            //         console.log("node_select",node_select);
            //         node_select.stroke_color="#ffff00";
            //         node_select.fill_color="#ffff00";
            //         myDiagram.model.updateTargetBindings(node_select);
            //     }
            //
            // });
            myDiagram.addModelChangedListener(function(evt) {
                if (!evt.isTransactionFinished) return;
                var txn = evt.object;  // a Transaction
                if (txn === null) return;
                // iterate over all of the actual ChangedEvents of the Transaction
                txn.changes.each(function(e) {
                    if(e.Dj=="location")
                    {
                        console.log(e);
                        if(e.object!=null){
                            var node_key=e.object.key;
                            var attr_panel=myDiagram.findNodesByExample({"panel_objId":node_key});
                            var attr_text=myDiagram.findNodesByExample({"attr_objId":node_key});
                            var texts_select=myDiagram.findNodesByExample({"msp":node_key});
                            var changeX=e.newValue.x-e.oldValue.x;
                            var changeY=e.newValue.y-e.oldValue.y;

                            attr_panel.each(function(panel_select) {
                                var pos=panel_select.data["pos"].trim().split(" ")
                                var x=new Number(pos[0])+changeX;
                                var y=new Number(pos[1])+changeY;
                                var loc=(x).toString()+" "+(y).toString();
                                panel_select.data.pos=loc;
                                console.log("panel_select",panel_select);
                                myDiagram.model.updateTargetBindings(panel_select.data);
                                });
                            attr_text.each(function(attr_select) {
                                var pos=attr_select.data["pos"].trim().split(" ")
                                var x=new Number(pos[0])+changeX;
                                var y=new Number(pos[1])+changeY;
                                var loc=(x).toString()+" "+(y).toString();
                                attr_select.data.pos=loc;
                                console.log("attr_select",attr_select);
                                myDiagram.model.updateTargetBindings(attr_select.data);
                            });
                            texts_select.each(function(text_select) {
                                var pos=text_select.data["pos"].trim().split(" ")
                                var x=new Number(pos[0])+changeX;
                                var y=new Number(pos[1])+changeY;
                                var loc=(x).toString()+" "+(y).toString();
                                text_select.data.pos=loc;
                                console.log("text_select",text_select);
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
            myDiagram.nodeTemplateMap.add("EnergyConsumer_0",energyconsumer_0);
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
            myDiagram.nodeTemplateMap.add("1_Station_1_1", station_1_1);
            myDiagram.nodeTemplateMap.add("1_Station_1_2", station_1_2);
            myDiagram.nodeTemplateMap.add("1_Station_1_3", station_1_3);
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
            myDiagram.nodeTemplateMap.add("BusbarSection_0",busbarsection);
            myDiagram.groupTemplateMap.add("OfNodes",groupNode);
            myDiagram.nodeTemplateMap.add("TextNode",attrNode);
            myDiagram.groupTemplateMap.add("OfNodes_selected",groupNode_selected);
            myDiagram.nodeTemplateMap.add("TextNode_selected",attrNode_selected);
            myDiagram.model.linkFromPortIdProperty="fromPort";
            myDiagram.model.linkFromPortIdProperty="toPort";
            // myDiagram.model=  new go.GraphLinksModel(nodeDataArray, linkDataArray);
            myDiagram.model=go.Model.fromJson(model);
            getParaPanel();
        }
    }
}


function onSelectionChanged(e) {
}
//获取参数列表
function getParaPanel() {
    console.log("getattrs:",attrs);
    for (var k=0;k<attrs.length;k++) {
        var node_attrs=attrs[k];
        console.log("node_attr:",node_attrs);
        if (node_attrs.length > 0) {
            var goKey = node_attrs[0].objId;
            var para = {};
            var ids={};
            for (var j=0;j<node_attrs.length;j++) {
                para[node_attrs[j]["objName"]] = node_attrs[j]["objName"];
                ids[node_attrs[j]["objName"]]=node_attrs[j]["id"];
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
                para_node["panel_objId"]=goKey;
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
                        node["text"] = i;
                        node["value"] = 0;
                        node["group"] = goKey + "_para";
                        node["attr_objId"]=goKey;
                        node["category"] = "TextNode";
                        myDiagram.model.addNodeData(node);
                }
            }
        }
    }
}
