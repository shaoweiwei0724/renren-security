$(function () {
    $('#swan-cancel').click(function () {
        $('#treeContextMenu').hide()
    });
    $('#deleteBtn').click(function () {
        deleteDom();
    });
    $('#toUpdateBtn').click(function () {
        addHoverDom();
    });
    $(document).ready(function () {
        var element= layui.element;
        // element.render();
    });

    reloadTree();
    getGridDom();
    getGridGatherDom();
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/sifanyobjattr/list',
        datatype: "json",
        colModel: [
            { label: 'id', name: 'id', index: 'id', width: 50, key: true ,hidden:true},
            { label: '所属实列id', name: 'objId', index: 'obj_id', width: 40 },
            { label: '属性名', name: 'name', index: 'name', width: 80 },
            { label: '编码', name: 'code', index: 'code', width: 50 },
            { label: '类型id', name: 'typeId', index: 'type_id', width: 80 ,hidden:true},
            { label: '数据类型', name: 'dataType', index: 'data_type', width: 80 ,hidden:true},
            { label: '单位', name: 'unitId', index: 'unit_id', width: 80 ,hidden:true},
            { label: '备注', name: 'remark', index: 'remark', width: 80 },
            { label: '指标种类', name: 'attrstypeId', index: 'attrstype_id', width: 80 ,hidden:true},
            { label: '算法名称', name: 'algorithmName', index: 'algorithm_name', width: 80 ,hidden:true},

            { label: '创建时间', name: 'createTime', index: 'create_time', width: 80 , formatter: function(value, options, row){
                    if(value == null)
                        return "";
                    function TimeToDate(unixTime,type="Y-M-D H:i:s"){
                        var date = new Date(unixTime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                        var datetime = "";
                        datetime += date.getFullYear() + type.substring(1,2);
                        datetime += (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + type.substring(3,4);
                        datetime += (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
                        if (type.substring(5,6)) {
                            if (type.substring(5,6).charCodeAt() > 255) {
                                datetime += type.substring(5,6);
                                if (type.substring(7,8)) {
                                    datetime += " " + (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                                    if (type.substring(9,10)) {
                                        datetime += type.substring(8,9) + (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                                        if (type.substring(11,12)) {
                                            datetime += type.substring(10,11) + (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                                        };
                                    };
                                };
                            }else{
                                datetime += " " + (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                                if (type.substring(8,9)) {
                                    datetime += type.substring(7,8) + (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                                    if (type.substring(10,11)) {
                                        datetime += type.substring(9,10) + (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                                    };
                                };
                            };
                        };
                        return datetime;
                    }
                    return TimeToDate(value);
                }},
            { label: '最后更新时间', name: 'updateTime', index: 'update_time', width: 80 , formatter: function(value, options, row){
                    if(value == null)
                        return "";
                    function TimeToDate(unixTime,type="Y-M-D H:i:s"){
                        var date = new Date(unixTime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                        var datetime = "";
                        datetime += date.getFullYear() + type.substring(1,2);
                        datetime += (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + type.substring(3,4);
                        datetime += (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
                        if (type.substring(5,6)) {
                            if (type.substring(5,6).charCodeAt() > 255) {
                                datetime += type.substring(5,6);
                                if (type.substring(7,8)) {
                                    datetime += " " + (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                                    if (type.substring(9,10)) {
                                        datetime += type.substring(8,9) + (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                                        if (type.substring(11,12)) {
                                            datetime += type.substring(10,11) + (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                                        };
                                    };
                                };
                            }else{
                                datetime += " " + (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                                if (type.substring(8,9)) {
                                    datetime += type.substring(7,8) + (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                                    if (type.substring(10,11)) {
                                        datetime += type.substring(9,10) + (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                                    };
                                };
                            };
                        };
                        return datetime;
                    }
                    return TimeToDate(value);
                }},
            { label: '用户id', name: 'userId', index: 'user_id', width: 50 }
        ],
        viewrecords: true,
        height: $(window).height()-160,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page",
            rows:"limit",
            order: "order"
        },
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
        /* onSelectRow: function (row) {

             var rowData = $("#jqGrid").getRowData(row);
             vm.sifanyClassAttr = {name:rowData.name,code:rowData.code,unitId:rowData.unitId,attrstypeId:rowData.attrstypeId,remark:rowData.remark};
             console.log(rowData);
         }*/
    });
});

function changeFrameHeight(that){
    //电脑屏幕高度-iframe上面其他组件的高度
    //例:我这里iframe上面还有其他一些div组件，一共的高度是120，则减去120
    $(that).height(document.documentElement.clientHeight - 90);

}
var selected_id=0;
var ztreeMain;
function tree_click_swan(e,treeId, treeNode) {
    var node = ztreeMain.getSelectedNodes();
    console.log("---------");
    console.log(node);
    selected_id=node[0].id;
    localStorage.fileId = node[0].gModelId;
    localStorage.selectSceneId=selected_id;

    vm.sifanyObj = {id:node[0].id,name:node[0].name,code:node[0].code,icons:node[0].icons,remark:node[0].remark,irconurl:node[0].irconurl,modelId:node[0].modelId,nodeType:node[0].nodeType };
    localStorage.iconsId = vm.sifanyObj.modelId;
    localStorage.fileId=node[0].gId;
    localStorage.objId_g=vm.sifanyObj.id;
    $('#config-swan-svg0').attr('src',$('#config-swan-svg0').attr('src'));
    console.log("1",vm.sifanyObj);
    var page = $("#jqGrid").jqGrid('getGridParam','page');
    $("#jqGrid").jqGrid('setGridParam',{
        page:page,
        postData:{'selected_id':selected_id},
    },true).trigger("reloadGrid");
    var page = $("#jqGridget").jqGrid('getGridParam','page');
    $("#jqGridget").jqGrid('setGridParam',{
        page:page,
        postData:{'selected_id':selected_id,'attrstypeId':2},
    },true).trigger("reloadGrid");
    var page = $("#jqGridgather").jqGrid('getGridParam','page');
    $("#jqGridgather").jqGrid('setGridParam',{
        page:page,
        postData:{'selected_id':selected_id,'attrstypeId':1},
    },true).trigger("reloadGrid");

}

function onBodyMouseDown(event) {
    if (!(event.target.id == "treeContextMenu" || $(event.target).parents("#treeContextMenu").length > 0)) {
        hideContextMenu();
    }
}
function hideContextMenu() {
    $("#treeContextMenu").hide();
    $("body").off("mousedown", onBodyMouseDown);
}

function showContextMenu(type,leaf, x, y) {
    if (type == -1) {
        $(".dropdown-menu").find("li:not(:first)").hide();
    } else if(leaf){
        $(".dropdown-menu").find("li:first").hide();
    }else{
        $(".dropdown-menu").find("li").show();
    }
    $("#treeContextMenu").css({"top": y + "px", "left": x + "px"}).show();
    $("body").on("mousedown", onBodyMouseDown);
}

function onRightClick(event, treeId, treeNode) {

    document.oncontextmenu = function(){
        return false;
    }
    //alert(1)
    if (treeNode.id == "1") {
        return;
    }
    if (treeNode) {
        ztreeMain.selectNode(treeNode);
        // alert('ddddd')
        // showContextMenu(treeNode.organId,treeNode.leaf);
        showContextMenu(treeNode.organId,treeNode.leaf, event.clientX -10, event.clientY -10);
    }
}
function addHoverDom() {
//     //设置只有父节点可以新增 其它只能编辑

    var nodes = ztreeMain.getSelectedNodes();

    var newNode = { name: "example" };

    //4、把这个新节点添加到当前选中的节点下，作为它的子节点
    // if(nodes.length > 0){
    //     newNode = ztreeMain.addNodes(nodes[0], newNode);
    // }

    var url = "sys/sifanyobj/save";
    vm.sifanyObj = {id:null,name:"example",parentId:nodes[0].id,orderNum:0,'icons':''};
    console.log("--------------------",vm.sifanyObjAttr);

    $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.sifanyObj),
        success: function(r){
            if(r.code === 0){
                layer.msg("操作成功", {icon: 1});
                //vm.reload();
                $('#treeContextMenu').hide();
                refreshNodeTree(nodes,nodes[0].id)
                // $(document).ready();

            }else{
                layer.alert(r.msg);

            }
        }
    });
}
function deleteDom(){
    var nodes = ztreeMain.getSelectedNodes();
    var id = nodes[0].id;
    if(id == null){
        return ;
    }

    var parentId = nodes[0].parentId;

    if(parentId==-1){
        //  layer.msg("根节点不允许删除。", {icon: 1});
        layer.alert("根节点不允许删除。");
        return ;
    }
    var lock = false;
    layer.confirm('确定要删除选中的记录？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        if(!lock) {
            lock = true;

            $.ajax({
                type: "POST",
                url: baseURL + "sys/sifanyobj/deleteDom",
                contentType: "application/json",
                data: JSON.stringify(id),
                success: function(r){
                    if(r.code == 0){

                        layer.msg("操作成功", {icon: 1});
                        $(document).ready(reloadTree);
                        $("#jqGrid").trigger("reloadGrid");

                    }else{
                        layer.alert(r.msg);
                    }
                }
            });
        }
    }, function(){
    });
}
function refreshNode() {
    /*根据 treeId 获取 zTree 对象*/
    var zTree = $.fn.zTree.getZTreeObj("classTreeMain"),
        type = "refresh",
        silent = false,
        /*获取 zTree 当前被选中的节点数据集合*/
        nodes = zTree.getSelectedNodes();
    console.log("2",nodes);
    /*强行异步加载父节点的子节点。[setting.async.enable = true 时有效]*/
    zTree.reAsyncChildNodes(nodes[0], type, silent);

}
function getGridDom(){

    var PostData={attrstypeId:2};
    $("#jqGridget").jqGrid({
        url: baseURL + 'sys/sifanyobjattr/list',
        datatype: "json",
        postData: PostData,
        colModel: [
            { label: 'id', name: 'id', index: 'id', width: 50, key: true ,hidden:true},
            { label: '所属实列Id', name: 'objId', index: 'obj_id', width: 40 },
            { label: '属性名', name: 'name', index: 'name', width: 80 },
            { label: '编码', name: 'code', index: 'code', width: 50 },
            { label: '类型id', name: 'typeId', index: 'type_id', width: 80 ,hidden:true},
            { label: '数据类型', name: 'dataType', index: 'data_type', width: 80 ,hidden:true},
            { label: '单位', name: 'unitId', index: 'unit_id', width: 80 ,hidden:true},
            { label: '备注', name: 'remark', index: 'remark', width: 80 },
            { label: '指标种类', name: 'attrstypeId', index: 'attrstype_id', width: 80 ,hidden:true},
            { label: '算法名称', name: 'algorithmName', index: 'algorithm_name', width: 80 ,hidden:true},
            { label: '创建时间', name: 'createTime', index: 'create_time', width: 60 , formatter: function(value, options, row){
                    if(value == null)
                        return "";
                    function TimeToDate(unixTime,type="Y-M-D H:i:s"){
                        var date = new Date(unixTime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                        var datetime = "";
                        datetime += date.getFullYear() + type.substring(1,2);
                        datetime += (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + type.substring(3,4);
                        datetime += (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
                        if (type.substring(5,6)) {
                            if (type.substring(5,6).charCodeAt() > 255) {
                                datetime += type.substring(5,6);
                                if (type.substring(7,8)) {
                                    datetime += " " + (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                                    if (type.substring(9,10)) {
                                        datetime += type.substring(8,9) + (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                                        if (type.substring(11,12)) {
                                            datetime += type.substring(10,11) + (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                                        };
                                    };
                                };
                            }else{
                                datetime += " " + (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                                if (type.substring(8,9)) {
                                    datetime += type.substring(7,8) + (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                                    if (type.substring(10,11)) {
                                        datetime += type.substring(9,10) + (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                                    };
                                };
                            };
                        };
                        return datetime;
                    }
                    return TimeToDate(value);
                }},
            { label: '最后更新时间', name: 'updateTime', index: 'update_time', width: 80 , formatter: function(value, options, row){
                    if(value == null)
                        return "";
                    function TimeToDate(unixTime,type="Y-M-D H:i:s"){
                        var date = new Date(unixTime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                        var datetime = "";
                        datetime += date.getFullYear() + type.substring(1,2);
                        datetime += (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + type.substring(3,4);
                        datetime += (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
                        if (type.substring(5,6)) {
                            if (type.substring(5,6).charCodeAt() > 255) {
                                datetime += type.substring(5,6);
                                if (type.substring(7,8)) {
                                    datetime += " " + (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                                    if (type.substring(9,10)) {
                                        datetime += type.substring(8,9) + (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                                        if (type.substring(11,12)) {
                                            datetime += type.substring(10,11) + (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                                        };
                                    };
                                };
                            }else{
                                datetime += " " + (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                                if (type.substring(8,9)) {
                                    datetime += type.substring(7,8) + (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                                    if (type.substring(10,11)) {
                                        datetime += type.substring(9,10) + (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                                    };
                                };
                            };
                        };
                        return datetime;
                    }
                    return TimeToDate(value);
                }},
            { label: '用户id', name: 'userId', index: 'user_id', width: 50 }
        ],
        viewrecords: true,
        height: $(window).height()-160,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPagerget",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page",
            rows:"limit",
            order: "order"

        },
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGridget").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        },
        onSelectRow: function (row) {

            var rowData = $("#jqGridget").getRowData(row);
            vm.sifanyObjAttr = {objId:rowData.objId,id:rowData.id,name:rowData.name,code:rowData.code,unitId:rowData.unitId,attrstypeId:rowData.attrstypeId,remark:rowData.remark,algorithmName:rowData.algorithmName};
            console.log("3",rowData);
        }
    });
}

function getGridGatherDom(){

    var PostData={attrstypeId:1};
    $("#jqGridgather").jqGrid({
        url: baseURL + 'sys/sifanyobjattr/list',
        datatype: "json",
        postData: PostData,
        colModel: [
            { label: 'id', name: 'id', index: 'id', width: 50, key: true ,hidden:true},
            { label: '所属实列Id', name: 'objId', index: 'obj_id', width: 40 },
            { label: '属性名', name: 'name', index: 'name', width: 80 },
            { label: '编码', name: 'code', index: 'code', width: 50 },
            { label: '类型id', name: 'typeId', index: 'type_id', width: 80 ,hidden:true},
            { label: '数据类型', name: 'dataType', index: 'data_type', width: 80 ,hidden:true},
            { label: '单位', name: 'unitId', index: 'unit_id', width: 80 ,hidden:true},
            { label: '备注', name: 'remark', index: 'remark', width: 80 },
            { label: '指标种类', name: 'attrstypeId', index: 'attrstype_id', width: 80 ,hidden:true},
            { label: '算法名称', name: 'algorithmName', index: 'algorithm_name', width: 80 ,hidden:true},
            { label: '创建时间', name: 'createTime', index: 'create_time', width: 60 , formatter: function(value, options, row){
                    if(value == null)
                        return "";
                    function TimeToDate(unixTime,type="Y-M-D H:i:s"){
                        var date = new Date(unixTime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                        var datetime = "";
                        datetime += date.getFullYear() + type.substring(1,2);
                        datetime += (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + type.substring(3,4);
                        datetime += (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
                        if (type.substring(5,6)) {
                            if (type.substring(5,6).charCodeAt() > 255) {
                                datetime += type.substring(5,6);
                                if (type.substring(7,8)) {
                                    datetime += " " + (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                                    if (type.substring(9,10)) {
                                        datetime += type.substring(8,9) + (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                                        if (type.substring(11,12)) {
                                            datetime += type.substring(10,11) + (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                                        };
                                    };
                                };
                            }else{
                                datetime += " " + (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                                if (type.substring(8,9)) {
                                    datetime += type.substring(7,8) + (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                                    if (type.substring(10,11)) {
                                        datetime += type.substring(9,10) + (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                                    };
                                };
                            };
                        };
                        return datetime;
                    }
                    return TimeToDate(value);
                }},
            { label: '最后更新时间', name: 'updateTime', index: 'update_time', width: 80 , formatter: function(value, options, row){
                    if(value == null)
                        return "";
                    function TimeToDate(unixTime,type="Y-M-D H:i:s"){
                        var date = new Date(unixTime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                        var datetime = "";
                        datetime += date.getFullYear() + type.substring(1,2);
                        datetime += (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + type.substring(3,4);
                        datetime += (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
                        if (type.substring(5,6)) {
                            if (type.substring(5,6).charCodeAt() > 255) {
                                datetime += type.substring(5,6);
                                if (type.substring(7,8)) {
                                    datetime += " " + (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                                    if (type.substring(9,10)) {
                                        datetime += type.substring(8,9) + (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                                        if (type.substring(11,12)) {
                                            datetime += type.substring(10,11) + (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                                        };
                                    };
                                };
                            }else{
                                datetime += " " + (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                                if (type.substring(8,9)) {
                                    datetime += type.substring(7,8) + (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                                    if (type.substring(10,11)) {
                                        datetime += type.substring(9,10) + (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                                    };
                                };
                            };
                        };
                        return datetime;
                    }
                    return TimeToDate(value);
                }},
            { label: '用户id', name: 'userId', index: 'user_id', width: 50 }
        ],
        viewrecords: true,
        height: $(window).height()-160,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPagergather",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page",
            rows:"limit",
            order: "order"

        },
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGridgather").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        },
        onSelectRow: function (row) {

            var rowData = $("#jqGridgather").getRowData(row);
            vm.sifanyObjAttrGather = {name:rowData.name,code:rowData.code,unitId:rowData.unitId,attrstypeId:rowData.attrstypeId,remark:rowData.remark};
            console.log("4",rowData);
        }
    });
}
function reloadTree(){
    $.get(baseURL + "sys/sifanyorganization/diagramList", function(r){
        // var a = JSON.stringify(r.classLists);?type=base
        // alert(a);
        for(var i in r.objEntityLists) {
            var swan_obj_list_i = r.objEntityLists[i];
            if(swan_obj_list_i.children!=null){
                for(var j in swan_obj_list_i.children){
                    if(swan_obj_list_i.children[j].nodeType==1){
                        swan_obj_list_i.children[j]["iconSkin"]="icon05";
                    }
                }
            }

        }
        ztreeMain = $.fn.zTree.init($("#classTreeMain"), setting, r.objEntityLists);
      /*  if(localStorage.selectSceneId){
            var node = ztreeMain.getNodeByParam("id",localStorage.selectSceneId);
        }else{*/
      var node = ztreeMain.getNodeByParam("id","1");

        console.log("node1:", node)
        ztreeMain.selectNode(node);

        if(node){
            //触发默认数据的click事件
            $("#"+node.tId+"_a").dblclick();//触发ztree点击事件
            console.log("5",node);
            vm.sifanyObj = {id:node.id,name:node.name,code:node.code,icons:node.icons,remark:node.remark,irconurl:node.irconurl,modelId:node.modelId };
        }
        // vm.sifanyClass.parentName = node.name;
    })
}
function refreshNodeTree(nodes,id){
    $.get(baseURL + "sys/sifanyobj/select", function(r){
        // var a = JSON.stringify(r.classLists);?type=base
        // alert(a);
        ztreeMain = $.fn.zTree.init($("#classTreeMain"), setting, r.objEntityLists);
        var node = ztreeMain.getNodeByParam("id",id);
        console.log("node2",node)

        ztreeMain.selectNode(node);

        if(node){
            //触发默认数据的click事件
            $("#"+node.tId+"_a").dblclick();//触发ztree点击事件
            console.log("6",node);
            vm.sifanyObj = {id:node.id,name:node.name,code:node.code,icons:node.icons,remark:node.remark,irconurl:node.irconurl,modelId:node.modelId };
        }
        // vm.sifanyClass.parentName = node.name;
        localStorage.iconsId = vm.sifanyObj.modelId;
        localStorage.objId_g=vm.sifanyObj.id;
        localStorage.fileId=node.gId;
        $('#config-swan-svg0').attr('src',$('#config-swan-svg0').attr('src'));
    })
}
var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    },

    callback: {
        onClick: tree_click_swan,
        onRightClick: onRightClick



    }
};

var setting1 = {
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "typeId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    }
};
var ztree;
var ztree1;
var ztree2;
var vm = new Vue({
    el:'#rrapp',
    data:{
        showList: true,
        //devList:true,
        title: null,
        sifanyObjAttr: {
            className:null,
            objId:0,
            typeName:null,
            typeId:0,
            orderNum:0,
            code:null,
            unitId:0,
            attrstypeId:0,
            remark:null,
            name:null

        },
        sifanyObj: {
            parentName:null,
            parentId:0,
            classId:0,
            name:null,
            code:null,
            icons:null,
            irconurl:null,
            remark:null,
            orderNum:0,
            modelId:null
        },
        sifanyObjAttrGather: {
            className:null,
            objId:0,
            typeName:null,
            typeId:0,
            orderNum:0,
            code:null,
            unitId:0,
            attrstypeId:0,
            remark:null,
            name:null

        }
    },
    methods: {
        query: function () {
            var node = ztreeMain.getSelectedNodes();

            selected_id=node[0].id;
            console.log("7",selected_id);

            vm.reload();
        },

        getSifanyclass: function(){
            //加载模型类树
            $.get(baseURL + "sys/sifanyobj/select?type=base", function(r){
                // var a = JSON.stringify(r.classLists);
                // alert(a);
                ztree = $.fn.zTree.init($("#classTree"), setting, r.objEntityLists);
                var node = ztree.getNodeByParam("id", vm.sifanyObjAttr.objId);
                ztree.selectNode(node);
                // vm.sifanyClassAttr.className = node.name;
            })
        },
        getSifanyDevclass: function(){
            //加载模型类树
            $.get(baseURL + "sys/sifanyobj/select", function(r){
                // var a = JSON.stringify(r.classLists);
                // alert(a);
                ztree2 = $.fn.zTree.init($("#classTreeDev"), setting, r.objEntityLists);
                var node = ztree2.getNodeByParam("id", vm.sifanyObj.parentId);
                ztree2.selectNode(node);
                console.log("9",node);
                //   vm.sifanyClass.parentName = node.name;
            })
        },
        getSifanyclassattr: function(){
            //加载属性类树
            $.get(baseURL + "sys/sifanyobjattrtype/select", function(r){

                ztree1 = $.fn.zTree.init($("#typeTree"), setting1, r.typeLists);
                var node = ztree1.getNodeByParam("id", vm.sifanyObjAttr.typeId);
                ztree1.selectNode(node);

                // vm.sifanyClassAttr.typeName = node.type;
                // var a = JSON.stringify(r.typeLists);
                // alert(a);
            })
        },

        add: function(){
            vm.showList = false;
            //  vm.devList = true;
            vm.title = "新增";
            vm.sifanyObjAttr = {className:null,objId:selected_id,typeName:null,typeId:0,orderNum:0};
            vm.getSifanyclass();
            vm.getSifanyclassattr();

        },
        update: function (event) {
            var id = getSelectedRow();
            console.log("id:",id);
            if(id == null){
                return ;
            }
            vm.showList = false;
            //  vm.devList = true;
            vm.title = "修改";

            vm.getInfo(id)
            vm.getSifanyclass();
            vm.getSifanyclassattr();
        },
        saveOrUpdate: function (event) {
            $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.sifanyObjAttr.id == null ? "sys/sifanyobjattr/save" : "sys/sifanyobjattr/update";
                console.log("attr--------------------",vm.sifanyObjAttr);
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.sifanyObjAttr),
                    success: function(r){
                        if(r.code === 0){
                            layer.msg("操作成功", {icon: 1});
                            vm.reload();
                            $('#btnSaveOrUpdate').button('reset');
                            $('#btnSaveOrUpdate').dequeue();
                        }else{
                            layer.alert(r.msg);
                            $('#btnSaveOrUpdate').button('reset');
                            $('#btnSaveOrUpdate').dequeue();
                        }
                    }
                });
            });
        },
        del: function (event) {
            var ids = getSelectedRows();
            if(ids == null){
                return ;
            }
            var lock = false;
            layer.confirm('确定要删除选中的记录？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                if(!lock) {
                    lock = true;
                    $.ajax({
                        type: "POST",
                        url: baseURL + "sys/sifanyobjattr/delete",
                        contentType: "application/json",
                        data: JSON.stringify(ids),
                        success: function(r){
                            if(r.code == 0){
                                layer.msg("操作成功", {icon: 1});
                                $("#jqGrid").trigger("reloadGrid");
                            }else{
                                layer.alert(r.msg);
                            }
                        }
                    });
                }
            }, function(){
            });
        },
        getInfo: function(id){
            $.get(baseURL + "sys/sifanyobjattr/info/"+id, function(r){
                vm.sifanyObjAttr = r.sifanyObjAttr;
            });
        },
        classTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择所属类",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#classLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择所属类
                    vm.sifanyObjAttr.objId = node[0].id;
                    // vm.sifanyClassAttr.className = node[0].name;

                    layer.close(index);
                    $("#classLayer").hide();

                },
                btn2: function (index) {
                    layer.close(index);
                    $("#classLayer").hide();
                },
                end:function(){
                    $("#classLayer").hide();
                }
            });
        },
        classTreeDev: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择父类",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#classLayerDev"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择父类
                    vm.sifanyObj.parentId = node[0].id;
                    vm.sifanyObj.parentName = node[0].name;

                    layer.close(index);
                }
            });
        },
        typeTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择属性类型",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#typeLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree1.getSelectedNodes();
                    //选择所属类
                    vm.sifanyObjAttr.typeId = node[0].id;
                    // vm.sifanyClassAttr.typeName = node[0].type;

                    layer.close(index);
                }
            });
        },
        reload: function (event) {
            // alert("123");
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                page:page
            }).trigger("reloadGrid");
        },
        addclass:function(){
            var nodes = ztreeMain.getSelectedNodes();

            var url ="sys/sifanyobj/update";
            vm.sifanyObj['type']='base';
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.sifanyObj),
                success: function(r){
                    if(r.code === 0){
                        layer.msg("操作成功", {icon: 1});
                        vm.reload();
                        // $(document).ready(reloadTree);
                        refreshNodeTree(nodes,nodes[0].id);
                    }else{
                        layer.alert(r.msg);

                    }
                }
            });

        },
        menuTree: function(){
            // editor.setValue(vm.sifanyClass.icon);
            layer.open({
                type: 1,
                offset: '0',
                skin: 'layui-layer-molv',
                title: "svg-edit",
                area: ['1000px', '1000px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#menuLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    $("#swan-svg").contents().find("#tool_source").click();
                    var values =$("#swan-svg").contents().find("#svg_source_textarea").val();

                    console.log("10",values);
                    values = values.replace(/\+/g,"%2B");
                    vm.sifanyObj.icons=encodeURI(values);

                    // console.log("=============="+vm.sifanyObj.icons);
                    layer.close(index);
                    $("#menuLayer").hide();

                },
                btn2: function (index) {
                    layer.close(index);
                    $("#menuLayer").hide();
                },
                end:function(){
                    $("#menuLayer").hide();
                }
            });
        },
        editProject: function(){
            // editor.setValue(vm.sifanyClass.icon);
            var algorithmName = vm.sifanyObjAttr.algorithmName;
            if((algorithmName == null || algorithmName == "") && vm.sifanyObjAttr.name != null){
                algorithmName = vm.sifanyObjAttr.name + vm.sifanyObjAttr.id + vm.sifanyObjAttr.objId;
                vm.sifanyObjAttr.algorithmName = algorithmName;
            }

            var iframe = document.getElementById('editProject-info');
            iframe.onload = function(){
                iframe.contentWindow.postMessage('耗电量计算','*');
                // iframe.contentWindow.postMessage(vm.sifanyObjAttr.algorithmName,'*');
            }

            layer.open({
                type: 1,
                offset: '0',
                skin: 'layui-layer-molv',
                title: "edit-project",
                area: ['1000px', '1000px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#editProject"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    // var values =$("#swan-svg").contents().find("#svg_source_textarea").val();
                    //
                    // console.log(values);

                    // window.postMessage("家用热水器用户行为分析", '*');
                    //
                    // vm.sifanyClass.icons=encodeURI(values);
                    layer.close(index);

                    $("#editProject-info").hide();
                },
                btn2: function (index) {
                    layer.close(index);
                    $("#editProject-info").hide();
                },
                end:function(){
                    $("#editProject-info").hide();
                }
            });
        },
        rule:function(){
          alert("建设中……")
        },
        copyurl:function () {
            var nodes = ztreeMain.getSelectedNodes();
            if(nodes == null) {
                alert('请先选择场景');
            }else{
                var clipBoardContent="http://localhost:8080/swan-admin/statics/gojs/samples/showres.html?id=" + nodes[0].id + "&name="+nodes[0].name;
                alert(clipBoardContent);
                var oInput = document.createElement('input');
                oInput.value = clipBoardContent;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = 'oInput';
                oInput.style.display='none';
                alert('复制成功');
            }

        },
        configmenu:function () {

            var nodes = ztreeMain.getSelectedNodes();

            var url ="modules/sys/modelbus2.html";

            // window.open(baseURL + url)
            location.href=baseURL + url;
            // $.ajax({
            //     type: "POST",
            //     url: baseURL + url,
            //     contentType: "application/json",
            //     data: JSON.stringify(vm.sifanyObj),
            //     success: function(r){
            //         if(r.code === 0){
            //             layer.msg("操作成功", {icon: 1});
            //             vm.reload();
            //             // $(document).ready(reloadTree);
            //             refreshNodeTree(nodes,nodes[0].id);
            //         }else{
            //             layer.alert(r.msg);
            //
            //         }
            //     }
            // });

        }
    }
});
