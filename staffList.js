/**
 * staffList.js主要实现staffList.html页面涉及相关功能，例如：
 * 1.在职员工相关功能
 * 2.无部门员工相关功能
 * 3.离职员工相关功能
 * @Copyright:     2016 www.quauq.com Inc. All rights reserved.
 * @Date:     2016年04月18日
 */


//-------------------code begin------------------------

var zTree;
var ids="";//当前节点下的所有节点
var setting = {//树的设置信息
    view: {
        dblClickExpand: false,
        showLine: false,
        showIcon:false
    },
    data: {
        simpleData: {
            enable:true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: ""
        }
    },
   /* check: {
        enable: true,
        chkStyle: "checkbox",
        chkboxType: { "Y": "ps", "N": "ps" }
    },*/
    callback: {
        beforeClick: function(treeId, treeNode) {
            $("#dfid").val(treeNode.id);
            $("#deptname").val(treeNode.name);
            getDepByPid(treeNode.id);
            getDepById(treeNode.id);
            param.name=$("#staffna").val();
            param.dfid=treeNode.id;
            renderStaffList(param);
        }

    }
};
var param = {
    pageNo: 1,
    pageSize: 20
};

/**
 * 页面标签切换
 * @param name
 * @param cursel
 * @param n
 */
function setTab(name, cursel, n) {
    for (var i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = (i == cursel ? "hover" : "");
        con.style.display = i == cursel ? "block" : "none";
    }
    switch (cursel){
        case 1:
            hiddenMess();
            $("#belongTo").val("userbase");
            inittable();
            break;
        case 2:
            hiddenMess();
            $("#belongTo").val("noUserBase");
            initNoStaffListFrist();
            break;
        case 3:
            hiddenMess();
            $("#belongTo").val("levUserBase");
            initLevStaffListFrist();
    }
};
/**
 * 获取当前节点下所有节点
 * @param deptidarry
 * @param treeNode
 * @returns {*}
 */
function getChildren(deptidarry,treeNode){
    deptidarry.push(treeNode.id);
    if (treeNode.isParent){
        for(var obj in treeNode.children){
            getChildren(deptidarry,treeNode.children[obj]);
        }
    }
    return  deptidarry;
}

/**
 * 获取所有子节点id
 * @param idvalue
 * @returns {string}
 */
function getChildids(idvalue){
    var idarry=[];
    var idss="";
    var obj= $.fn.zTree.getZTreeObj("orgTree");
    var idvalues=idvalue.split(',');
    if(idvalues.length>0){
        for(var i=0;i<idvalues.length;i++){
            var node=obj.getNodeByParam("id",idvalues[i],null);//获取当前节点
            idarry=getChildren(idarry,node);
            idss+=idarry.toString()+",";//拼接所有id
        }
    }
    return idss.substring(0,idss.length-1);
}

/**
 * 按钮禁用
 */
function readyButtonDis(){
    $("[class^='noDeptEdit butn']").addClass("disable");
    $("[class^='noDeptLev butn']").addClass("disable");
    $("[class^='deptlist butn']").addClass("disable");
    $("[class^='stafflist butn']").addClass("disable");
    $("[class^='levstafflist butn']").addClass("disable");

    $("[class^='noDeptEdit butn']").attr("disabled", true);
    $("[class^='noDeptLev butn']").attr("disabled", true);
    $("[class^='deptlist butn']").attr("disabled", true);
    $("[class^='stafflist butn']").attr("disabled", true);
    $("[class^='levstafflist butn']").attr("disabled", true);
    $("tbody.active").removeClass();
}

/**
 * 离职员工页面  个人详情页面 隐藏编辑和离职按钮
 */
function hiddenButtonToShowAlong(){
    $("#editAlong").hide();
    $("#alongLev").hide();
}

/**
 * 离职员工页面  个人详情页面 显示编辑和离职按钮
 */
function showButtonToShowAlong(){
    $("#editAlong").show();
    $("#alongLev").show();
}

