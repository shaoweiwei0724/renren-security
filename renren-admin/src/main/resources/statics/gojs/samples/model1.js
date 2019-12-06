var swan_obj_list;
var swan_objs=[];
var icon={};
function init() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this

    var str={};
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://172.72.101.114:8080/renren-admin/sys/sifanyclass/select/18", true);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status ===200){
            str=JSON.parse(xmlHttp.responseText);
            console.log(str);
    console.log(str.classLists);
    var html="";
    for(var i=0;i< str.classLists.length;i++){
       html+='<div style="background-color:#1E90FF; width: 200px">\n' +
           '                <div onclick="setTab(\''+(i+1)+'\')"  style="float: top; cursor: pointer;z-index: 99; width: 200px; background-color: #1E90FF;">\n' +
           '                    <input id="model'+(i+1)+'"  style=" background-color: #1E90FF;cursor: pointer; font-size: large; width:70%; height:40px;margin-left:30px;background-color:#1E90FF; border:0px; color:#EBEBEB"  value="'+str.classLists[i].name+'"/>\n' +
           '                    <img id="pic'+(i+1)+'" style=" width:10%;  float: left; margin-top:10px;background-color: #1E90FF;"    src="images/back.png"/>\n' +
           '                    <!--                    <a target="_self" href="#" rel="external nofollow" rel="external nofollow" rel="external nofollow" onclick="setTab(\'one\',2,3)" id="one2">锅炉类</a>-->\n' +
           '                    <div style="width: 200px; height:10px ;border:0px;background-color: #1E90FF; "></div>\n' +
           '                </div>\n' +
           '                <center>\n' +
           '                    <div   style="display: block; width: 200px;" id="m'+(i+1)+'"><div id="myPaletteDiv'+(i+1)+'" style="height:400px;width: 200px;  border: solid 1px black"></div></div>\n' +
           '                </center>\n' +
           '            </div>';
    }
    document.getElementById("bu").innerHTML=(html);

    var list=str.classLists[0].childs;
    swan_obj_list=str.classLists;

    for(var i in swan_obj_list){
        var swan_obj_list_i=swan_obj_list[i]

        var swan_obj_i=[];
        for(var i in swan_obj_list_i['childs']){
            var child_i=swan_obj_list_i['childs'][i];
            icon[child_i.id]=child_i.icons;
            swan_obj_i.push({"icon":child_i.id, "iconWidth":30, "iconHeight":60,  "text":child_i.name, "source":child_i});
        }
        swan_objs.push(swan_obj_i)
    }


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
        // var geo = icon[geoname];
        // if (typeof geo === "string") {
        //     geo = icon[geoname] = go.Geometry.parse(geo, true);
        // }
        // return geo;
        var geo=icon[geoname];
        return "http://172.72.101.114:8080/renren-admin/sys/sifanydataimage/image/"+geo+".svg";
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
        $(go.Node, "Spot",
            {
                locationObjectName: 'main',
                locationSpot: go.Spot.Center,
            },
            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
            // The main element of the Spot panel is a vertical panel housing an optional icon,
            // plus a rectangle that acts as the port
            $(go.Panel, "Vertical",
                // $(go.Shape, {
                //         name: 'icon',
                //         width: 1, height: 1,
                //         stroke: null, strokeWidth: 0,
                //         fill: "#41BFEC"/* blue*/
                //     },
                //     new go.Binding("fill", "color"),
                //     new go.Binding("width", "iconWidth"),
                //     new go.Binding("height", "iconHeight"),
                //     new go.Binding("geometry", "icon", geoFunc)),
                $(go.Picture,
                    {
                        desiredSize: new go.Size(100,100),
                        // fill: "#41BFEC"/* blue*/
                    },
                    new go.Binding("source", "icon",geoFunc )),
            ),

            $(go.TextBlock, {
                    font: "14px Lato, sans-serif",
                    textAlign: "center",
                    margin: 3,
                    maxSize: new go.Size(100, NaN),
                    alignment: go.Spot.TopCenter,
                    alignmentFocus: go.Spot.BottomCenter
                },

                new go.Binding("text")),

            // four small named ports, one on each side:
            makePort("T", go.Spot.Top, true, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, true),
            { // handle mouse enter/leave events to show/hide the ports
                mouseEnter: function(e, node) { showSmallPorts(node, true); },
                mouseLeave: function(e, node) { showSmallPorts(node, false); }
            }
        );




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
                        myDiagram.model.removeLinkDataCollection(removeLinks)
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

    var myPalettes=[];
    for(var i=0;i<swan_obj_list.length;i++){
        myPalette =
            $(go.Palette, "myPaletteDiv"+(i+1),  // must name or refer to the DIV HTML element
                {
                    maxSelectionCount: 1,
                    nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
                    linkTemplate: // simplify the link template, just in this Palette
                        $(go.Link,
                            { // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
                                // to line up the Link in the same manner we have to pretend the Link has the same location spot
                                locationSpot: go.Spot.Center,
                                selectionAdornmentTemplate:
                                    $(go.Adornment, "Link",
                                        { locationSpot: go.Spot.Center },
                                        $(go.Shape,
                                            { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }),
                                        $(go.Shape,  // the arrowhead
                                            { toArrow: "Standard", stroke: null })
                                    )
                            },
                            {
                                routing: go.Link.AvoidsNodes,
                                curve: go.Link.JumpOver,
                                corner: 5,
                                toShortLength: 4
                            },
                            new go.Binding("points"),
                            $(go.Shape,  // the link path shape
                                { isPanelMain: true, strokeWidth: 2 }),
                            $(go.Shape,  // the arrowhead
                                { toArrow: "Standard", stroke: null })
                        ),
                    model: new go.GraphLinksModel(swan_objs[i])
                });
        myPalettes.push(myPalette)
    }

    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    loop();  // animate some flow through the pipes
        }
    };
}

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

