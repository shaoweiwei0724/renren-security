var swan_obj_list;
var swan_objs=[];
var swan_objs_res;
var icon={};
var iconsId=localStorage.iconsId ;
function init() {
    if (iconsId != null) {
        var xmlHttp1 = new XMLHttpRequest();
        xmlHttp1.open("GET", "../../../sys/sifanydatatext/scene/" + iconsId, true);
        xmlHttp1.send();
        xmlHttp1.onreadystatechange = function () {
            if (xmlHttp1.readyState === 4 && xmlHttp1.status === 200) {
                strs = JSON.parse(xmlHttp1.responseText);
                var map = strs.icons.content.toString();
                var mapJson=JSON.parse(map);
                console.log("map:",mapJson.nodeDataArray);
                for(var i = 0; i < mapJson.nodeDataArray.length; i++)
                {
                    console.log(mapJson.nodeDataArray[i].category);
                    if(mapJson.nodeDataArray[i].category=="OfNodes"){
                        delete mapJson.nodeDataArray[i];
                 }
                    if(mapJson.nodeDataArray[i].category=="TextNode"){
                        delete mapJson.nodeDataArray[i];
                    }
                }
                var modelJson=JSON.stringify(mapJson);
                document.getElementById("mySavedModel").value =modelJson;

            }
        }
    }


    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this

    var str={};
    var xmlHttp = new XMLHttpRequest();

    if("编辑组态" == localStorage.edit_change){
        xmlHttp.open("GET", "../../../sys/sifanyclass/select/115", true);
    }else{
        xmlHttp.open("GET", "../../../sys/sifanyclass/select/168", true);
    }
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status ===200){
            str=JSON.parse(xmlHttp.responseText);
            console.log("str:",str);
    var html="";
    for(var i=0;i< str.classLists.length;i++){
       html+='<div style=" width: 200px">\n' +
           '                <div onclick="setTab(\''+(i+1)+'\')"  style="float: top; cursor: pointer;z-index: 99;height: 50px; width: 200px;background: linear-gradient(to right,#363c6e,#081e41);vertical-align:middle ">\n' +
           '                    <input id="model'+(i+1)+'"  style=" background-color:transparent;cursor: pointer; font-size: large; width:50%; height:100%;margin-left:15%; border:0px; color:#EBEBEB"  value="'+str.classLists[i].name+'"/>\n' +
           '                    <img id="pic'+(i+1)+'" style=" width:13%;  margin-right: 10%"    src="images/back.png"/>\n' +
           '                    <!--                    <a target="_self" href="#" rel="external nofollow" rel="external nofollow" rel="external nofollow" onclick="setTab(\'one\',2,3)" id="one2">锅炉类</a>-->\n' +
           '                </div>\n' +
           '                    <div   style="display: block; width: 200px;" id="m'+(i+1)+'"><div id="myPaletteDiv'+(i+1)+'" style="height:400px;width: 200px;  border: solid 1px black;margin: 0 auto;background: rgb(1,10,34,0.3)"></div></div>\n' +
           '            </div>';
    }
    document.getElementById("bu").innerHTML=(html);

    var list=str.classLists[0].childs;
    swan_obj_list=str.classLists;

    console.log("list:",swan_obj_list);
    for(var i in swan_obj_list){
        var swan_obj_list_i=swan_obj_list[i]

        var swan_obj_i=[];
        for(var i in swan_obj_list_i['childs']){
            var child_i=swan_obj_list_i['childs'][i];
            icon[child_i.id]=child_i.icons;
            if(child_i.name=="母线"){
                swan_obj_i.push({"icon":child_i.id, "iconWidth":30, "iconHeight":60, "category":"Exclusive1", "text":child_i.name, "source":child_i});
            }
            else {
                swan_obj_i.push({"icon":child_i.id, "iconWidth":30, "iconHeight":60,  "text":child_i.name, "source":child_i});
            }

                    }
                    console.log(swan_obj_i);
        swan_objs.push(swan_obj_i)
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

            myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
        {
            grid: $(go.Panel, "Grid",
                $(go.Shape, "LineH", { stroke: "rgb(0,0,0,0)" , strokeWidth: 0.5 }),
                $(go.Shape, "LineH", { stroke: "rgb(0,0,0,0)", strokeWidth: 0.5, interval: 10 }),
                $(go.Shape, "LineV", { stroke: "rgb(0,0,0,0)", strokeWidth: 0.5 }),
                $(go.Shape, "LineV", { stroke: "rgb(0,0,0,0)", strokeWidth: 0.5, interval: 10 })
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
            scale:0.7,
            minScale:0.6,
            maxScale:1.5,
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
        return "../../../sys/sifanydataimage/image/"+geo+".svg";
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

            myDiagram.nodeTemplateMap.add("Exclusive1",
                $(go.Node, commonNodeStyle(),
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
                    editable:true,
                    maxSize: new go.Size(100, NaN),
                    alignment: go.Spot.TopCenter,
                    alignmentFocus: go.Spot.BottomCenter
                },

                new go.Binding("text"))
                ));

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
                rotatable:true,
            },
            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
            // The main element of the Spot panel is a vertical panel housing an optional icon,
            // plus a rectangle that acts as the port
            $(go.Panel, "Vertical",

                $(go.Picture,
                    {
                        desiredSize: new go.Size(100,100),
                    },
                    new go.Binding("source", "icon",geoFunc ))
            ),



            // four small named ports, one on each side:
            makePort("T", go.Spot.Top, true, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, true),
            { // handle mouse enter/leave events to show/hide the ports
                mouseEnter: function(e, node) { showSmallPorts(node, true); },
                mouseLeave: function(e, node) { showSmallPorts(node, false); }
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
                rotatable:true,
            },
            new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
            // The main element of the Spot panel is a vertical panel housing an optional icon,
            // plus a rectangle that acts as the port
            $(go.Panel, "Vertical",

                $(go.Picture,
                    {
                        desiredSize: new go.Size(100,100),
                    },
                    new go.Binding("source", "icon",geoFunc )),
                $(go.TextBlock, {
                        font: "14px Lato, sans-serif",
                        textAlign: "center",
                        margin: 3,
                        stroke:"white",
                        editable:true,
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
                mouseEnter: function(e, node) { showSmallPorts(node, true); },
                mouseLeave: function(e, node) { showSmallPorts(node, false); }
            }
        ),



    // Some links need a custom to or from spot
    function spotConverter(dir) {
        console.log(dir)
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
                mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
                mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; },
                selectionAdorned: true
            },
            // make sure links come in from the proper direction and go out appropriately
            new go.Binding("fromSpot", "fromSpot", function(d) { return spotConverter(d); }),
            new go.Binding("toSpot", "toSpot", function(d) { return spotConverter(d); }),
            new go.Binding("points").makeTwoWay(),
            // mark each Shape to get the link geometry with isPanelMain: true
            $(go.Shape, { isPanelMain: true, stroke: "#13e28e"/* blue*/, strokeWidth: 2 },
                new go.Binding("stroke", "color"))
        ))

    var myPalettes=[];
    for(var i=0;i<swan_obj_list.length;i++){
        myPalette =
            $(go.Palette, "myPaletteDiv"+(i+1),  // must name or refer to the DIV HTML element
                {
                    scale:0.7,
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
    myDiagram.addModelChangedListener(function(e){
        if(e.modelChange=="nodeDataArray"){
            if (e.change === go.ChangedEvent.Insert) {
                console.log(e.propertyName + " added node with key: " + e.newValue.key);
            }
            // var node=e.newValue;
            // console.log("e:",e);
            // node.category="select";
        }
    })
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);// animate some flow through the pipes
        loop();
        }
    };
}