$(document).ready(function(){//按钮启用禁用功能
    param.name=$("#staffna").val();
    inittree();//初始化树
    inittable();//初始化表格
    readyButtonDis();

    $(document).click(function(e){
        e = window.event || e;
        var obj = e.srcElement || e.target;
        if(!$(obj).is("td")&&!$(obj).is("input[type='checkbox']")&&!$(obj).is("button")){
            //---------这里也有要替换的----------------------------
            if(!$("input[type='checkbox']").is(':checked')){
                readyButtonDis();
            }
        }
    });

/*
    getDepById(4);//根据id获取节点信息
    getDepByPid(4);//根据父节点获取部门
    var param = {
        pageNo: 1,
        pageSize: 20,
        name:$(".search-box input").val()
    }
 */



    $("#staffna").bind("keydown",function(e){
        if(e.keyCode==13){
            param.name=$(this).val();
            param.dfid=$("#dfid").val();
            renderStaffList(param);
        }
    });
    $("#staffns").bind("click",function(e){
            param.name=$("#staffna").val();
            param.dfid=$("#dfid").val();
            renderStaffList(param);
    });
    $("#fileId").bind("change",function(e){
       doSave();//上传文件
    });

    // -----------------   需要替换部分  ------------------------------------------
    /**
     * 在职员工,查询事件绑定keydown
     */
    $("#liveDeptSearch").bind("keydown",function(e){
        if(e.keyCode==13){
            param.name=$(this).val();
            renderStaffList(param);
        }
    });

    /**
     * 在职员工,查询事件绑定click
     */
    $("#liveDS").bind("click",function(e){
        param.name=$(this).val();
        renderStaffList(param);
    });

    /**
     * 离职员工,查询事件绑定keydown
     */
    $("#levDeptSearch").bind("keydown",function(e){
        if(e.keyCode==13){
            param.name=$(this).val();
            initLevStaffList(param);
        }
    });

    /**
     * 离职员工,查询事件绑定click
     */
    $("#levDS").bind("click",function(e){
        param.name=$("#levDeptSearch").val();
        //console.debug("离职员工 ----------------- "+param.name);
        initLevStaffList(param);
    });

    /**
     * 无部门员工,查询事件绑定keydown
     */
    $("#noDeptSearch").bind("keydown",function(e){
        if(e.keyCode==13){
            param.name=$(this).val();
            initNoStaffList(param);
        }
    });

    /**
     * 无部门员工,查询事件绑定click
     */
    $("#noDS").bind("click",function(e){
        param.name=$("#noDeptSearch").val();
        //console.debug("无部门 ----------------- "+param.name);
        initNoStaffList(param);
    });

    /**
     * 离职员工,复职事件绑定click
     */
    $("#repDept").bind("click",function(e){
        var value = $("#rebackDept").val();
        param.name=$(this).val();
        value = value.split("_");
        repDept(param,value[0],value[1],value[2]);
    });

    /**
     * 离职员工,复职事件绑定click----在职员工
     */
    $("#levDept").bind("click",function(e){
        var value = $("#leaveDept").val();
        param.name=$(this).val();
        value = value.split("_");
        repDept(param,value[0],value[1],value[2]);
    });

    /**
     * 离职员工,复职事件绑定click----无部门
     */
    $("#noDept").bind("click",function(e){
        var value = $("#noLeaveDept").val();
        param.name=$(this).val();
        value = value.split("_");
        repDept(param,value[0],value[1],value[2]);
    });

    /**
     *  单个页面,  详细信息离职  --
     */
    $("#alongLev").bind("click",function(e){
        var ids = $("#alongFid").val();
        param.name=$(this).val();
        repDeptAlong(param,ids);
    });

    /**
     * 一个员工详细信息隐藏事件绑定click
     */
    $("#full-screen-small").bind("click",function(e){
        //把半屏图标变全屏  有个hidden值来表示是半屏还是全屏  false 是半屏 true是全屏
        var flag = $("#screenId").val();
        if(flag == "false"){
            //半屏变全屏
            $("#screenId").val("true");
            $("[id='full-screen-small']").removeClass("full-screen");
            $("[id='full-screen-small']").addClass("full-screen full-screen-small");
            $("[id='suspension-layer']").removeClass("suspension-layer  display-none all-screen");
            $("[id='suspension-layer']").addClass("suspension-layer all-screen");
        }else{
            //全屏变半屏
            $("#screenId").val("false");
            $("[id='full-screen-small']").removeClass("full-screen full-screen-small");
            $("[id='full-screen-small']").addClass("full-screen");
            $("[id='suspension-layer']").removeClass("suspension-layer all-screen");
            $("[id='suspension-layer']").addClass("suspension-layer");
        }
    });

    /**
     * 点击灰色div层 隐藏个人详情展现
     */
    $("#layerId").bind("click",function(e){
        // hiddenMess();
        //在展现框下加个底层 层
        $("[id='layerId']").removeClass("disable-layer");
        $("[id='layerId']").addClass("layer");
        //显示一半的 div
      //  $("[id='suspension-layer']").removeClass("suspension-layer");
        $("[id='suspension-layer']").addClass("display-none");
        $("#screenId").val("false");
    });

    /**
     *
     //一个员工详细信息隐藏事件绑定click
     $("#full-screen-small").bind("click",function(e){
        //$("[id='suspension-layer']").removeClass("suspension-layer");
        //$("[id='suspension-layer']").addClass("suspension-layer  display-none all-screen");
        //半屏变全屏
        if($("#full-screen-small").val() == false){
            $("#full-screen-small").val("true");
            $("[id='full-screen-small']").removeClass("full-screen");
            $("[id='full-screen-small']").addClass("full-screen full-screen-small");
            $("#suspension-layer").animate({right:'580'},1000);
            $("#suspension-layer").show();
        }else{
        //全屏变半屏
            $("#full-screen-small").val("false");
            $("[id='full-screen-small']").removeClass("full-screen full-screen-small");
            $("[id='full-screen-small']").addClass("full-screen");
            $("#suspension-layer").animate({right:'-120px'},1000);
            $("#suspension-layer").show();
        }
    });
     */
    //---------------------------------------------------------------------------
});

