/**
 * staffCreate.js主要实现staffCreate.html页面涉及相关功能，例如：
 * 员工信息新增
 * @Copyright:    2016 www.quauq.com Inc. All rights reserved.
 * @Date:            2016年04月20日
 */


//------------------------------Code Begin------------------------------------

//选中的角色
var num=0;
//角色总数
var count=0;
$(document).ready(function(){

    $("#dropdown").click(function(){
        if($(this).hasClass("fa-angle-down")){
            $(this).removeClass("fa-angle-down");
            $(this).addClass("mutil");
            $(".singleselection").hide();
        }else{
            $(this).removeClass("mutil");
            $(this).addClass("fa-angle-down");
            $(".singleselection").show();
        }
    });
    getAllRoles($("#roleshtml"));//页面权限
    //getAllRoles($("#roleslist"));//操作权限
    doValidate();//验证
    addMoreDep();//添加部门行
})

/**
 * 保存部门
 */
function saveStaff(){
    if($("#staff").valid()){
        var sex;
        $("input[name='sex']").each(function(){
            if($(this).prop("checked")){
                sex=$(this).val();
            }
        });
        var param = {
            fid:$.common.guid(),
            gfid:$.common.guid(),//用户角色对应id
            ufid:$.common.guid(),//登录用户id
            fno:$("input[name='fno']").val(),
            name:$("input[name='name']").val(),
            sex:sex,
            phone:$("input[name='phone']").val(),
            mobile:$("input[name='mobile']").val(),
            email:$("input[name='email']").val(),
            birthday:$("input[name='birthday']").val(),
            deptusers:getDepArry(),//获取所有部门对象
            groupArry:getGroupArry(),//获取所有角色对象
            account:$("input[name='username']").val(),
            password:$("input[name='password']").val()
        }
        $.execScript({
            script:"html.staff.staffAdd",
            form:param,
            needTrascation:true,
            funName:"addStaff",
            success:function(result){
                if (result.execStatus) {
                    window.location.href="/jsp/staff/staffList?token="+sessionStorage.getItem("token");
                }else {
                    $.layer.alert(result.errorMsg);
                }
            }
        });
    }

}

/**
 * 表单校验
 * @returns {*|jQuery}
 */
function doValidate(){
    var validate = $('#staff').validate({
        rules:{
            name:'required',
            username:{
                required:true,
                isRepeat:{propName:'username'}
            },
            email:'checkEmail',
            mobile:'checkMobile',
            phone:'checkPhone'
        },
        onfocusout: function(element) { $(element).valid();},
        onsubmit:false,
        focusCleanup:true,
        messages: {
            name:"请输入用户名",
            username:{ required:"请输入用户名！", isRepeat:"用户名已存在！"}
        }
    });
    return validate;

}

/**
 * 添加重复方法校验
 */
jQuery.validator.addMethod("isRepeat", function(value, element,params) {
    var flag = true;
    var propName = params.propName;
    var proValue =$("input[name='"+propName+"']").val();
    params=eval("({"+propName+":'"+proValue+"'})");
    $.execScript({
        script:"html.staff.staffAdd",
        form:params,
        needTrascation:false,
        needasync: false,
        funName:"getAccountByCondition",
        before:function(){

        },
        success:function(result){

            if (result.execStatus) {
                if(result.formDataset.checked == "true")
                {
                    flag = false;//存在 返回"对象名称重复,请重新填写"
                }
            }else {
                $.layer.alert(result.errorMsg);
            }

        }
    });
    return flag;
}, "对象名称重复,请重新填写");

/**
 * 手机号验证
 */
jQuery.validator.addMethod("checkMobile", function(value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));

}, "手机号格式错误!");

/**
 * 验证邮箱
 */
jQuery.validator.addMethod( "checkEmail",function(value,element){

    var myreg = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/;

    if(value !=''){if(!myreg.test(value)){return false;}};

    return true;

} ,  "邮箱格式错误！");

/**
 * 验证固定电话
 */
