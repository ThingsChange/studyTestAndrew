$(document).ready(function(){
    $.execScript({
        script:"html.staff.list-ztree",
        needTrascation:false,
        funName:"getOrg",
        success:function(data){
            $("#orgTree").tree({
                isMulti: false,//是否多选(可选)默认为true
                idKey: "fid",//节点字段
                pIdKey: "parentid",//父节点字段
                content: data.datasources[0].rows,//结算数据
                callBackFunc: showInfo,// callBackFunc:回调函数名(可选)
                callBackCheckFunc: showInfo, //多选的回调函数（可选）
                isExpand:true
            });
        }
    });
});
function showInfo(event, treeId, treeNode){
    alert(treeNode.tId + ", " + treeNode.name + "," + treeNode.checked);
}