/**
 * 切换Tab页的时候隐藏，个人详情
 */
function hiddenMess(){
    $("#screenId").val("false");
    $("[id='suspension-layer']").removeClass("suspension-layer all-screen");
    if($("[id='suspension-layer']").hasClass("all-screen")){
        $("[id='suspension-layer']").removeClass("all-screen");
    }
    $("[id='suspension-layer']").addClass("suspension-layer display-none");
    //$("[id='suspension-layer']").addClass("suspension-layer");
    $("input[type='checkbox']").attr("checked", false);//清空所有被选中的checkbox
    //$("[id='suspension-layer']").removeClass("suspension-layer");

}

/**
 * 打开员工详情的动画效果,以1000毫秒的速度 show出来
 * 这个是全屏展示
 */
function showAllDivPeople(){
    $("#suspension-layer").animate({right:'0'},10000);
    $("#suspension-layer").show();
}

/**
 * 这个是半屏展示
 */
function showHelfDivPeople(){
    //在展现框下加个底层 层
    $("[id='layerId']").removeClass("layer");
    $("[id='layerId']").addClass("disable-layer");
    $("[id='suspension-layer']").removeClass("display-none");
   // $("[id='suspension-layer']").addClass("suspension-layer");
    //添加一层div
}

/**
 * 切换到在职员工列表页面
 */
function initWorkingStaffList(dfid){
    var param = {
        pageNo: 1,
        pageSize: 20,
        name:"",
	    dfid:dfid
    }
    $("#staffna").val("");//清空无部门查询条件
    $.execScript({
        script:"html.staff.staffList",
        needTrascation:false,
        funName:"findStaffInfos",
        form:param,
        success:function(result){
            if (window.sessionStorage) {
                if(result.execStatus)
                {
                    var formDataset = result.formDataset;
                    var datasources = result.datasources;
                    $.binding(datasources);
                    initPager(datasources);
                }
            } else {
                $.layer.alert('浏览器不支持！');
            }
        },
        error: function (result) {
            $.layer.alert('系统异常,请联系管理员');
        }
    });
}

/**
 * 初始化树信息
 */
function inittree(){
    $.execScript({
        script:"html.staff.staffList",
        needTrascation:false,
        funName:"getOrg",
        success:function(data){
            var t = $("#orgTree");
            zNodes=data.datasources[0].rows;
            t = $.fn.zTree.init(t, setting,zNodes );
        }
    });
}

/**
 * 初始表树信息
 */
function inittable(){
    $.execScript({
        script:"html.staff.staffList",
        needTrascation:false,
        funName:"getRootDep",
        success:function(data){
            var rows=data.datasources[0].rows;
            getDepByPid(rows[0].fid);
            getDepById(rows[0].fid);
            initWorkingStaffList(rows[0].fid);
            $("#dfid").val(rows[0].fid);
            $("#deptname").val(rows[0].name);
        }
    });
}



// -----------------   需要替换部分  ------------------------------------------
//----------------------员工离职------------------
/**
 * 三个tap页中,员工离职和复职的共同调用方法
 * @param param
 * @param checkboxName  为表单checkbox的名称
 * @param flag          离职：leave  复职:reback
 * @param datasource    表单的数据源
 * @returns {boolean}
 */
//----checkboxName 为表单checkbox的名称   flag为  离职：leave  复职:reback
function repDept(param,checkboxName,flag,datasource){
    var tName = "复职";
    if(flag == 'leave'){
        tName = "离职";
    }
    var ids = getStaffids(checkboxName);
    if (ids == ''){
        $.layer.alert("请选择"+tName+"员工！");
        return false;
    }
    console.log("ids:   "+ids);
    var rparam = {
        pageNo: param.pageNo,
        pageSize: param.pageSize,
        name:param.name,
        fid:ids,
        flag:flag
    };

    layer.confirm('您确定要'+tName+'该名员工吗？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        $.execScript({
            script:"html.staff.levDetStaffList",
            form:rparam,
            needTrascation:true,
            funName:"reLiveStaff",
            success:function(result){
                if (result.execStatus) {
                    switch (datasource){
                        case 'userbase':
                            renderStaffList(param);
                            break;
                        case 'noUserBase':
                            initNoStaffList(param);
                            break;
                        case 'levUserBase':
                            initLevStaffList(param);
                            break;
                    }
                    $.layer.alert(tName+"成功！");
                }else {
                    $.layer.alert(result.errorMsg);
                }
            }
        });

    }, function(){
    });
}

/**
 * 员工个人详情中的离职功能
 * @param param
 * @param ids  fid
 */
