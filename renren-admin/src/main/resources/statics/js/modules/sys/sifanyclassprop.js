$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/sifanyclassprop/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '所属类id', name: 'classId', index: 'class_id', width: 80 }, 			
			{ label: '属性名', name: 'name', index: 'name', width: 80 }, 			
			{ label: '类型id', name: 'typeId', index: 'type_id', width: 80 }, 			
			{ label: '数据类型', name: 'dataType', index: 'data_type', width: 80 }, 			
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: '最后更新时间', name: 'updateTime', index: 'update_time', width: 80 }, 			
			{ label: '用户id', name: 'userId', index: 'user_id', width: 80 }, 			
			{ label: '', name: 'code', index: 'code', width: 80 }, 			
			{ label: '', name: 'unitId', index: 'unit_id', width: 80 }, 			
			{ label: '', name: 'attrstypeId', index: 'attrstype_id', width: 80 }, 			
			{ label: '', name: 'remark', index: 'remark', width: 80 }, 			
			{ label: '', name: 'algorithmName', index: 'algorithm_name', width: 80 }, 			
			{ label: '', name: 'onlineMonitor', index: 'online_monitor', width: 80 }, 			
			{ label: '', name: 'onlineSim', index: 'online_sim', width: 80 }, 			
			{ label: '', name: 'offlineSim', index: 'offline_sim', width: 80 }, 			
			{ label: '频率', name: 'frequency', index: 'frequency', width: 80 }			
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
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		sifanyClassProp: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.sifanyClassProp = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.sifanyClassProp.id == null ? "sys/sifanyclassprop/save" : "sys/sifanyclassprop/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.sifanyClassProp),
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
                        url: baseURL + "sys/sifanyclassprop/delete",
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
			$.get(baseURL + "sys/sifanyclassprop/info/"+id, function(r){
                vm.sifanyClassProp = r.sifanyClassProp;
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