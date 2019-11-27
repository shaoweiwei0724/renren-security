var lock = true;

setTimeout($(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/swanpycontrol/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, height: 50, key: true },
			{ label: '脚本名', name: 'name', index: 'name', width: 80, height: 50 },
            // { label: '代码', name: 'txtt', index: 'txtt', width: 80, height: 50  },
            { label: '脚本路径', name: 'path', index: 'Path', width: 80, height: 50  },
			{ label: '进程id', name: 'pid', index: 'Pid', width: 80, height: 50  },
			{ label: '脚本运行状态', name: 'states', index: 'states', width: 80, height: 50  },
            { label: '当前运行实例ID', name: 'entityId', index: 'entity_id', width: 80, height: 50  },
            // { label: '开始时间', name: 'beginTime', index: 'begin_time', width: 80, height: 50 },
            // { label: '结束时间', name: 'endTime', index: 'end_time', width: 80, height: 50 },
        ],
        sorttabe:true,
        sortorder:"desc",

        sortname: "id",
		viewrecords: true,
        height: 450,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25,
        rownumHeigth: 25,
        autowidth:true,
        autoheigth:true,
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

}),10);

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		swanPyControl: {},
        q:{
            key: null
        }
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.swanPyControl = {'txtt':''};
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
                var url = vm.swanPyControl.id == null ? "sys/swanpycontrol/save" : "sys/swanpycontrol/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.swanPyControl),
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
			lock = false;
            layer.confirm('确定要删除选中的记录？', {
                btn: ['确定','取消'] //按钮
            }, function(){
               if(!lock) {
                    lock = true;
		            $.ajax({
                        type: "POST",
                        url: baseURL + "sys/swanpycontrol/delete",
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
        start: function (event) {
            var ids = getSelectedRows();
            if(ids == null){
                return ;
            }
            // lock = false;
            layer.confirm('确定要运行选中的脚本？', {
                btn: ['确定','取消'] //按钮
            }, function(){
              // if(!lock) {
              //     lock = true;
                layer.msg("正在启动脚本......", {icon: 1});
                    $.ajax({
                        type: "POST",
                        url: baseURL + "sys/swanpycontrol/run",
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
               // }
            }, function(){
            });
        },
        stop: function (event) {
            var ids = getSelectedRows();
            if(ids == null){
                return ;
            }
            lock = false;
            layer.confirm('确定要停止选中的脚本？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                if(!lock) {
                    lock = true;
                    $.ajax({
                        type: "POST",
                        url: baseURL + "sys/swanpycontrol/stop",
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
        menuTree: function(){
            editor.setValue(vm.swanPyControl.txtt);
            layer.open({
                type: 1,
                offset: '0',
                skin: 'layui-layer-molv',
                title: "python容器",
                area: ['800px', '500px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#menuLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var values = editor.getValue();

                    console.log(values);
                    //vm.swanPyControl.pystr=values;
                    //window.alert(values)
                    //window.alert(editor.getValue())
                    //document.getElementById("scripText").innerHTML = editor.getValue();
                    vm.swanPyControl.txtt=values;
                    // window.alert('bbbbbb')
                    // vm.writeFile('E://work/trade/js/script.txt', values);
                    // window.alert('aaaaaaaaaaa')
                    layer.close(index);

                }
            });
        },
		getInfo: function(id){
			$.get(baseURL + "sys/swanpycontrol/info/"+id, function(r){
                vm.swanPyControl = r.swanPyControl;
            });
		},
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'key': vm.q.key},
                page:page
            }).trigger("reloadGrid");
        },



        writeFile : function (filename,filecontent){
            var fs, f;
            alert('01');
            fs = new ActiveXObject("Scripting.FileSystemObject");
            alert('1');
            f = fs.OpenTextFile(filename,8,true);
            alert('2');
            filecontent = filecontent.replace(/<br>/g, "\r\n"); //把所有的br替换成换行符
            f.WriteLine(filecontent);
            f.Close();
            alert('ok');
        }



	}

});
//根据DOM元素的id构造出一个编辑器

