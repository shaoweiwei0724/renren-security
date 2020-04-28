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
    }
};
var ztree;

var vm = new Vue({
    el:'#rrapp',
    data:{
        showList: true,
        title: null,
        sifanyOrganization:{
            parentName:null,
            name:null,
            parentId:0,
            code:null,
             orderNum:0
        }
    },
    methods: {

        getOrganization: function(){
            //加载部门树
            $.get(baseURL + "sys/sifanyorganization/select", function(r){
                ztree = $.fn.zTree.init($("#deptTree"), setting, r.deptList);
                var node = ztree.getNodeByParam("id", vm.sifanyOrganization.parentId);
                ztree.selectNode(node);
                if(node != null)
                vm.sifanyOrganization.parentName = node.name;
            })

        },
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.sifanyOrganization = {parentName:null,name:null,parentId:0,code:null};
            vm.getOrganization();
        },
        update: function () {
            var deptId = getDeptId();
            if(deptId == null){
                return ;
            }

            $.get(baseURL + "sys/sifanyorganization/info/"+deptId, function(r){
                vm.showList = false;
                vm.title = "修改";
                vm.sifanyOrganization = r.sifanyOrganization;

                console.log("vm.sifanyOrganization ",vm.sifanyOrganization )

                vm.getOrganization();
            });
        },
        del: function () {
            var deptId = getDeptId();
            if(deptId == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/sifanyorganization/delete",
                    data: "id=" + deptId,
                    success: function(r){
                        if(r.code === 0){
                            alert('操作成功', function(){
                                vm.reload();
                            });
                        }else{
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        saveOrUpdate: function (event) {
            var url = vm.sifanyOrganization.id == null ? "sys/sifanyorganization/save" : "sys/sifanyorganization/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.sifanyOrganization),
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(){
                            vm.reload();
                        });
                    }else{
                        alert(r.msg);
                    }
                }
            });
        },
        deptTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择部门",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#deptLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级部门
                    vm.sifanyOrganization.parentId = node[0].id;
                    vm.sifanyOrganization.parentName = node[0].name;

                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            Dept.table.refresh();
        }
    }
});

var Dept = {
    id: "deptTable",
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Dept.initColumn = function () {
    var columns = [

        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle', width: '80px'},
        {title: '机构名', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '180px'},
        {title: '上级部门', field: 'parentName', align: 'center', valign: 'middle', sortable: true, width: '100px'},
        {title: '编码', field: 'code', align: 'center', valign: 'middle', sortable: true, width: '100px'}]

    return columns;
};


function getDeptId () {
    var selected = $('#deptTable').bootstrapTreeTable('getSelections');
    if (selected.length == 0) {
        alert("请选择一条记录");
        return null;
    } else {
        return selected[0].id;
    }
}


$(function () {
    $.get(baseURL + "sys/sifanyorganization/info", function(r){
        var colunms = Dept.initColumn();
        var table = new TreeTable(Dept.id, baseURL + "sys/sifanyorganization/list", colunms);
        table.setRootCodeValue(r.deptId);
        table.setExpandColumn(2);
        table.setIdField("id");
        table.setCodeField("id");
        table.setParentCodeField("parentId");
        table.setExpandAll(true);
        table.setHeight($(window).height()-100);
        table.init();
        Dept.table = table;
    });
});