//-------  单个员工离职------------------
function repDeptAlong(param,ids){
    tName = "离职";
    var rparam = {
        pageNo: param.pageNo,
        pageSize: param.pageSize,
        name:param.name,
        fid:ids,
        flag:'leave'
    };
    var datasource =  $("#belongTo").val();
    layer.confirm('您确定要'+tName+'该名员工吗？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        $.execScript({
            script:"html.staff.levDetStaffList",
            form:rparam,
            needTrascation:true,
            funName:"reLiveStaff",
            success:function(result){
                if (result.execStatus) {
                    $("[id='suspension-layer']").removeClass("suspension-layer");
                    $("[id='suspension-layer']").addClass("suspension-layer  display-none all-screen");
                    switch (datasource){
                        case 'userbase':
                            renderStaffList(param);
                            break;
                        case 'noUserBase':
                            initNoStaffList(param);
                            break;
                        case 'levUserBase':
                            initLevStaffList(param);
                            break;
                    }
                    $.layer.alert(tName+"成功！");
                }else {
                    $.layer.alert(result.errorMsg);
                }
            }
        });

    }, function(){
    });
}

/**
 * 无部门列表展现
 */
function initNoStaffListFrist(){
    var param = {
        pageNo: 1,
        pageSize: 20,
        name:""
    }
    $("#noDeptSearch").val("");//清空无部门查询条件
    initNoStaffList(param);
}

/**
 * Tab = 无部门; 列表查询  带分页和条件查询; 渲染列表数据
 * @param param
 */
function initNoStaffList(param){
    $.execScript({
        script:"html.staff.levDetStaffList",
        needTrascation:false,
        funName:"findNoDeptStaffInfos",
        form:param,
        success:function(result){
            if (window.sessionStorage) {
                if(result.execStatus)
                {
                    var formDataset = result.formDataset;
                    var datasources = result.datasources;
                    $.binding(datasources);
                    initNoDeptPager(datasources);
                }
            } else {
                $.layer.alert('浏览器不支持！');
            }
        },
        error: function (result) {
            $.layer.alert('系统异常,请联系管理员');
        }
    });
}

/**
 * 初始化无部门员工列表页面
 * @param datasources
 */
function initNoDeptPager(datasources) {
    $.each(datasources, function () {
        var datasource = this.dsName;
        var rowcount = this.rowCount;
        if (rowcount) {
            //判断分页组件是否已生成
            var pagination = paginations[datasource];
            var $pagination = $('[datasource=' + datasource + '].page');
            if (pagination) {
                /*$pagination.pagination("option", {
                 amount: rowcount
                 });*/
                $pagination.pagination('resetPager',rowcount);
            } else {
                var param = {
                    datasource: datasource,
                    name:$("#noDeptSearch").val()
                };
                pagination = $pagination.pagination({
                    amount: rowcount,
                    change: function (index, pageSize) {
                        param.pageNo = index;
                        param.pageSize = pageSize;
                        initNoStaffList(param);
                    }
                });
                paginations[datasource] = pagination;
            }
        }
    });
    initIndex("noUserBase");
}
//-----------------------------------------------------

/**
 * 一个人员信息单独展示,详情展现
 * @param fid 该人员在 userbase表的fid字段
 */
//---  一个人员信息单独展示-----------
function showPeople(fid,datas){
    var paramp = {
        fid : fid,
        datasource : 'showPeople',
        userId : sessionStorage.getItem("token")
    }
    $("#alongFid").val(fid);
    //console.debug("给alongFid 赋值 :"+$("#alongFid").val());
    showHelfDivPeople();
    if(datas == 'levUserBase'){
        hiddenButtonToShowAlong();
    }else{
        showButtonToShowAlong();
    }
    $.execScript({
        script:"html.staff.levDetStaffList",
        needTrascation:false,
        funName:"showPeople",
        form:paramp,
        success:function(result){
            if (window.sessionStorage) {
                if(result.execStatus)
                {
                    var formDataset = result.formDataset;
                    var datasources = result.datasources;
                    $("#spname").text(datasources[0].rows[0].name);
                    $("#spaccount").text(datasources[0].rows[0].account);
                    $("#spfno").text(datasources[0].rows[0].fon);
                    $("#sppname").text(datasources[0].rows[0].name);
                    $("#spsex").text(datasources[0].rows[0].sex);
                    $("#spbirthday").text(datasources[0].rows[0].birthday);
                    $("#spmobile").text(datasources[0].rows[0].mobile);
                    $("#spphone").text(datasources[0].rows[0].phone);
                    $("#spmail").text(datasources[0].rows[0].mail);
                    $("#alongFid").val(datasources[0].rows[0].fid);
                    //------展示头像--------------
                    var fpth=datasources[0].rows[0].filepath;
                    if(fpth == '' || fpth == null){
                        $("#imageFile").attr("src",'/img/common/background/ygtx.png');
                    }else{
                        $("#imageFile").attr("src",'/api/readImg?filePath='+fpth);
                    }
                    var divHtml = pDivMenu(jQuery.parseJSON(result.formDataset.peopleTree));
                    $("#showPeopleRoler").html(divHtml);
                    //console.debug("  Array[] -- :    "+result.formDataset.deptHtml);
                    var dHtml = liHtml(jQuery.parseJSON(result.formDataset.deptHtml));
                    //console.debug("  dHtml -- :    "+dHtml);
                    $("#deptHtml").html(dHtml);
                }
            } else {
                $.layer.alert('浏览器不支持！');
            }
        },
        error: function (result) {
            $.layer.alert('系统异常,请联系管理员');
        }
    });
}

