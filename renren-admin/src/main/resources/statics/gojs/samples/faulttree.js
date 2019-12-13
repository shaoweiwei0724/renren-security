
var red = "orangered";  // 0 or false
var green = "forestgreen";  // 1 or true

function init() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram =
        $(go.Diagram, "myDiagramDiv",  // create a new Diagram in the HTML DIV element "myDiagramDiv"
            {
                "draggingTool.isGridSnapEnabled": true,  // dragged nodes will snap to a grid of 10x10 cells
                "undoManager.isEnabled": true
            });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", function(e) {
        var button = document.getElementById("saveModel");
        if (button) button.disabled = !myDiagram.isModified;
        var idx = document.title.indexOf("*");
        if (myDiagram.isModified) {
            if (idx < 0) document.title += "*";
        } else {
            if (idx >= 0) document.title = document.title.substr(0, idx);
        }
    });

    var palette1 = new go.Palette("palette1");  // create a new Palette in the HTML DIV element "palette"
    var palette2 = new go.Palette("palette2");  // create a new Palette in the HTML DIV element "palette"
    // creates relinkable Links that will avoid crossing Nodes when possible and will jump over other Links in their paths
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
                { name: "SHAPE", strokeWidth: 2, stroke: "#fc91a6" }));

    // node template helpers
    var sharedToolTip =
        $("ToolTip",
            { "Border.figure": "RoundedRectangle" },
            $(go.TextBlock, { margin: 2 },
                new go.Binding("text", "", function(d) { return d.category; })));

    // define some common property settings
    function nodeStyle() {
        return [new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            new go.Binding("isShadowed", "isSelected").ofObject(),
            {
                angle:-90,
                selectionAdorned: false,
                shadowOffset: new go.Point(0, 0),
                shadowBlur: 15,
                shadowColor: "#000",
                toolTip: sharedToolTip
            }];
    }

    function nodeStyleR() {
        return [new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            new go.Binding("isShadowed", "isSelected").ofObject(),
            {
                selectionAdorned: false,
                shadowOffset: new go.Point(0, 0),
                shadowBlur: 15,
                shadowColor: "#000",
                toolTip: sharedToolTip
            }];
    }

    function shapeStyle() {
        return {
            name: "NODESHAPE",
            fill: "#26d692",
            stroke: "#0c5036",
            desiredSize: new go.Size(40, 40),
            strokeWidth: 2
        };
    }
    function innodeStyle() {
        return {
            name: "NODESHAPE",
            fill: "#ecf349",
            stroke: "#ffa500",
            desiredSize: new go.Size(40, 40),
            strokeWidth: 2
        };
    }
    function outnodeStyle() {
        return {
            name: "NODESHAPE",
            fill: "#ecf349",
            stroke: "#ffa500",
            desiredSize: new go.Size(100, 40),
            strokeWidth: 2
        };
    }

    function portStyle(input) {
        return {
            desiredSize: new go.Size(6, 6),
            fill: "#f3b2f6",
            stroke:"#c28098",
            // fromSpot: go.Spot.Right,
            fromLinkable: !input,
            // toSpot: go.Spot.Left,
            toLinkable: input,
            toMaxLinks: 1,
            cursor: "pointer",
            desiredSize: new go.Size(5, 5),
        };
    }
    function TextStyle() {
        return {
            stroke:"#333",
            font: "14px Lato, sans-serif",
            textAlign: "center",
        };
    }

    // define templates for each type of node
    var inputTemplate =
        $(go.Node, "Spot", nodeStyleR(),
            $(go.Shape, "Circle", innodeStyle()),
            $(go.Shape, "Circle", portStyle(false),  // the only port
                { portId: "", alignment: new go.Spot(0.5, 0) }),
            $(go.TextBlock,TextStyle(), new go.Binding("text"))
            );

    var outputTemplate =
        $(go.Node, "Spot", nodeStyleR(),
            $(go.Shape, "Rectangle", outnodeStyle()),  // override the default fill (from shapeStyle()) to be green
            $(go.Shape, "Circle", portStyle(true),  // the only port
                { portId: "", alignment: new go.Spot(0.5, 1) }),
             $(go.TextBlock,TextStyle(), new go.Binding("text"))
        );
    var nodeTemplate =
        $(go.Node, "Spot", nodeStyleR(),
            $(go.Shape, "Rectangle", outnodeStyle()),  // override the default fill (from shapeStyle()) to be green
            $(go.Shape, "Circle", portStyle(false),
                { portId: "in", alignment: new go.Spot(0.5, 0) }),
            $(go.Shape, "Circle", portStyle(true),
                { portId: "out", alignment: new go.Spot(0.5, 1) }),
            $(go.TextBlock,TextStyle(), new go.Binding("text"))
        );

    var andTemplate =
        $(go.Node, "Spot", nodeStyle(),
            $(go.Shape, "AndGate", shapeStyle()),
            $(go.Shape, "Circle", portStyle(true),
                { portId: "in1", alignment: new go.Spot(0, 0.3) }),
            $(go.Shape, "Circle", portStyle(true),
                { portId: "in2", alignment: new go.Spot(0, 0.7) }),
            $(go.Shape, "Circle", portStyle(false),
                { portId: "out", alignment: new go.Spot(1, 0.5) })
        );

    var orTemplate =
        $(go.Node, "Spot", nodeStyle(),
            $(go.Shape, "OrGate", shapeStyle()),
            $(go.Shape, "Circle", portStyle(true),
                { portId: "in1", alignment: new go.Spot(0.16, 0.3) }),
            $(go.Shape,"Circle", portStyle(true),
                { portId: "in2", alignment: new go.Spot(0.16, 0.7) }),
            $(go.Shape, "Circle", portStyle(false),
                { portId: "out", alignment: new go.Spot(1, 0.5) })
        );

    var xorTemplate =
        $(go.Node, "Spot", nodeStyle(),
            $(go.Shape, "XorGate", shapeStyle()),
            $(go.Shape, "Circle", portStyle(true),
                { portId: "in1", alignment: new go.Spot(0.26, 0.3) }),
            $(go.Shape, "Circle", portStyle(true),
                { portId: "in2", alignment: new go.Spot(0.26, 0.7) }),
            $(go.Shape, "Circle", portStyle(false),
                { portId: "out", alignment: new go.Spot(1, 0.5) })
        );

    var norTemplate =
        $(go.Node, "Spot", nodeStyle(),
            $(go.Shape, "NorGate", shapeStyle()),
            $(go.Shape,"Circle", portStyle(true),
                { portId: "in1", alignment: new go.Spot(0.16, 0.3) }),
            $(go.Shape,"Circle", portStyle(true),
                { portId: "in2", alignment: new go.Spot(0.16, 0.7) }),
            $(go.Shape,"Circle", portStyle(false),
                { portId: "out", alignment: new go.Spot(1, 0.5) })
        );

    var xnorTemplate =
        $(go.Node, "Spot", nodeStyle(),
            $(go.Shape, "XnorGate", shapeStyle()),
            $(go.Shape, "Circle", portStyle(true),
                { portId: "in1", alignment: new go.Spot(0.26, 0.3) }),
            $(go.Shape, "Circle", portStyle(true),
                { portId: "in2", alignment: new go.Spot(0.26, 0.7) }),
            $(go.Shape,"Circle", portStyle(false),
                { portId: "out", alignment: new go.Spot(1, 0.5) })
        );

    var nandTemplate =
        $(go.Node, "Spot", nodeStyle(),
            $(go.Shape, "NandGate", shapeStyle()),
            $(go.Shape, "Circle", portStyle(true),
                { portId: "in1", alignment: new go.Spot(0, 0.3) }),
            $(go.Shape, "Circle", portStyle(true),
                { portId: "in2", alignment: new go.Spot(0, 0.7) }),
            $(go.Shape, "Circle", portStyle(false),
                { portId: "out", alignment: new go.Spot(1, 0.5) })
        );

    var notTemplate =
        $(go.Node, "Spot", nodeStyle(),
            $(go.Shape, "Inverter", shapeStyle()),
            $(go.Shape, "Circle", portStyle(true),
                { portId: "in", alignment: new go.Spot(0, 0.5) }),
            $(go.Shape, "Circle", portStyle(false),
                { portId: "out", alignment: new go.Spot(1, 0.5) })
        );

    // add the templates created above to myDiagram and palette
    myDiagram.nodeTemplateMap.add("input", inputTemplate);
    myDiagram.nodeTemplateMap.add("output", outputTemplate);
    myDiagram.nodeTemplateMap.add("node", nodeTemplate);
    myDiagram.nodeTemplateMap.add("and", andTemplate);
    myDiagram.nodeTemplateMap.add("or", orTemplate);
    myDiagram.nodeTemplateMap.add("xor", xorTemplate);
    myDiagram.nodeTemplateMap.add("not", notTemplate);
    myDiagram.nodeTemplateMap.add("nand", nandTemplate);
    myDiagram.nodeTemplateMap.add("nor", norTemplate);
    myDiagram.nodeTemplateMap.add("xnor", xnorTemplate);

    // share the template map with the Palette
    palette1.nodeTemplateMap = myDiagram.nodeTemplateMap;
    palette1.model.nodeDataArray = [
        { category: "input",text:"input" },
        { category: "output" ,text:"output" },
        { category: "node",text:"A" },
        { category: "node",text:"B" },
        { category: "node",text:"C" },
    ];

    palette2.nodeTemplateMap = myDiagram.nodeTemplateMap;
    palette2.model.nodeDataArray = [
        { category: "and" },
        { category: "or" },
        { category: "xor" },
        { category: "not" },
        { category: "nand" },
        { category: "nor" },
        { category: "xnor" },
    ];

    // load the initial diagram
    load();

    // continually update the diagram
    loop();
}


// save a model to and load a model from JSON text, displayed below the Diagram
function save() {
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;
}
function load() {
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
}
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
