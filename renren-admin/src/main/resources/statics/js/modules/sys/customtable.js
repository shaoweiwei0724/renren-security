$(function () {
    $("#jqGrid1").jqGrid({
        url: baseURL + 'sys/customfield/list',
        datatype: "json",
        colModel: [
            { label: 'id', name: 'id', index: 'id', width: 50, key: true },
            { label: '名称', name: 'name', index: 'name', width: 80 },
            { label: '排序', name: 'sort', index: 'sort', width: 80 },
            { label: '表单id', name: 'fieldId', index: 'field_id', width: 80 },
        ],
        viewrecords: true,
        height: $(window).height()-160,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager1",
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
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/customtable/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '', name: 'code', index: 'code', width: 80 }, 			
			{ label: '', name: 'name', index: 'name', width: 80 }			
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
        beforeSelectRow: function(rowid, e){
            $("#jqGrid").jqGrid('resetSelection');
            return(true);
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });

            var rowIds = jQuery("#jqGrid").jqGrid('getDataIDs');

            $("#jqGrid").jqGrid('setSelection', rowIds[0]);


        },
        onSelectRow: function (row) {

            var rowData = $("#jqGrid").getRowData(row);
            var selected_id=rowData.id;
            console.log(selected_id);
            var page = $("#jqGrid1").jqGrid('getGridParam','page');
            $("#jqGrid1").jqGrid('setGridParam',{
                page:page,
                postData:{'selected_id':selected_id},
            },true).trigger("reloadGrid");
        }
    });

});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
        subshowList:false,
        showListfield:false,
		title: null,
		customTable: {},
        customfield: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.subshowList = true;
			vm.title = "新增";
			vm.customTable = {};
            vm.showListfield=false;
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.subshowList = true;
            vm.showListfield=false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.customTable.id == null ? "sys/customtable/save" : "sys/customtable/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.customTable),
                    success: function(r){
                        if(r.code === 0){
                             layer.msg("操作成功", {icon: 1});
                             vm.reload();
                            vm.subshowList = false;
                             $('#btnSaveOrUpdate').button('reset');
                             $('#btnSaveOrUpdate').dequeue();
                        }else{
                            layer.alert(r.msg);
                            vm.subshowList = false;
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
                        url: baseURL + "sys/customtable/delete",
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
			$.get(baseURL + "sys/customtable/info/"+id, function(r){
                vm.customTable = r.customTable;
            });
		},
		reload: function (event) {
			vm.showList = true;
            vm.subshowList = false;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		},
        addfield: function(){
            var id = getSelectedRow();
            if(id == null){
                layer.alert("左侧表单请选择一条记录。");
            }

            vm.showList = false;
            vm.subshowList = false;
            vm.title = "新增";
            vm.customfield = {};
            vm.customfield.fieldId=id;
            vm.showListfield=true;
        },
        updatefield: function (event) {
            var id = getSelectedRowfield();
            if(id == null){
                return ;
            }
            vm.showList = false;
            vm.subshowList = false;
            vm.title = "修改";
            vm.showListfield=true;

            vm.getInfofield(id)
        },
        saveOrUpdatefield: function (event) {
            $('#btnSaveOrUpdatefield').button('loading').delay(1000).queue(function() {
                var url = vm.customfield.id == null ? "sys/customfield/save" : "sys/customfield/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.customfield),
                    success: function(r){
                        if(r.code === 0){
                            layer.msg("操作成功", {icon: 1});
                            vm.reloadfield();
                            vm.showListfield=false;
                            $('#btnSaveOrUpdatefield').button('reset');
                            $('#btnSaveOrUpdatefield').dequeue();
                        }else{
                            layer.alert(r.msg);
                            vm.showListfield=false;
                            $('#btnSaveOrUpdatefield').button('reset');
                            $('#btnSaveOrUpdatefield').dequeue();
                        }
                    }
                });
            });
        },
        delfield: function (event) {
            var ids = getSelectedRowsfield();
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
                        url: baseURL + "sys/customfield/delete",
                        contentType: "application/json",
                        data: JSON.stringify(ids),
                        success: function(r){
                            if(r.code == 0){
                                layer.msg("操作成功", {icon: 1});
                                $("#jqGrid1").trigger("reloadGrid");
                            }else{
                                layer.alert(r.msg);
                            }
                        }
                    });
                }
            }, function(){
            });
        },
        getInfofield: function(id){
            $.get(baseURL + "sys/customfield/info/"+id, function(r){
                vm.customfield = r.sifanyObjData;
            });
        },
        reloadfield: function (event) {
            vm.showList = true;
            vm.showListfield=false;
            var page = $("#jqGrid1").jqGrid('getGridParam','page');
            $("#jqGrid1").jqGrid('setGridParam',{
                page:page
            }).trigger("reloadGrid");
        }
	}
});