/**
 * 拼装角色都有哪些操作权限
 * @param peopleTree  一个存放该人员的json数组
 * @returns {string}  返回值是一段页面的Html代码
 */
//----------拼装角色都有哪些操作权限-------------
function pDivMenu(peopleTree){
    var divHtml = "";
    for(var n in peopleTree){
        divHtml += "<span  class=\"per-charge\">"+peopleTree[n].name+"</span>";
    }
    return divHtml;
}
/**
 * 员工详情部门 html 拼装
 * @param deptHtml  一个json数组 存放后台处理好的部门信息数据
 * @returns {string}  返回值是一段页面的Html代码
 */
function liHtml(deptHtml){
    var divHtml = "";
    for(var n in deptHtml){
        divHtml += "<li>"+deptHtml[n].toString()+"</li>";
    }
    return divHtml;
}

/**
 * 离职员工初始化列表
 */
function initLevStaffListFrist(){
    var param = {
        pageNo: 1,
        pageSize: 20,
        name:""
    }
    $("#levDeptSearch").val("");//清空无部门查询条件
    initLevStaffList(param);
}

/**
 * Tab = 离职员工; 列表查询  带分页和条件查询; 渲染列表数据
 * @param param
 */
function initLevStaffList(param){
    $.execScript({
        script:"html.staff.levDetStaffList",
        needTrascation:false,
        funName:"findLevDeptStaffInfos",
        form:param,
        success:function(result){
            if (window.sessionStorage) {
                if(result.execStatus)
                {
                    var formDataset = result.formDataset;
                    var datasources = result.datasources;
                    $.binding(datasources);
                    initLevDeptPager(datasources);
                }
            } else {
                $.layer.alert('浏览器不支持！');
            }
        },
        error: function (result) {
            $.layer.alert('系统异常,请联系管理员');
        }
    });
}

/**
 * 初始化离职员工列表页面
 * @param datasources
 */
function initLevDeptPager(datasources) {
    $.each(datasources, function () {
        var datasource = this.dsName;
        var rowcount = this.rowCount;
        if (rowcount) {
            //判断分页组件是否已生成
            var pagination = paginations[datasource];
            var $pagination = $('[datasource=' + datasource + '].page');
            if (pagination) {
                $pagination.pagination('resetPager',rowcount);
            } else {
                var param = {
                    datasource: datasource,
                    name:$("#levDeptSearch").val()
                };
                pagination = $pagination.pagination({
                    amount: rowcount,
                    change: function (index, pageSize) {
                        param.pageNo = index;
                        param.pageSize = pageSize;
                        initLevStaffList(param);
                    }
                });
                paginations[datasource] = pagination;
            }
        }
    });
    initIndex("levUserBase");
}

//---------------------------------------------------------------------------
/**
 * 渲染列表数据
 * @param param
 */
function renderStaffList(param) {
    $.execScript({
        script:"html.staff.staffList",
        needTrascation:false,
        funName:"findStaffInfos",
        form:param,
        success:function(result){
            if (window.sessionStorage) {
                if(result.execStatus)
                {
                    //console.log(result);
                    var formDataset = result.formDataset;
                    var datasources = result.datasources;
                    $.binding(datasources);
                    initPager(datasources);
                }
            } else {
                $.layer.alert('浏览器不支持！');
            }
        },
        error: function (result) {
            $.layer.alert('系统异常,请联系管理员');
        }
    });
}

/**
 * 初始化页面
 * @param datasources
 */
function initPager(datasources) {
    $.each(datasources, function () {
        var datasource = this.dsName;
        var rowcount = this.rowCount;
        if (rowcount) {
            //判断分页组件是否已生成
            var pagination = paginations[datasource];
            var $pagination = $('[datasource=' + datasource + '].page');
            if (pagination) {
                $pagination.pagination('resetPager',rowcount);
            } else {
                var param = {
                    datasource: datasource,
                    name:$(".search-box input").val()
                };
                pagination = $pagination.pagination({
                    amount: rowcount,
                    change: function (index, pageSize) {
                        param.pageNo = index;
                        param.pageSize = pageSize;
                        renderStaffList(param);
                    }
                });
                paginations[datasource] = pagination;
            }
        }
    });
    initIndex("userbase");
}

/**
 * 新增员工
 */
function addStaff(){
    window.location.href="/jsp/staff/staffCreate?token="+sessionStorage.getItem("token");

}

/**
 * 新增部门
 */
function addDep(){
    sessionStorage.setItem("deptname",$("#deptname").val());
    sessionStorage.setItem("dfid", $("#dfid").val());
    window.location.href="/jsp/department/departmentAdd?token="+sessionStorage.getItem("token");
}

