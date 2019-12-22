var map;
var swan_objs=[];
var swan_objs_res;
var icon={};
var swan_redis_data={}
var baseIP="../../../";
var selectSceneId=localStorage.selectSceneId;
var id=localStorage.modelId;
var nodeDataArray = [];
var linkDataArray = [];
var str = {};
var model="";

function init() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this



    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", baseIP + "sys/sifanyclass/scenes/" + selectSceneId, true);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            str = JSON.parse(xmlHttp.responseText);
            map = JSON.parse(str.mapJson);
            console.log("id:",id);
            swan_objs_res = str.objs;
            for (var i in swan_objs_res) {
                var attrs = swan_objs_res[i].attrs;
                if (attrs.length > 0) {
                    for (var j in attrs) {
                        swan_redis_data[attrs[j]["id"].toString()] = 0
                    }
                }
            }
            for (var i = 0; i < map.nodeDataArray.length; i++) {

                if(map.nodeDataArray[i].category=="TextNode"||map.nodeDataArray[i].category=="OfNodes"){
                }
                else {
                    icon[map.nodeDataArray[i].icon] = map.nodeDataArray[i].source.icons;
                }
                if(map.nodeDataArray[i].category=="TextNode")
                {
                    if(map.nodeDataArray[i].onm==true)
                    {
                        console.log("map:",map.nodeDataArray[i]);
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

            var model={};
            model.class="GraphLinksModel",
            model.nodeDataArray=nodeDataArray;
            model.linkDataArray=linkDataArray;
            document.getElementById("mySavedModel").value =JSON.stringify(model);
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

            //鼠标双击弹出属性选择界面
            function nodeClick(e, node) {

                // alert(node.part.data["group"]);
                showContextMenu(node.part.data["key"], e.event.clientX - 10, e.event.clientY - 10);

            }

            function showContextMenu(key, x, y) {
                var html="";
                var title="";
                for (var i in swan_objs_res) {
                    var goKey = swan_objs_res[i].goKey;
                    if (key == goKey) {
                        console.log("1",swan_objs_res[i]);
                        title="<p>"+swan_objs_res[i].name+"显示属性配置</p>"
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
                                if (onm[i]==false) {
                                    html += '<tr><td><input type="checkbox" name="'+goKey+'" onclick="changeParaOmn(this)"  id="'+attrs_id[i]+'">' + i+'</td></tr>';
                                    console.log("html",html);
                                } else {
                                    html += '<tr><td><input type="checkbox" name="'+goKey+'" onclick="changeParaOmn(this)" checked="true" id="'+attrs_id[i]+'">' + i+'</td></tr>';
                                    console.log("html",html);
                                }
                            }
                            console.log(html);
                            var div=document.getElementById("layer");
                            var check=document.getElementById("check");
                            var title_div=document.getElementById("title");

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

            myDiagram.nodeTemplateMap.add("Exclusive1",
                $(go.Node, commonNodeStyle(),
                    {doubleClick:OnmChange},
                    { // special resizing: just at the ends
                        resizable: true, resizeObjectName: "SHAPE", resizeAdornmentTemplate: resizeAdornment,
                        rotatable:true,
                        fromLinkable: true, toLinkable: true
                    },
                    $(go.Shape,
                        { // horizontal line stretched to an initial width of 200
                            name: "SHAPE", geometryString: "M0 0 L100 0 H1",
                            fill: "transparent", stroke: "#2875ff", width: 100
                        },
                        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
                    $(go.TextBlock, {
                            font: "14px Lato, sans-serif",
                            textAlign: "center",
                            margin: 3,
                            stroke:"white",
                            maxSize: new go.Size(100, NaN),
                            alignment: go.Spot.TopCenter,
                            alignmentFocus: go.Spot.BottomCenter
                        },

                        new go.Binding("text"))
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
                    {doubleClick:OnmChange},
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
                );


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
            //在线仿真指标显示配置
            function OnsChange(e,node){
                showLabelOns(node.part.data["key"], e.event.clientX - 10, e.event.clientY - 10);
            }
            function showLabelOns(key, x, y) {
                var html="";
                var label;
                for (var i in swan_objs_res) {
                    var goKey = swan_objs_res[i].goKey;
                    if (key == goKey) {
                        var attrs = swan_objs_res[i].attrs;
                        if (attrs.length > 0) {
                            var para = {};//参数名称
                            var attrs_id={}//参数ID
                            var ons = {};//参数显示标志
                            for (var j in attrs) {
                                para[attrs[j]["objName"]] = attrs[j]["id"].toString();
                                ons[attrs[j]["objName"]] = attrs[j]["onlineSim"];
                                attrs_id[attrs[j]["objName"]] = attrs[j]["id"];
                            }
                            console.log("onm:",ons);
                            for (var i in para) {
                                console.log("i:",ons[i]);
                                if (ons[i] == 0) {
                                    html += '<tr><td><input type="checkbox" name="'+goKey+'" onclick="changeParaOns(this,'+attrs_id[i]+')"  id="'+attrs_id[i]+'">' + i+'</td></tr>';
                                    console.log("html",html);
                                    label=false;
                                } else {
                                    html += '<tr><td><input type="checkbox" name="'+goKey+'" onclick="changeParaOns(this,'+attrs_id[i]+')" checked="true" id="'+attrs_id[i]+'">' + i+'</td></tr>';
                                    console.log("html",html);
                                    label=true;
                                }

                            }

                            console.log(html);
                            var div=document.getElementById("layer_ons");
                            var check=document.getElementById("check_ons");
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
            //离线监测指标显示配置
            function OfsChange(e, node) {
                showLabelOfs(node.part.data["key"], e.event.clientX - 10, e.event.clientY - 10);
            }

            function showLabelOfs(key, x, y) {
                var html="";
                for (var i in swan_objs_res) {
                    var goKey = swan_objs_res[i].goKey;
                    if (key == goKey) {
                        var attrs = swan_objs_res[i].attrs;
                        if (attrs.length > 0) {
                            var para = {};//参数名称
                            var attrs_id={}//参数ID
                            var ofs = {};//参数显示标志
                            for (var j in attrs) {
                                para[attrs[j]["objName"]] = attrs[j]["id"].toString();
                                ofs[attrs[j]["objName"]] = attrs[j]["offlineSim"];
                                attrs_id[attrs[j]["objName"]] = attrs[j]["id"];
                            }
                            for (var i in para) {
                                console.log("i:",ofs[i]);
                                if (ofs[i] == "0") {
                                    html += '<tr><td><input type="checkbox" name="'+goKey+'" onclick="changeParaOfs(this,'+attrs_id[i]+')"  id="'+attrs_id[i]+'">' + i+'</td></tr>';
                                    console.log("html",html);
                                } else {
                                    html += '<tr><td><input type="checkbox" name="'+goKey+'" onclick="changeParaOfs(this,'+attrs_id[i]+')" checked="true" id="'+attrs_id[i]+'">' + i+'</td></tr>';
                                    console.log("html",html);
                                }
                            }
                            console.log(html);
                            var div=document.getElementById("layer_ofs");
                            var check=document.getElementById("check_ofs");
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
            //在线监测指标显示配置
            function OnmChange(e,node){
                showLabelOnm(node.part.data["key"], e.event.clientX - 10, e.event.clientY - 10);
            }
            function showLabelOnm(key, x, y) {
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
            myDiagram.model =  go.Model.fromJson(document.getElementById("mySavedModel").value);
            // getPic(nodeDataArray);
            getParaPanel();//获取参数列表
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
    for (var i in swan_objs_res) {
        var attrs = swan_objs_res[i].attrs;
        if (attrs.length > 0) {
            var goKey = swan_objs_res[i].goKey;
            var para = {}
            for (var j in attrs) {
                para[attrs[j]["objName"]] = swan_redis_data[attrs[j]["id"].toString()]
            }
            // console.log(goKey)
            // console.log(para)
            changePara(goKey, para);
        }
    }
}

function changePara(goKey, para) {
    var j = 0;
    for (var i in para) {
        j += 1;
        getPara(j, goKey, i, para[i]);
    }
}

function getPara(j, key, i, value) {

    var para = myDiagram.model.findNodeDataForKey(key + "_para" + j);//首先拿到这个节点的对象
    myDiagram.model.setDataProperty(para, "value", value)
}

//end改变参数


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
            var group = myDiagram.model.findNodeDataForKey(goKey);
            var pos=group["pos"].trim().split(" ")
            var x=new Number(pos[0])-75;
            var y=new Number(pos[1])-100;
            var loc=(x).toString()+" "+(y).toString();
            console.log("loc:",loc);
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


function onSelectionChanged(e) {
}

/**
 * 更改显示状态
 */
//在线仿真显示更新
function changeParaOns(checkbox,attr_id){
    var data={};
    var label;
    //获取参数
    for (var i in swan_objs_res) {
        var goKey = swan_objs_res[i].goKey;
        if (checkbox.name == goKey.toString()) {
            var attrs = swan_objs_res[i].attrs;
            for(var j in attrs){
                console.log("attrs:",attrs[j]);
                if(attrs[j].id.toString()==checkbox.id)
                {
                    console.log("attrs:",attrs);
                    data=attrs[j];
                }
            }
        }
    }
    if(checkbox.checked==false)
    {
        data.onlineSim=false;
        label=false;
    }
    else {
        data.onlineSim=true;
        label=true;
    }
    //修改组态图节点属性
    var node_ons = myDiagram.model.findNodeDataForKey(attr_id);//首先拿到这个节点的对象
    myDiagram.model.setDataProperty(node_ons, 'ons', label);
    console.log("JSOn:",node_ons);
    //修改数据库的值
    var xmlHttpOns = new XMLHttpRequest();
    xmlHttpOns.open("POST", "../../../sys/sifanyobj/updateons", true);
    xmlHttpOns.setRequestHeader('Content-Type', 'application/json');
    xmlHttpOns.send(JSON.stringify(data));
    xmlHttpOns.onreadystatechange = function () {
        if (xmlHttpOns.readyState === 4 && xmlHttpOns.status === 200) {
        }
    }
}
//离线仿真界面配置
function  changeParaOfs(checkbox,attr_id) {
    var data={};
    var label;

    //获取参数
    for (var i in swan_objs_res) {
        var goKey = swan_objs_res[i].goKey;
        if (checkbox.name == goKey.toString()) {
            var attrs = swan_objs_res[i].attrs;
            for(var j in attrs){
                console.log("attrs:",attrs[j]);
                if(attrs[j].id.toString()==checkbox.id)
                {
                    console.log("attrs:",attrs);
                    data=attrs[j];
                }
            }
        }
    }
    if(checkbox.checked==false)
    {
        data.offlineSim=0;
        label=false;
    }
    else {
        data.offlineSim=1;
        label=true;
    }
    //修改组态图节点属性
    var node_ofs = myDiagram.model.findNodeDataForKey(attr_id);//首先拿到这个节点的对象
    myDiagram.model.setDataProperty(node_ofs, 'ofs', label);
    //修改数据库的值
    var xmlHttpOfs = new XMLHttpRequest();
    xmlHttpOfs.open("POST", "../../../sys/sifanyobj/updateofs", true);
    xmlHttpOfs.setRequestHeader('Content-Type', 'application/json');
    xmlHttpOfs.send(JSON.stringify(data));
    xmlHttpOfs.onreadystatechange = function () {
        if (xmlHttpOfs.readyState === 4 && xmlHttpOfs.status === 200) {
        }
    }
}
//在线监测显示状态
function changeParaOnm(checkbox,attr_id){
    var data={};
    var label;
    //获取参数
    for (var i in swan_objs_res) {
        var goKey = swan_objs_res[i].goKey;
        console.log("key:",goKey);
        if(goKey!=null) {
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
    if(checkbox.checked==false)
    {
        data.onlineMonitor=false;
        label=false;

    }
    if(checkbox.checked==true) {
        data.onlineMonitor=true;
        label=true;
    }

    //修改组态图节点属性
    var node_onm = myDiagram.model.findNodeDataForKey(attr_id);//首先拿到这个节点的对象
    if(node_onm!=null){
        myDiagram.model.setDataProperty(node_onm, 'onm',label);
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
            console.log("message:",xmlHttpOmn.responseText);
        }
        console.log("message:",xmlHttpOmn.responseText);
    }
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
//保存页面配置
function ok() {
    //保存当前页面
    console.log("id:",selectSceneId);
    var model={};
    model.id=id;
    model.content=myDiagram.model.toJson();
    var xmlHttpSave = new XMLHttpRequest();
    xmlHttpSave.open("POST", "../../../sys/sifanydatatext/update", true);
    xmlHttpSave.setRequestHeader('Content-Type', 'application/json');
    xmlHttpSave.send(JSON.stringify(model));
    xmlHttpSave.onreadystatechange = function () {
        if (xmlHttpSave.readyState === 4 && xmlHttpSave.status === 200) {
        }
    }
    window.location.reload();
}

function ok_onm(){
    var div_onm=document.getElementById("layer_onm");
    div_onm.style.display="none";
    ok()
}
function ok_ons(){
    var div_ons=document.getElementById("layer_ons");
    div_ons.style.display="none";
    ok()
}
function ok_ofs(){
    var div_ofs=document.getElementById("layer_ofs");
    div_ofs.style.display="none";
    ok()
}
