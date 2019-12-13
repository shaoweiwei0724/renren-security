function init() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates


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
    // Must name or refer to the DIV HTML element

    myDiagram =
        $(go.Diagram, "myDiagramDiv",
            {
                mouseDrop: function(e) { finishDrop(e, null); },
                // what to do when a drag-drop occurs in the Diagram's background

                "commandHandler.archetypeGroupData": { isGroup: true, category: "OfNodes" },

                grid: $(go.Panel, "Grid",
                    $(go.Shape, "LineH", { stroke: "rgb(0,0,0,0)", strokeWidth: 0.5 }),
                    $(go.Shape, "LineH", { stroke: "rgb(0,0,0,0)", strokeWidth: 0.5, interval: 10 }),
                    $(go.Shape, "LineV", { stroke: "rgb(0,0,0,0)", strokeWidth: 0.5 }),
                    $(go.Shape, "LineV", { stroke: "rgb(0,0,0,0)", strokeWidth: 0.5, interval: 10 })
                ),
                scale:0.7,
                minScale:0.1,
                maxScale:1.5,
            });
    myDiagram.groupTemplateMap.add("OfGroups",
        $(go.Group, "Auto",
            {
                background: "transparent",
                // highlight when dragging into the Group
                mouseDragEnter: function(e, grp, prev) { highlightGroup(e, grp, true); },
                mouseDragLeave: function(e, grp, next) { highlightGroup(e, grp, false); },
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
            new go.Binding("background", "isHighlighted", function(h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),
            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, "Rectangle",
                { fill: null, stroke: "#FFDD33", strokeWidth: 2 }),
            $(go.Panel, "Vertical",  // title above Placeholder
                $(go.Panel, "Horizontal",  // button next to TextBlock
                    { stretch: go.GraphObject.Horizontal, background: "#FFDD33" },
                    $("SubGraphExpanderButton",
                        { alignment: go.Spot.Right, margin: 5 }),
                    $(go.TextBlock,
                        {
                            alignment: go.Spot.Left,
                            editable: true,
                            margin: 5,
                            font: "bold 18px sans-serif",
                            opacity: 0.75,
                            stroke: "#404040"
                        },
                        new go.Binding("text", "text").makeTwoWay())
                ),  // end Horizontal Panel
                $(go.Placeholder,
                    { padding: 5, alignment: go.Spot.TopLeft })
            )  // end Vertical Panel
        ));  // end Group and call to add to template Map

    myDiagram.groupTemplateMap.add("OfNodes",
        $(go.Group, "Auto",
            {
                isShadowed:true,//阴影
                movable:true,//允许拖动
                deletable:false,//禁止删除
                shadowOffset:new go.Point(4, 4),//阴影的位置偏移
                locationSpot: new go.Spot(0.5, 1, 0, -21), locationObjectName: "SHAPE",
                selectionObjectName: "SHAPE", rotatable: true,
                background: "transparent",
                ungroupable: true,
                // highlight when dragging into the Group
                mouseDragEnter: function(e, grp, prev) {console.log(grp); highlightGroup(e, grp, true); },
                mouseDragLeave: function(e, grp, next) {console.log(grp); highlightGroup(e, grp, false); },
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
            new go.Binding("background", "isHighlighted", function(h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),

            $(go.Shape, "Rectangle",
                { fill: null, stroke: "#33D3E5", strokeWidth: 2 }),
            $(go.Panel, "Vertical",  // title above Placeholder
                $(go.Panel, "Horizontal",  // button next to TextBlock
                    { stretch: go.GraphObject.Horizontal, background: "#33D3E5" },
                    $("SubGraphExpanderButton",
                        { alignment: go.Spot.Right, margin: 5 })
                          ),  // end Horizontal Panel
                $(go.Placeholder,
                    { padding: 5, alignment: go.Spot.TopLeft })
            )  // end Vertical Panel

        ));  // end Group and call to add to template Map

    // replace the default Node template in the nodeTemplateMap
    myDiagram.nodeTemplateMap.add("TextNode",
        $(go.Node, "Auto",
            { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
                mouseDrop: function(e, nod) { finishDrop(e, nod.containingGroup); }
            },
            $(go.Shape, "Rectangle",
                { fill: "#ACE600", stroke: null },
                new go.Binding("fill", "color")),
            $(go.TextBlock,
                {
                    margin: 5,
                    editable: true,
                    font: "bold 13px sans-serif",
                    opacity: 0.75,
                    stroke: "#404040"
                },
                new go.Binding("text","text").makeTwoWay()),
            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)
        ));
    myDiagram.nodeTemplateMap.add("PicNode",
        $(go.Node, "Spot",
            { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
            },
            $(go.Picture,  // the icon showing the logo
                // You should set the desiredSize (or width and height)
                // whenever you know what size the Picture should be.
                { desiredSize: new go.Size(150, 100) },
                new go.Binding("source", "text", convertKeyImage)),
            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify)
        ));

    // replace the default Link template in the linkTemplateMap
    myDiagram.linkTemplate =
        $(go.Link,
            {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver,
                corner: 3,
                relinkableFrom: true, relinkableTo: true,
                selectionAdorned: false, // Links are not adorned when selected so that their color remains visible.
                shadowOffset: new go.Point(0, 0), shadowBlur: 5, shadowColor: "#000",
            },
            new go.Binding("isShadowed", "isSelected").ofObject(),
            $(go.Shape,
                { name: "SHAPE", strokeWidth: 2, stroke: "black" }));
    // the array of link data objects: the relationships between the nodes
    var myDate=new Date();
    var nodeDataArray = [
        { key:"A",text:"A", pos: "200 500", "isGroup":true, category:"OfGroups"},
        { key: "B",text:"B", pos:"500 500","isGroup":true,  category: "OfGroups"},
        { key: "C",text:"C", pos: "800 500","isGroup":true,  category: "OfGroups"  },
        { key: "D",text:"D", pos: "800 100","isGroup":true,  category: "OfGroups" },
        { key: "E",text:"E", pos: "500 100" ,"isGroup":true,  category: "OfGroups" },
        { key: "F",text:"F", pos: "200 100" ,"isGroup":true,  category: "OfGroups" },
        {key: "A_main",text:"A","isGroup":true,  category: "OfNodes",group:"A"},
        {key: "B_main",text:"B","isGroup":true,  category: "OfNodes",group:"B"},
        {key: "C_main",text:"C","isGroup":true,  category: "OfNodes",group:"C"},
        {key: "D_main",text:"D","isGroup":true,  category: "OfNodes",group:"D"},
        {key: "E_main",text:"E","isGroup":true,  category: "OfNodes",group:"E"},
        {key: "F_main",text:"F","isGroup":true,  category: "OfNodes",group:"F"},
        {key: "A_para1",text:"设备名称:A", category: "TextNode",group:"A_main"},
        {key: "A_para2",text:"电压:220V", category: "TextNode",group:"A_main"},
        {key: "A_para3",text:"耗电量:1000kw", category: "TextNode",group:"A_main"},
        {key: "B_para1",text:"设备名称:B", category: "TextNode",group:"B_main"},
        {key: "B_para2",text:"电压:220V", category: "TextNode",group:"B_main"},
        {key: "B_para3",text:"耗电量:1000kw", category: "TextNode",group:"B_main"},
        {key: "C_para1",text:"设备名称:C", category: "TextNode",group:"C_main"},
        {key: "C_para2",text:"电压:220V", category: "TextNode",group:"C_main"},
        {key: "C_para3",text:"耗电量:1000kw", category: "TextNode",group:"C_main"},
        {key: "D_para1",text:"设备名称:D", category: "TextNode",group:"D_main"},
        {key: "D_para2",text:"电压:220V", category: "TextNode",group:"D_main"},
        {key: "D_para3",text:"耗电量:1000kw", category: "TextNode",group:"D_main"},
        {key: "E_para1",text:"设备名称:E", category: "TextNode",group:"E_main"},
        {key: "E_para2",text:"电压:220V", category: "TextNode",group:"E_main"},
        {key: "E_para3",text:"耗电量:1000kw", category: "TextNode",group:"E_main"},
        {key: "F_para1",text:"设备名称:F", category: "TextNode",group:"F_main"},
        {key: "F_para2",text:"电压:220V", category: "TextNode",group:"F_main"},
        {key: "F_para3",text:"耗电量:1000kw", category: "TextNode",group:"F_main"},
        { key:"a",text:"A",group:"A",   category:"PicNode" },
        { key: "b",text:"B",group:"B",  category: "PicNode", },
        { key: "c",text:"C",group:"C", category: "PicNode"  },
        { key: "d",text:"D",group:"D", category: "PicNode"  },
        { key: "e",text:"E",group:"E" , category: "PicNode" },
        { key: "f",text:"F",group:"F" ,category: "PicNode" },

    ];
    var linkDataArray = [

        { from: "A", to: "B" },
        { from: "B", to: "C" },
        { from: "C", to: "D" },
        { from: "D", to: "E" },
        { from: "E", to: "F" },
        { from: "F", to: "A" },
        { from: "B", to: "E" },
    ];

    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    // var pos = myDiagram.model.modelData.position;
    // if (pos) myDiagram.initialPosition = go.Point.parse(pos);
}

function convertKeyImage(key) {
    return "images/"+key+".png";
}