/**
 * 初始化页面列表
 * @param datasource
 */
function initIndex(datasource){
    //获取table
    var $table = $('[datasource="'+datasource+'"]');
    //获取分页
    var $pagination = $('[datasource=' + datasource + '].page');
    var pageIndex = $pagination.pagination('option','index');
    var pageSize = $pagination.pagination('option','pageSize');
    var first = (pageIndex-1)*pageSize+1;
    $table.find('[colname="index"]').each(function(index){
        $(this).text(first+index);
    });
}

/**
 * 根据父id获取下面的部门
 * @param parentid
 */
function getDepByPid(parentid){
    $.execScript({
        script:"html.department.department",
        form:{parentid:parentid},
        needTrascation:false,
        funName:"getDepByPid",
        success:function(result){
            if (result.execStatus) {
                var rows = result.datasources[0].rows;
                var depdata='<thead><tr>' +
                    '<th class="table-th-sm-width"><em class="checkbox-table"><input type="checkbox" id="depcheckall" onclick="checkAllStaff(this,\'checkdep\',\'deptlist\')"/></em><span>序号</span></th>' +
                    '<th class="table-th-sm-width"><span>部门编号</span></th> <th class="table-th-md-width"><span>部门名称</span></th>' +
                    '<th class="table-th-sm-width"><span>部门负责人</span></th>' +
                    '</tr></thead>';
                if(rows.length>0){
                    for(var i=0;i<rows.length;i++){
                        depdata+="<tbody onclick='getTrFid(\""+rows[i].fid+"\",this,\"checkdep\",\"deptlist\")'>";
                        depdata+="<tr><td ><em class='checkbox-table'><input type='checkbox'name='checkdep' id='"+rows[i].fid+"'/></em>"+(i+1)+"</td>";
                        depdata+="<td>"+rows[i].code+"</td>";
                        depdata+="<td>"+rows[i].name+"</td>";
                        depdata+="<td>"+rows[i].leader+"</td>";
                        depdata+="</tr></tbody>";
                    }
                }else{
                    depdata+="<td colspan='4' class='align-center'>暂无内容！</td>"
                }
                $("#department").html(depdata);
            }else {
                $.layer.alert(result.errorMsg);
            }
        }
    });
}

/**
 * 根据id获取部门详细信息
 * @param fid
 */
function getDepById(fid){
    $.execScript({
        script:"html.department.department",
        form:{fid:fid},
        needTrascation:false,
        funName:"getDepById",
        success:function(result){
            if (result.execStatus) {
                var rows=result.datasources[0].rows;
                for(var i=0;i<rows.length;i++){
                    var depdata='<div  class="content-item">' +
                        '<span class="item-first">部门名称：</span>' +
                        '<span class="item-second">'+rows[i].name+'</span>' +
                        '<span  class="item-first">部门编号：</span> ' +
                        '<span  class="item-second">'+rows[i].code+'</span> </div> ' +
                        '<div class="content-item"> <span class="item-first">上级部门：</span>' +
                        ' <span class="item-second">'+rows[i].parentname+'</span>' +
                        ' <span  class="item-first">部门负责人：</span> ' +
                        '<span  class="item-second">'+rows[i].leader+'</span> </div>';
                }
                $("#departInfo").html(depdata);
            }else {
                $.layer.alert(result.errorMsg);
            }
        }
    });
}

/**
 * 获取部门选中id
 * @returns {string}
 */
function getDepids(){
    var depids=""
    $("input[name='checkdep']").each(function(){
        if($(this).prop("checked")){
            depids+=$(this).attr("id")+",";
        }
    });
    return depids.substring(0,depids.length-1);
}

/**
 * 编辑部门
 * @param type
 */
function editDep(type) {
    var depids="";
    if(type==2){//列表编辑
      depids=getDepids();
    }else{//单条数据编辑
        depids=$("#dfid").val();
    }
    if (depids != ''){
        if (depids.split(',').length == 1){
            window.location.href="/jsp/department/departmentEdit?token="+sessionStorage.getItem("token");
            sessionStorage.setItem("dfid",depids);

        }else{
            $.layer.alert('不能编辑多条数据');
        }
    }else{
        $.layer.alert('编辑数据不能为空');
    }
}
/**
 * 删除部门
 * @param type
 */
function delDep(type) {
    var deptidarry=[];
    var depids="";
    if(type==2){//列表部门删除
        depids=getChildids(getDepids());
    }else{//单个信息删除
       depids=getChildids($("#dfid").val());
    }
    if (depids != "") {
        if (depids.split(',').length > 0) {
            layer.confirm('确定要删除吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                $.execScript({
                    script: "html.department.department",
                    form: {depids: depids},
                    needTrascation: true,
                    funName: "delDep",
                    success: function (result) {
                        if (result.execStatus) {
                            inittree();//初始化树
                            if(type==2){
                                getDepByPid($("#dfid").val());
                            }else{
                                inittable();
                            }
                            $.layer.alert("删除成功！");
                        } else {
                            $.layer.alert(result.errorMsg);
                        }
                    }
                });
            }, function () {
            });
        }
    } else {
        $.layer.alert('请选择要删除的数据');
    }
}

