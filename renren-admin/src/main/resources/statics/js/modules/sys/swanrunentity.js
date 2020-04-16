$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/swanrunentity/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			// { label: '操作人', name: 'userId', index: 'user_id', width: 80 },
			{ label: 'PID', name: 'pid', index: 'pid', width: 80 },
			{ label: '文件路径', name: 'codeUrl', index: 'code_url', width: 80 }, 			
			// { label: '代码', name: 'codeDetail', index: 'code_detail', width: 80 },
			{ label: '脚本ID', name: 'pyControlId', index: 'py_control_id', width: 80 }, 			
			{ label: '开始时间', name: 'startTime', index: 'start_time', width: 80, formatter: function(value, options, row){
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
			{ label: '停止时间', name: 'endTime', index: 'end_time', width: 80, formatter: function(value, options, row){
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
			{ label: '停止方式', name: 'endType', index: 'end_type', width: 80 , formatter: function(value, options, row){
                    if (value === 0)
                        return '<span class="label label-danger">自动停止</span>'
                     else if( value == 1)
                         return '<span class="label label-success">正常停止</span>'
                     else
                         return ""
                }},
            // { label: '脚本输出', name: 'pyOutput', index: 'py_output', width: 80 , formatter: function(value, options, row){
            //
            //         var $eleBtn2 = $("#btn2");
            //
            //         //已知一个下载文件的后端接口：https://codeload.github.com/douban/douban-client/legacy.zip/master
            //         //方法一：window.open()
            //
            //         return value === null ?
            //             "" :
            //            // '<input type="text" class="form-control" v-model="swanRunEntity.py_output" placeholder="代码" @click="menuTree"/>'
            //
            //             // '<a onclick=\"detll('+value+')\">查看</a>'
            //    ' <input type="button" value="html级别绑定方式" onclick="detll(\''+value+'\')" />'
            //         //window.open(value, 'newwindow', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
            //
            //     }},
			// { label: '脚本输出路径', name: 'outputPath', index: 'output_path', width: 80 , formatter: function(value, options, row){
            //
            //         var $eleBtn2 = $("#btn2");
            //
            //         //已知一个下载文件的后端接口：https://codeload.github.com/douban/douban-client/legacy.zip/master
            //         //方法一：window.open()
            //
            //         return value === null ?
            //             "" :
            //             '<a location.href="file:\\\\\\'+value+'">查看输出</a>'
            //
            //             //window.open(value, 'newwindow', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
            //              value;
			// }},
        ],
        sorttabe:true,
        sortorder:"desc",

        sortname: "start_time",
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
var isshowing=false;
var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		swanRunEntity: {},
        q:{
            key: null,
        },
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.swanRunEntity = {};
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
                var url = vm.swanRunEntity.id == null ? "sys/swanrunentity/save" : "sys/swanrunentity/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.swanRunEntity),
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
                        url: baseURL + "sys/swanrunentity/delete",
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
            isshowing=true;
		    function refreshme(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/swanrunentity/getcodes",
                    contentType: "application/json",
                    data: JSON.stringify([vm.swanRunEntity.id]),
                    success: function(r){
                        if(r.code == 0){
                            console.log(r);
                            editor.setValue(r.res[0].pyOutput);

                        }else{
                            layer.alert(r.msg);
                        }
                    }
                });
            }
            refreshme();
            setInterval(function () {
                if(isshowing){
                    if(vm.swanRunEntity.endType==null){
                        refreshme();
                    }
                }

            },1000)
            layer.open({
                type: 1,
                offset: '0',
                skin: 'layui-layer-molv',
                title: "脚本输出",
                area: ['800px', '500px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#menuLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    isshowing=false;
                    layer.close(index);

                }
            });
        },

        menuTree2: function(){
            editor2.setValue(vm.swanRunEntity.codeDetail);
            layer.open({
                type: 1,
                offset: '0',
                skin: 'layui-layer-molv',
                title: "代码",
                area: ['800px', '500px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#menuLayer2"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var values = editor2.getValue();

                    console.log(values);
                    //vm.swanPyControl.pystr=values;
                    //window.alert(values)
                    //window.alert(editor.getValue())
                    //document.getElementById("scripText").innerHTML = editor.getValue();
                    vm.swanRunEntity.codeDetail=values;
                    // window.alert('bbbbbb')
                    // vm.writeFile('E://work/trade/js/script.txt', values);
                    // window.alert('aaaaaaaaaaa')
                    layer.close(index);

                }
            });
        },
		getInfo: function(id){
			$.get(baseURL + "sys/swanrunentity/info/"+id, function(r){
                vm.swanRunEntity = r.swanRunEntity;
            });
		},
        // reload: function (event) {
        //     var page = $("#jqGrid").jqGrid('getGridParam','page');
        //     $("#jqGrid").jqGrid('setGridParam',{
        //         postData:{'key': vm.q.key},
        //         page:page
        //     }).trigger("reloadGrid");
        // }

        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'key': vm.q.key},
                page:page
            }).trigger("reloadGrid");
        },
	}
});