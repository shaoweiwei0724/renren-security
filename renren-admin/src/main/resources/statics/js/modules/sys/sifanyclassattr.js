$(function () {
    $.get(baseURL + "sys/sifanyclass/select?type=base", function(r){
        // var a = JSON.stringify(r.classLists);
        // alert(a);
        ztreeMain = $.fn.zTree.init($("#classTreeMain"), setting, r.classLists);
        var node = ztreeMain.getNodeByParam("id",18);
        ztreeMain.selectNode(node);

        if(node){
            //触发默认数据的click事件
            $("#"+node.tId+"_a").dblclick();//触发ztree点击事件
        }
        // vm.sifanyClass.parentName = node.name;
    })

    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/sifanyclassattr/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '所属实列', name: 'objId', index: 'obj_id', width: 80 },
			{ label: '属性名', name: 'name', index: 'name', width: 80 },
			{ label: '类型id', name: 'typeId', index: 'type_id', width: 80 }, 			
			{ label: '数据类型', name: 'dataType', index: 'data_type', width: 80 }, 			
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
			{ label: '用户id', name: 'userId', index: 'user_id', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
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
    });
});
var selected_id=0;
var ztreeMain;
function tree_click_swan(e,treeId, treeNode) {
    var node = ztreeMain.getSelectedNodes();
    selected_id=node[0].id;

    var page = $("#jqGrid").jqGrid('getGridParam','page');
    $("#jqGrid").jqGrid('setGridParam',{
        page:page,
        postData:{'selected_id':selected_id},
    },true).trigger("reloadGrid");
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
        onClick: tree_click_swan       // 点击回调
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
var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		sifanyClassAttr: {
		    className:null,
            classId:0,
            typeName:null,
            typeId:0,
            orderNum:0
		}
	},
	methods: {
		query: function () {
			vm.reload();
		},

        getSifanyclass: function(){
            //加载模型类树
            $.get(baseURL + "sys/sifanyclass/select?type=base", function(r){
                // var a = JSON.stringify(r.classLists);
                // alert(a);
                ztree = $.fn.zTree.init($("#classTree"), setting, r.classLists);
                var node = ztree.getNodeByParam("id", vm.sifanyClassAttr.classId);
                ztree.selectNode(node);
                // vm.sifanyClassAttr.className = node.name;
            })
        },

        getSifanyclassattr: function(){
            //加载属性类树
            $.get(baseURL + "sys/sifanyclassattrtype/select", function(r){

                ztree1 = $.fn.zTree.init($("#typeTree"), setting1, r.typeLists);
                var node = ztree1.getNodeByParam("id", vm.sifanyClassAttr.typeId);
                ztree1.selectNode(node);

                // vm.sifanyClassAttr.typeName = node.type;
                // var a = JSON.stringify(r.typeLists);
                // alert(a);
            })
        },

		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.sifanyClassAttr = {className:null,classId:selected_id,typeName:null,typeId:0,orderNum:0};
            vm.getSifanyclass();
            vm.getSifanyclassattr();

		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
            vm.getSifanyclass();
            vm.getSifanyclassattr();
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.sifanyClassAttr.id == null ? "sys/sifanyclassattr/save" : "sys/sifanyclassattr/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.sifanyClassAttr),
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
                        url: baseURL + "sys/sifanyclassattr/delete",
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
			$.get(baseURL + "sys/sifanyclassattr/info/"+id, function(r){
                vm.sifanyClassAttr = r.sifanyClassAttr;
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
                    vm.sifanyClassAttr.classId = node[0].id;
                    // vm.sifanyClassAttr.className = node[0].name;

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
                    vm.sifanyClassAttr.typeId = node[0].id;
                    // vm.sifanyClassAttr.typeName = node[0].type;

                    layer.close(index);
                }
            });
        },
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});