/**
 * 编辑员工
 * @param checkboxName
 */
function editstaff(checkboxName) {
    var staffids = getStaffids(checkboxName);
    var fid = $("#alongFid").val;
    if (staffids != '') {
        if (staffids.split(',').length == 1) {
            window.location.href = "/jsp/staff/staffEdit?token=" + sessionStorage.getItem("token");
            sessionStorage.setItem("staffid", staffids);
        } else {
            $.layer.alert('不能编辑多条数据');
        }
    }else{
        $.layer.alert('编辑数据不能为空');
    }
}

/**
 * 编辑员工
 */
function editstaffShowMess() {
    var fid = $("#alongFid").val();
    if (fid != '') {
        window.location.href = "/jsp/staff/staffEdit?token=" + sessionStorage.getItem("token");
        sessionStorage.setItem("staffid", fid);
    }else{
        $.layer.alert('编辑数据不能为空');
    }
}

/**
 * 删除员工
 */
function delStaff(){//删除员工
    var staffids="";
    $("input[name='checkstaff']").each(function(){
        if($(this).prop("checked")){//选中的id
            staffids+=$(this).attr("id")+",";
        }});
    staffids=staffids.substring(0,staffids.length-1);
    layer.confirm('确定要删除吗？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        $.execScript({
            script:"html.staff.staffList",
            form:{staffids:staffids},
            needTrascation:true,
            funName:"delStaff",
            success:function(result){
                if (result.execStatus) {
                    $.layer.alert("删除成功！");
                }else {
                    $.layer.alert(result.errorMsg);
                }
            }

        }, function () {
        });

    }, function(){
    });
}

/**
 * 选中部门所有
 * @param obj
 */
function checkAllDep(obj){
    if(obj.checked){
        $("input[name='checkdep']").each(function(){
            $(this).prop("checked",true);
        });
    }else{
        $("input[name='checkdep']").each(function(){
            $(this).prop("checked",false);
        });
    }
}

/**
 * 检查部门是否全部选中
 */
function isCheckDepAll(){
    var input = $("input[name='checkdep']");
    var length=getDepids().split(",").length;
    if(input.length ==length){
        $("#depcheckall").prop("checked",true);
    } else{
        $("#depcheckall").prop("checked",false);
    }
}

/**
 * 部门列表选中一行
 * @param fid
 * @param obj
 */
function getTrFids(fid,obj) {
    $(".deptlist tbody.active").removeClass();
    $(obj).addClass("active");
    $("[class^='deptlist butn butn-primary']").removeClass("disable");
    if(!$(obj).find("input").prop("checked")){
        $(obj).find("input").prop("checked",true);
    }else{
        $(obj).find("input").prop("checked",false);
    }
    var length=getDepids().split(",").length;//获取选中的部门
    if(length>1){//如果选中多条不能编辑
        $("[class^='deptlist butn butn-primary edit']").addClass("disable");
    }
    isCheckDepAll();
}

//-------------------------------js替换部分, 具体还要比对一下方法------------
/**
 * 获取页面都有哪些数据被选中
 * @param checkboxName  是数据源表单的 checkbox的name
 * @returns {string}    一个字符串 以 id='1,2,3,4' 的形式返回的
 */
//获取员工选中id,  checkbox的name值
function getStaffids(checkboxName){
    var staffids="";
    $("input[name='"+checkboxName+"']").each(function(){
        if($(this).prop("checked")){
            staffids+=$(this).attr("id")+",";
        }
    });
    staffids = staffids.substring(0,staffids.length-1);
    return staffids;
}

/**
 *
 * @param fid        userbase的fid
 * @param obj
 * @param tableName  是typt=checkbox  的name="tableName"
 * @param buttonName 是按钮的Class类名;
 */
//buttonName 是按钮的Class类名; tableName  是typt=checkbox  的name="tableName"
function getTrFid(fid,obj,tableName,buttonName) {//员工列表选中一行
    $("."+buttonName+" tbody.active").removeClass();
    $("[fid='" +fid + "']").addClass("active");
    $("[class^='"+buttonName+" butn']").removeClass("disable");
    $("[class^='"+buttonName+" butn']").removeAttr("disabled");//
    if(!$(obj).parent().parent().find("input").prop("checked")){
        $(obj).parent().parent().find("input").prop("checked",true);
    }else{
        $(obj).parent().parent().find("input").prop("checked",false);
    }
    if(!$("input[name='"+tableName+"']").is(':checked')) {
        $("[class^='"+buttonName+"']").addClass("disable");
        $("[class^='"+buttonName+"']").attr("disabled", true);//
    }
    var length=getStaffids(tableName).split(",").length;//获取选中的部门
    if(length>1){//如果选中多条不能编辑
        $("[class^='"+buttonName+" butn butn-primary edit']").addClass("disable");
        $("[class^='"+buttonName+" butn butn-primary edit']").attr("disabled", true);//
    }
    //isCheckStaffAll(tableName,obj);
}