jQuery.validator.addMethod( "checkPhone",function(value,element){

    var pattern =/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;

    if(value!=''){if(!pattern.exec(value)){return false;}};

    return true;

} ,  "电话格式错误！");

/**
 * 获取所有部门
 */
function getAllDep(){
    var sdatas='<div class="list-item"><div class="group-sel-qc"><div class="simulate-text-container md">' +
        '<input type="text" value="无" name="deptname"/><input type="hidden" value="4" name="deptid"/><em  class="fa fa-angle-down" onclick="dropdownDep(this)"></em>' +
        '<div class="drop-down singleselection  display-none" ><div class="list-sel-text">  <ul>';
    $.execScript({
        script:"html.department.department",
        needTrascation:true,
        funName:"getAllDep",
        success:function(result){
            if (result.execStatus) {
                var rows=result.datasources[0].rows;
                for(var i=0;i<rows.length;i++){
                    sdatas+="<li id='p_"+rows[i].fid+"'>"+rows[i].name+"</li>";
                }
                sdatas+='</ul></div></div></div><div class="simulate-checkbox-container"><label class="native-checkbox">' +
                '<input type="checkbox"  name="leader"/></label><label>设为负责人</label><i class="fa fa-times-circle" onclick="removeDep(this)"></i> </div> </div></div>';
                $(sdatas).appendTo(".list-item-container");
                /* $(".list-sel-text ul li").each(function(){
                 $(this).click(function(){
                 $("input[name='parentname']").val($(this).html());
                 $("input[name='parentid']").val($(this).attr("id").split("_")[1]);
                 $(".singleselection").hide();
                 $("#dropdown").removeClass("fa-angle-down");
                 $("#dropdown").addClass("mutil");
                 })
                 })*/
            }else {
                $.layer.alert(result.errorMsg);
            }
        }
    });
}

/**
 * 获取所有角色对象
 * @returns {Array}
 */
function getGroupArry(){
    var groupArry=[];
    $("#roleshtmlpanel li").each(function(){
        groupArry.push({'gfid':$.common.guid(),'groupid':$(this).attr('id').split('_')[1]});
    });
    return groupArry;
}

/**
 * 获取所有的部门对象
 * @returns {Array}返回数组
 */
function getDepArry(){
    var deptArry=[];
    $("input[name='leader']").each(function(){
        var deptid=$(this).parent().parent().prev().find("input[name='deptid']").val();
        var leader=0;
        if(this.checked){
            leader=1;
        }
        deptArry.push({'dfid':$.common.guid(),'deptid':deptid,'leader':leader});
    });
    return deptArry;
}

/**
 * 添加部门行
 */
function addMoreDep(){
    getAllDep();
}

/**
 * 移除部门行
 * @param obj 当前对象
 */
function removeDep(obj){
    $(obj).parent().parent().parent().remove();
}

/**
 * 菜单下拉折叠
 * @param obj 当前对象
 */
function dropdownDep(obj){
    if($(obj).hasClass("mutil")){
        $(obj).removeClass("mutil");
        $(obj).next().hide();
    }else{
        $(obj).addClass("mutil");
        $(obj).next().show();
    }
}

/**
 * 角色菜单下拉折叠
 * @param obj 当前对象
 */
function dropdownRole(obj){
    if($(obj).hasClass("mutil")){
        $(obj).removeClass("mutil");
        $(obj).parent().next().children(":first-child").hide();
    }else{
        $(obj).addClass("mutil");
        $(obj).parent().next().children(":first-child").show();
    }
}

/**
 * 清空角色
 * @param target 当前对象
 */
function clearRoles(target){
    target.parent().parent().prev().find("ul").empty();
      target.find("input").each(function(){
        this.checked=false;
    });
    target.next().find("input").prop("checked",false);
    if(target.attr("id")=="roleslist"){
        num=0;  target.prev().html("已选"+num+"/"+count);

    }else{
        num1=0;
        target.prev().html("已选"+num1+"/"+count);
    }

}

