var selected_id=0;
var ztreeMain;
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
                onClick: tree_click_swan
        }
};

function tree_click_swan() {
    var node = ztreeMain.getSelectedNodes();
    selected_id=node[0].id;

    var page = $("#jqGrid").jqGrid('getGridParam','page');
    $("#jqGrid").jqGrid('setGridParam',{
        page:page,
        postData:{'selected_id':selected_id,'type':'map'},
    },true).trigger("reloadGrid");

    // console.log(selected_id);
    // vm.reload();
}




function loadGridSwan(){
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/sifanyclass/list',
        datatype: "json",
        colModel: [
            { label: 'id', name: 'id', index: 'id', width: 50, key: true },
            { label: '类名', name: 'name', index: 'name', width: 80 },
            { label: '父类ID', name: 'parentId', index: 'parent_id', width: 80 },
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
            { label: '状态', name: 'status', index: 'status', width: 80 },
            { label: '用户id', name: 'userId', index: 'user_id', width: 80 },
            { label: '图标', name: 'icons', index: 'icons', width: 80 }
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
}
$(function () {

    $.get(baseURL + "sys/sifanyclass/select?type=map", function(r){
        // var a = JSON.stringify(r.classLists);
        // alert(a);
        ztreeMain = $.fn.zTree.init($("#classTreeMain"), setting, r.classLists);
        var node = ztreeMain.getNodeByParam("id",ztreeMain.getNodes()[0].id);
        ztreeMain.selectNode(node);
        if(node){
            //触发默认数据的click事件
            $("#"+node.tId+"_a").dblclick();//触发ztree点击事件
        }
        // vm.sifanyClass.parentName = node.name;
    })
    loadGridSwan();

});


var ztree;





var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		sifanyClass: {
            parentName:null,
            parentId:0,
            classId:0,
            orderNum:0,
        }
	},
	methods: {
		query: function () {

            var node = ztreeMain.getSelectedNodes();

            selected_id=node[0].id;
            console.log(selected_id);

            vm.reload();
            // loadGridSwan();
		},

        scene: function (event) {
            var ids = getSelectedRows();
            if(ids == null){
                return ;
            }
            var lock = false;
            layer.confirm('确定要实例化场景？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                if(!lock) {
                    lock = true;
                    $.ajax({
                        type: "POST",
                        url: baseURL + "sys/sifanyclass/toObj",
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
        getSifanyclass: function(){
            //加载模型类树
            $.get(baseURL + "sys/sifanyclass/select", function(r){
                // var a = JSON.stringify(r.classLists);
                // alert(a);
                ztree = $.fn.zTree.init($("#classTree"), setting, r.classLists);
                var node = ztree.getNodeByParam("id", vm.sifanyClass.parentId);
                ztree.selectNode(node);
                vm.sifanyClass.parentName = node.name;
            })
        },

		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.sifanyClass = {parentName:null,parentId:selected_id,orderNum:0,'icons':''};
			vm.getSifanyclass();
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";

            vm.getInfo(id);
            vm.getSifanyclass();
		},

        // update: function (event) {
        //     var id = getSelectedRow();
        //     if(id == null){
        //         return ;
        //     }
        //     localStorage.selectSceneId=id;
        //
        //     $("#swan-svg").attr('src', '/swan-admin/statics/gojs/samples/productionProcess.html?extensions=');
        //     document.getElementById('swan-svg').contentWindow.location.reload(true);
        //     layer.open({
        //         type: 1,
        //         offset: '0',
        //         skin: 'layui-layer-molv',
        //         title: "场景实例",
        //         area: ['1000px', '1000px'],
        //         shade: 0,
        //         shadeClose: false,
        //         content: jQuery("#menuLayer"),
        //         btn: ['确定', '取消'],
        //         btn1: function (index) {
        //             // var values =$("#swan-svg").contents().find("#swan-res").val();
        //             //
        //             // console.log(values);
        //             //
        //             vm.sifanyClass.sceneid=id;
        //
        //
        //             layer.close(index);
        //
        //         }
        //     });
        // },

		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.sifanyClass.id == null ? "sys/sifanyclass/save" : "sys/sifanyclass/update";
                vm.sifanyClass['type']='map';
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.sifanyClass),
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
                        url: baseURL + "sys/sifanyclass/delete",
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
			$.get(baseURL + "sys/sifanyclass/info/"+id, function(r){
                vm.sifanyClass = r.sifanyClass;
            });
		},
        classTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择父类",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#classLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择父类
                    vm.sifanyClass.parentId = node[0].id;
                    vm.sifanyClass.parentName = node[0].name;

                    layer.close(index);
                }
            });
        },

        menuTree: function(){
            // editor.setValue(vm.sifanyClass.icon);
            localStorage.iconsId = vm.sifanyClass.icons;
            // alert(localStorage.iconsId);
            // // if(localStorage.iconsId != null)
            // $.get(baseURL + "sys/sifanydatatext/scene/"+localStorage.iconsId, function(r){
            //     alert(r.icons);
            //     // document.getElementById("mySavedModel").value = r.icons;
            //     console.log(r.icons);
            // });

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
                    var values =$("#swan-svg").contents().find("#swan-res").val();


                    console.log("+++++++++++++++++++++++++++++++++++"+values);

                    vm.sifanyClass.icons=encodeURI(values);

                    alert(vm.sifanyClass.icons);
                    layer.close(index);

                }
            });
        },
		reload: function (event) {


			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page,
                postData:{'selected_id':selected_id,'type':'map'},
            },true).trigger("reloadGrid");



		}
	}
});