//保存模型弹出框
function save() {
    var popBox = document.getElementById("popBox");
    var popLayer = document.getElementById("popLayer");
    popBox.style.display = "block";
    popLayer.style.display = "block";
}
//关闭保存框
function closeSave() {
    var popBox = document.getElementById("popBox");
    var popLayer = document.getElementById("popLayer");
    var name = document.getElementById("m_name");
    var file= document.getElementById("file");
    var img= document.getElementById("imgs");
    popBox.style.display = "none";
    popLayer.style.display = "none";
    name.value="";
    file.value="";
    img.src="images/null.png";
    console.log(myDiagram.model.toJson());
}
//获取图片
var img = document.querySelector('img');
var reader = new FileReader();//创建读取文件对象
var image='';
 function getpic(obj) {
    //获取文件
    var file = obj.files[0];
    //读取文件
    reader.readAsDataURL(file);
    //在回调函数中修改Img的src属性
     reader.onloadstart = function (e) {
         console.log("开始读取....");
     }
     reader.onprogress = function (e) {
         console.log("正在读取中....");
     }
     reader.onabort = function (e) {
         console.log("中断读取....");
     }
     reader.onerror = function (e) {
         console.log("读取异常....");
     }
     reader.onload = function (e) {
         console.log("成功读取....");
         var img = document.getElementById("imgs");
         img.src = e.target.result;
         image=e.target.result;
         //或者 img.src = this.result;  //e.target == this
     }
     reader.readAsDataURL(file)
 }
 //保存模型
function sure() {
     var name=document.getElementById("m_name");
     var res={};
     if(name.value==""||image=="")
     {
         alert("请输入保存信息");
     }
     else {
         res.img=image;
         res.name=name.value;
         res.model=myDiagram.model.toJson();
         console.log(res);
         closeSave();
         alert("成功保存！");
     }

}