function BarLink() {
    go.Link.call(this);
}
go.Diagram.inherit(BarLink, go.Link);

BarLink.prototype.getLinkPoint = function(node, port, spot, from, ortho, othernode, otherport) {
    // var r = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft),
    //     port.getDocumentPoint(go.Spot.BottomRight));
    var r = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft),
        port.getDocumentPoint(go.Spot.BottomRight));
    var op = otherport.getDocumentPoint(go.Spot.Center);
    var below = op.y > r.centerY;
    var below_x=op.x>r.centerX;
    var y = below ? r.bottom : r.top;
    var x= below_x ? r.left:r.right;
    if (node.category === "Exclusive1") {
        if(r.right-r.left<2){
            if(op.y<r.top+30) return new  go.Point(x, r.top+30);
            if(op.y>r.bottom-30) return new  go.Point(x, r.bottom-30);
            return new go.Point(x, op.y);
        }
        else if(r.top-r.bottom<2){
            if (op.x < r.left+30) return new go.Point(r.left+30, y);
            if (op.x > r.right-30) return new go.Point(r.right-30, y);
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
            if(op.x > r.centerX) return new go.Point(r.right, r.centerY);
            else return new go.Point(r.left, r.centerY);;
        }else{
            if(op.y > r.centerY) y = r.bottom;
            else y = r.top;
        }
        return new go.Point(r.centerX, y);
    }
};
//连接线与节点连接的角度
BarLink.prototype.getLinkDirection = function(node, port, linkpoint, spot, from, ortho, othernode, otherport) {
    var p = port.getDocumentPoint(go.Spot.Center);
    var r = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft),
        port.getDocumentPoint(go.Spot.BottomRight));
    var op = otherport.getDocumentPoint(go.Spot.Center);
    var below = op.y > r.centerY;
    var below_x=op.x>r.centerX;
    var res=0;
    if (node.category === "Exclusive1") {
        if(r.right-r.left<2){
            if(below_x) res=0;
            else res=180;
        }
        else if(r.top-r.bottom<2){
            if(below) res=90;
            else res=270;
        }
        else {
            res=0;
        }
    }
    else {
        var lr = op.x - r.centerX;
        var hl = op.y - r.centerY;

        if (Math.abs(lr) > Math.abs(hl)) {
            if(op.x > r.centerX) res=0;
            else res=180;
        }else{
            if(op.y > r.centerY) res=90;
            else res=270;
        }
    }

    // return below ? 90 : 270;
    return res
};

// end BarLink class


var opacity = 1;
var down = true;
function loop() {
    var diagram = myDiagram;
    setTimeout(function() {
        document.getElementById('swan-res').value=(myDiagram.model.toJson());
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

function commonNodeStyle() {
    return [
        {
            locationSpot: go.Spot.Center,
        },
        new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
    ];
}