/**
 *
 * @param fid        userbase的fid
 * @param obj
 * @param tableName  是typt=checkbox  的name="tableName"
 * @param buttonName 是按钮的Class类名;
 */
//buttonName 是按钮的Class类名; tableName  是typt=checkbox  的name="tableName"
function checkInput(fid,obj,tableName,buttonName) {//员工列表选中一行
    $("."+buttonName+" tbody.active").removeClass();
    $("[fid='" +fid + "']").addClass("active");
    $("[class^='"+buttonName+" butn']").removeClass("disable");
    $("[class^='"+buttonName+" butn']").removeAttr("disabled");//
    if(!$(obj).find("input").prop("checked")){
        $(obj).find("input").prop("checked",true);
    }else{
        $(obj).find("input").prop("checked",false);
    }
    if(!$("input[name='"+tableName+"']").is(':checked')) {
        $("[class^='"+buttonName+"']").addClass("disable");
        $("[class^='"+buttonName+"']").attr("disabled", true);//
    }
    var length=getStaffids(tableName).split(",").length;//获取选中的部门
    if(length>1){//如果选中多条不能编辑
        $("[class^='"+buttonName+" butn butn-primary edit']").addClass("disable");
        $("[class^='"+buttonName+" butn butn-primary edit']").attr("disabled", true);//
    }
    //isCheckStaffAll(tableName,obj);
}

/**
 *
 * @param tableName typt=checkbox的name
 * @param obj
 */
//检查员工是否全部选中 是typt=checkbox  的id="idName"
function isCheckStaffAll(tableName,obj){
    //var input =   $("input[name='"+tableName+"']");
    //var length=getStaffids(tableName).split(",").length;
    var bool=true;
    $("input[name='"+tableName+"']").each(function(){
        if(this.checked==false){
            bool = false;
        }
    });
    if(bool){
        bool = false;
        $(obj).prev().find("input[type='checkbox']").prop("checked",true);
        console.log($(obj).prev().find("input[type='checkbox']").prop("checked"));
    } else{
        $(obj).prev().find("input[type='checkbox']").prop("checked",false);
    }
}
/**
 *  全选
 * @param obj
 * @param trName
 * @param buttonName  离职复职的按钮name
 */
//选中员工所有行 trName  是typt=checkbox  的name="trName"
function checkAllStaff(obj,trName,buttonName){
    if(obj.checked){
        $("input[name='"+trName+"']").each(function(){
            $(this).prop("checked",true);
        });
        if($("input[name='"+trName+"']").is(':checked')){
            $("[class^='"+buttonName+"']").removeClass("disable");
            $("[class^='"+buttonName+"']").removeAttr("disabled");//
        }
        $("[class*='butn butn-primary edit']").addClass("disable");
        $("[class*='butn butn-primary edit']").attr("disabled", true);//
    }else{
        $("input[name='"+trName+"']").each(function(){
            $(this).prop("checked",false);
        });
        $("[class^='"+buttonName+"']").addClass("disable");
        $("[class^='"+buttonName+"']").attr("disabled", true);//
    }
}

/**
 * 部门插件弹框
 */
function changeDep(){//部门插件弹框
    if($("#depplugin").hasClass("mutil")){//隐藏
        $("#depplugin").hide();
        $("#depplugin").removeClass("mutil");
    }else{//显示
        $("#depplugin").show();
        $("#depplugin").addClass("mutil");

    }

}

/**
 * ajax上传文件
 */
function doSave(){// 先验证文件格式
   var tempFile =$('#fileId').val();
    var  userId=$("#alongFid").val();
    if(tempFile==""){
        $.layer.alert("请选择文件！");
        return;
    }
    if(tempFile.indexOf(".jpg")!=-1||tempFile.indexOf(".jpeg")!=-1||tempFile.indexOf(".jpg")!=-1
            ||tempFile.indexOf(".bmp")!=-1||tempFile.indexOf(".gif")!=-1){

    $.ajaxFileUpload({
        url:'/api/uploadImg?userId='+userId,//用于文件上传的服务器端请求地址
        secureuri:false,//一般设置为false
        fileElementId:'fileId',//文件上传空间的id属性
        dataType: 'text',//返回值类型 一般设置为json
        success: function (result, status)  //服务器成功响应处理函数
        {  result=eval("("+result+")");
            if (result.execStatus) {
                $("#imageFile").attr("src",'/api/readImg?filePath='+result.formDataset.fileTempPath+"\\"+result.formDataset.filename);
            }
            //克隆文件标签
            $("#fileId").replaceWith($("#fileId").clone(true));
            //注册change事件
            $("#fileId").bind("change",function(e){
                doSave();//上传文件
            });

        },
        error: function (data, status, e)//服务器响应失败处理函数
        {$.layer.alert("文件上传失败");}
    });
    }else{
        $.layer.alert("文件类型不正确！");
    }
}

//-------------------------code end-------------------------------