/**
 * 全选
 * @param obj 当前对象
 * @param target 目标对象
 */
function allCheck(obj,target){
    num=0;
    num1=0;
    target.parent().parent().prev().find("ul").empty();
    var code_Values = target.find("input");
    var contents="";
    var spans="";
    if(obj.checked){
        for (i = 0; i < code_Values.length; i++) {
            if (code_Values[i].type == "checkbox") {
                code_Values[i].checked = true;
                contents=$(code_Values[i]).parent().next().html();
                spans+="<li><input type='hidden' name='"+ code_Values[i].id+"'/>"+contents+"<em onclick='removelable(this,$("+target.attr('id')+"))'></em></li>";
                if(target.attr("id")=="roleslist"){
                    num++;
                }else{
                    num1++;
                }
            }
        }
        target.parent().parent().prev().find("ul").html(spans);
        if(target.attr("id")=="roleslist"){
            target.prev().html("已选"+num+"/"+count);
        }else{
            target.prev().html("已选"+num1+"/"+count);
        }
    }else{
        clearRoles(target);
    }
}

/**
 * 检查是否全选
 * @param target
 */
function checkAll(target){
    var input =  target.find("input");
    var checkInput=  target.find("input:checked");
    if(checkInput.length == input.length){
        target.next().find("input").prop("checked",true);
    } else{
        target.next().find("input").prop("checked",false);
    }
}

/**
 * 获取所有角色
 * @param target
 */
function getAllRoles(target){
    num=0;
    num1=0;
    $.execScript({
        script:"html.staff.staffAdd",
        needTrascation:false,
        funName:"getAllRoles",
        success:function(result){
            if (result.execStatus) {
                var content=""
                var rows=result.datasources[0].rows;
                count=result.datasources[0].rowCount;
                if(rows.length>0) {
                    for (var i = 0; i < rows.length; i++) {
                        content += "<li><label for='' class='simulate-checkbox protogenesis'><input type='checkbox' id='" + rows[i].fid + "'/></label><span>" + rows[i].fname + "</span></li>";
                    }
                    target.prev().html("已选" + 0 + "/" + count);
                    target.html(content);
                    target.find("input").each(function () {
                        $(this).click(function () {
                            selectRole(this, $(this).attr("id"), $(this).parent().next().html(),target);
                        })
                    });
                    target.find("input:first").click();
                }
            }else {
                $.layer.alert(result.errorMsg);
            }
        }
    });
}

/**
 * 选择角色
 * @param obj 当前对象
 * @param fid 选择角色Id
 * @param fname 角色名字
 * @param target 目标对象
 */
function selectRole(obj,fid,fname,target){
    if(obj.checked) {
        target.parent().parent().prev().find("ul").append("<li id=ro_"+fid+">"+fname+"<em onclick='removelable(this,$("+target.attr('id')+"))'></em></li>");
        if(target.attr("id")=="roleslist"){
            num++;
        }else{
            num1++;
        }

    }else{
        target.parent().parent().prev().find("#ro_"+fid).remove();
        if(target.attr("id")=="roleslist"){
            num--;
        }else{
            num1--;
        }


    }
    checkAll(target);//检查选中
    if(target.attr("id")=="roleslist"){
        target.prev().html("已选"+num+"/"+count);
    }else{
        target.prev().html("已选"+num1+"/"+count);
    }

}

/**
 * 关闭标签
 * @param obj 当前对象
 * @param target
 */
function removelable(obj,target){
    $(obj).parent().remove();
    $(target).find("input[id='"+$(obj).parent().attr('id').split('_')[1]+"']").prop("checked",false);
    if(target.attr("id")=="roleslist"){
        num--;
    }else{
        num1--;
    }
    checkAll(target);//检查选中
    if(target.attr("id")=="roleslist"){
        target.prev().html("已选"+num+"/"+count);
    }else{
        target.prev().html("已选"+num1+"/"+count);
    }
}
//------------------------------Code End------------------------------------