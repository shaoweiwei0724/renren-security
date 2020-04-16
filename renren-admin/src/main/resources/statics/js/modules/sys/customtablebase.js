$(function () {
    reloadTree();
    var colNamesset=[];
    colNamesset.push("id");
    colNamesset.push("用户id");


    var model=[];
    model.push({name:'id',index:'id',width:50,key:true});
    model.push({name:'userId',index:'user_id',width:50});


    var clipBoardContent = this.location.href;

    var querys = clipBoardContent.substring(clipBoardContent.indexOf('=') + 1)

    var url = "sys/customfield/listInfo";

    $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(querys),
        success: function (r) {
            if (r.code === 0) {
                console.log(r.list);
                // $(document).ready();
                for (var i = 0; i < r.list.length; i++) {
                    var username = r.list[i].name;
                    var sentid = r.list[i].id;
                    colNamesset.push(username);

                    model.push({
                        name: sentid,
                        index: sentid,
                        width: 50
                    })
                    vm.extendsField.push({
                        id: sentid,
                        name: username,
                        value: null
                    })


                }
                var selected_id=-1;
                $("#jqGrid").jqGrid({
                    url: baseURL + 'sys/customtablebase/list',
                    datatype: "json",
                    postData:{'selected_id':selected_id},
                    colNames:colNamesset,
                    colModel:model,
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
                });
            }
        }
    });


});
function reloadTree(){
    $.get(baseURL + "sys/sifanyobj/select", function(r){
        // var a = JSON.stringify(r.classLists);?type=base
        // alert(a);
        ztreeMain = $.fn.zTree.init($("#classTreeMain"), setting, r.objEntityLists);



            var node = ztreeMain.getNodeByParam("id","-1");


        console.log("node1:", node)
        ztreeMain.selectNode(node);
     //   var nodes = treeObj.transformToArray(treeObj.getNodes());
        //展开第一级树
        ztreeMain.expandNode(node, true);


    })
}
var selected_id=0;
var ztreeMain;
function tree_click_swan(e,treeId, treeNode) {
    var node = ztreeMain.getSelectedNodes();
    selected_id=node[0].id;
    // localStorage.iconsId = selected_id;

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
        onClick: tree_click_swan,
        // onRightClick: onRightClick



    }
};
var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		customTableBase: {
            map:{}
        },
        extendsField:[]
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.customTableBase = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id);
            var grid = $("#jqGrid");
            var rowKey = grid.getGridParam("selrow");
            var row = $('#jqGrid').jqGrid('getRowData',rowKey);

            for (var i = 0; i < vm.extendsField.length; i++) {
                for (var key in row) {
                    if(vm.extendsField[i].id==key){
                        vm.extendsField[i].value=row[key];
                    }
                }

            }

		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.customTableBase.id == null ? "sys/customtablebase/save" : "sys/customtablebase/update";
                vm.customTableBase.map= {};
                for (var i = 0; i < vm.extendsField.length; i++) {
                    vm.customTableBase.map[vm.extendsField[i].id]=vm.extendsField[i].value;
                }
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.customTableBase),
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
                        url: baseURL + "sys/customtablebase/delete",
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
			$.get(baseURL + "sys/customtablebase/info/"+id, function(r){
                vm.customTableBase = r.customTableBase;
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