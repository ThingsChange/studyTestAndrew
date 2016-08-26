/**
 * Created by wanglijun on 2016/4/29.
 */
$(document).ready(function (){
    showMenu();
});
//选中人员的个数
var staffCheckedNo=0;

var setting = {
    check: {
        isSimpleData: true,
        enable: true,
        chkStyle:"radio",
        chkboxType: {"Y":"", "N":""},
        radioType:"all"
    },
    view: {
        dblClickExpand: false
    },
    data: {
        simpleData: {
            enable:true,
            idKey: "id",
            pIdKey: "pid"

        }
    },
    callback: {
        beforeClick: beforeClick,
        onCheck: onCheck
    },

};

function beforeClick(treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("orgTree");
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
}



function getStaffOnCheck(event){

}






/**
 * 根据部门ID查找部门员工
 * @param orgId
 */
function getStaffByOrg(orgId){
    var param = {
        deptid:orgId
    }
    var t = $("#content-right").children("span");
    var li=t.length;
    if(li!=null&&li!=undefined&&li>0){
    $("#content-right").empty();

}
    var staffNo;
    $.execScript({
        script:"html.staff.selectStaff",
        needTrascation:false,
        funName:"getStaffByOrg",
        form:param,
        success:function(data){

            var zNodes=data.datasources[0].rows;
             staffNo=zNodes.length;
            console.log("staffNo===="+staffNo+"=========");
            var type= Object.prototype.toString.call(zNodes).slice(8,-1);
            var depStaff=0;
            staffCheckedNo=0;
            selectNo(staffCheckedNo,staffNo)


            $.each(zNodes,function(i,v){
                //console.log("v.name============"+ v.name);
                //console.log("i============"+("maopao"+i));
                //console.log("i============"+(i+"maopao"));
                var id=(i+"maopao");
                var spanId=("maopao"+i);
                //var inputId=(i+"maopao");
                $("#content-right").append('<span class="gridCell"> <nobr><input type="checkbox" id='+id+' class="maopao" /><span id='+spanId+'>'+ v.name+'</span></nobr></span>');
                //$("#content-right").append('<span class="gridCell"> <nobr><input type="checkbox" id='+id+' class="maopao" /><span id='+id+'>'+ v.name+'</span></nobr></span>');
            })

        }
    });

    console.log("staffNo========="+staffNo);
    var depStaff=0;
    staffCheckedNo=0;
    selectNo(staffCheckedNo,staffNo)
 /*   var tt = $("#content-right").children("span");
    var lis=tt.length;
    console.log("lis===="+lis);
    depStaff=lis;*/
    //$("#content-right input").each(function(){
    //    console.log("1111111");
    //    depStaff+=1;
    //})
   ;



}

/**
 * 被选中的时候的操作，暂时单选，可支持多选
 * @param e
 * @param treeId
 * @param treeNode
 */
function onCheck(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("orgTree"),
        nodes = zTree.getCheckedNodes(true),
        v = "";
    for (var i=0, l=nodes.length; i<l; i++) {
        v += nodes[i].id + ",";
    }
    if (v.length > 0 ) v = v.substring(0, v.length-1);
    getStaffByOrg(v);




}
function showMenu() {
    var cityObj = $("#citySel");
    var cityOffset = $("#citySel").offset();
    $("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

    $("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
    $("#menuContent").fadeOut("fast");
    //$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
        //hideMenu();
    }
}







$(document).ready(function(){
    //$.fn.zTree.init($("#orgTree"), setting, zNodes);
    inittree();
    $("#removeAll").on("click",removeAll);
    $(".fa fa-search").on("click",searchStarf);
    document.getElementById("content-right").addEventListener("click",function(e){
        if(e.target && e.target.nodeName == "INPUT") {
            var classes = e.target.className.split(" ");
            if(classes) {
                for(var x = 0; x < classes.length; x++) {
                    if(classes[x] == "maopao") {
                        var name=document.getElementById(e.target.id).nextSibling.innerText;
                        //判断下选中在状态，进行添加或者是删除
                        var isChecked=document.getElementById(e.target.id).checked;
                        var id="li"+ e.target.id;
                        if(isChecked){
                            $("#selectedName").append('<li id='+id+'><nobr><span>'+name+'</span></nobr><em></em></li>');
                            staffCheckedNo+=1;
                            selectNo(staffCheckedNo,$("#content-right").children("span").length)
                        }else {
                            console.log(id);
                            console.log($("li[id='"+id+"']"));
                            var child=$("li[id='"+id+"']").remove();
                            staffCheckedNo-=1;
                            selectNo(staffCheckedNo,$("#content-right").children("span").length)
                        }

                    }
                }
            }
        }
    });
    var depStaff= $(".gridCell").childNodes;
    var ssss=$("#content-right input").length;
    selectNo(staffCheckedNo,ssss);
})();
//清空操作
function removeAll(){
    $("#selectedName").empty();
    //上面的选中状态也需要取消
    $("#content-right input").each(function(){
        this.checked=false;
    })
    //数字归零
    selectNo(0,$("#content-right").children("span").length)
}
//修改选择人数
function  selectNo(selNo,allNo){
    if(!selNo){
        selNo=0;
    };
    if(!allNo){
        allNo=0;
    }
    var _selectNo=selNo+"/"+allNo;
    $("#selectNo").text("已选（"+_selectNo+")");

}
function searchStarf(){
    //fa fa-search
    var name=$("#citySel").val();
    var param = {
        name:name
    }
    $.execScript({
        script:"html.staff.selectStaff",
        needTrascation:false,
        funName:"getOrgListByName",
        form:param,
        success:function(data){
            var t = $("#orgTree");
            var zNodes=data.datasources[0].rows;
            for(var i=0;i<zNodes.length;i++){
                zNodes[i].open=true;
                console.log(zNodes[0]);
            }
            $.fn.zTree.init(t, setting,zNodes);
        }
    })

}

function inittree(){
    $.execScript({
        script:"html.staff.selectStaff",
        needTrascation:false,
        funName:"getOrgList",
        success:function(data){
            var t = $("#orgTree");
            var zNodes=data.datasources[0].rows;
            var type= Object.prototype.toString.call(zNodes).slice(8,-1);
        /*    var zNode=
                [{id:"1", pId:"4", name:"运营部",open:true },
                    {id:"2",  pId:"4", name:"市场部",open:true },
                    {id:"3",  pId:"4", name:"研发部",open:true},
                    {id:"4",pId:null,name:"总部",open:true}];*/
            for(var i=0;i<zNodes.length;i++){
                zNodes[i].open=true;
                console.log(zNodes[0]);
            }
            $.fn.zTree.init(t, setting,zNodes);

            selectNo("","");
        }
    });
}

