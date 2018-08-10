var $investorId;
var $fundId;
var $fileId;

$(function(){
    getMenuData();
    layui.use('layer', function(){
        layer = layui.layer;
    });
    $fundId = GetQueryString('fundId');
    $fileId = GetQueryString('fileId');
    $status = GetQueryString('status');
    $userInfo = GetQueryString('userInfo');
    if($userInfo){
        $('.userInfoUse').hide();
        $('#signStatus_div').hide();
    }else{
        var fundInfoUrl = '/fund/fundInfo.do';
        initAjaxData(fundInfoUrl, {id:$fundId}, true, initFundInfoData);
    }
    $status?$('.wjqs_wc').hide():null;
    $investorId = GetQueryString('investorId');
    var fileInfoUrl = '/fund/fileInfo.do';
    initAjaxData(fileInfoUrl, {fileId:$fileId}, true, initFileInfoData);
    
    if($investorId){
        initAjaxData('/fund/investorInfo.do', {investorId:$investorId,fundId:$fundId}, true, initInvestorInfoData);
    }else{
        $('#investorNameSpan').remove();
        $('#managerNameSpan').remove();
    }
    var imgCarouselUrl = '/contract/fileView.do' ;
    initAjaxData(imgCarouselUrl, {fileId:$fileId}, true, initImgCarouselUrl);

});

function initImgCarouselUrl(ret){
    console.debug('initImgCarouselUrl');
    console.debug(ret);
    if(ret.code == '0000'){
        var html = '';

        var _imageIDs = ret.data.imageID;
        var _length = ret.data.imageID.length;
        var _page =1;
        var html = '';
        html += '<img  draggable="false" id="fileImageSrc' + (_page) + '" pageNo="' + (_page) + '" imgId="' + _imageIDs[_page - 1] + '" src="/file/pdfImg.do?imgID=' + _imageIDs[_page - 1] + '" />'
        // $.each(ret.data.imageID, function (i, imageId) {
        //     html += '<img  draggable="false" id="fileImageSrc' + (i + 1) + '" pageNo="' + (i + 1) + '" imgId="' + imageId + '" src="/file/pdfImg.do?imgID=' + imageId + '" />'
        // });
        $('#img_div').html(html);
        $('#img_div').height(1046);

        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage,
                layer = layui.layer;
            laypage.render({
                elem: 'img_page',
                count: _length,
                curr: _page,
                layout: ['count', 'prev', 'page', 'next', 'skip'],
                limit: 1,
                jump: function (obj, first) {
                    if (!first) {
                        // obj.currSearchHotTag("2")
                        var _imageId = _imageIDs[obj.curr - 1];
                        html = '<img  draggable="false" id="fileImageSrc' + (obj.curr) + '" pageNo="' + (obj.curr) + '" imgId="' + _imageId + '" src="/file/pdfImg.do?imgID=' + _imageId + '" />'
                        // layer.msg('第 ' + obj.curr + ' 页');
                        $('#img_div').html(html);
                    }
                }
            });
        })
    }
}


function initFundInfoData(ret){
//			console.debug('initFundInfoData');
//			console.debug(ret);
    if(ret.code == '0000'){
        if(ret.data.fundName.length > 25){
            $('#fundName').attr('title',ret.data.fundName);
            $('#fundName').text(ret.data.fundName.substr(0,25)+'...');
        }else{
            $('#fundName').text(ret.data.fundName);
        }
        $('#managementOrgName').text(ret.data.managementOrg.name);
        $('#agencyOrgName').text(ret.data.agencyOrg.name);
    }
}

function initFileInfoData(ret){
    //console.log("initFileInfoData",ret);
    if (ret.data.file) {
        var file =  ret.data.file;
        $('#fundName').next().text(file.fileName);
        $('#signStatus_div').prepend(fillSignStatusButton(file.investorSign, 4));
        $('#signStatus_div').prepend(fillSignStatusButton(file.managementAuditorSign, 3));
        $('#signStatus_div').prepend(fillSignStatusButton(file.managementOperatorSign, 2));
        $('#signStatus_div').prepend(fillSignStatusButton(file.trusteeshipAuditorSign, 1,file.fileSignRoles));
        if(file.fileType==7){
            $('#signStatus_div').prepend(fillSignStatusButton(file.managementReviewerSign,7));
        }
    }
}

function fillSignStatusButton(code, type,fileSignRoles) {
    if(code == "-1" && type>1)
        return "";
    var u_type = "",signText="未";
    var classStr = code == '0'? 'class="wjqs_wqsbq"' :"";
    switch (type) {
        case 1:
            u_type = "托管人";
            if(code=="-1"){
                if(fileSignRoles && fileSignRoles.indexOf("AUDIT_TRUSTEESHIP")>=0){
                    signText = "已";
                }else{
                    return "";
                }
            }else{
                signText = code == '0'?"未":"已";
            }
            break;
        case 2:
            u_type = "募集经办人";
            signText = code == '0'?"未":"已";
            break;
        case 3:
            u_type = "管理人";
            signText = code == '0'?"未":"已";
            break;
        case 4:
            u_type = "投资人";
            signText = code == '0'?"未":"已";
            break;
        case 7:
            u_type = "复核人";
            signText = code == '0'?"未":"已";
            break;
    }
    return '<p '+classStr+'><span>'+u_type+'：</span><span>'+signText+'签署</span></p>';

}

function initInvestorInfoData(ret){
    console.debug('initInvestorInfoData');
    console.debug(ret);
    if(ret.code == '0000' && ret.data){
        if(ret.data.handleMangerName){
            $('#managerName').text(ret.data.handleMangerName);
        }else{
            $('#managerNameSpan').remove();
        }
        if(ret.data.investorName){
            $('#investorName').text(ret.data.investorName);
        }else{
            $('#investorNameSpan').remove();
        }
    }
}

function goFileList() {
    if($investorId){
        goto('/static/html/fileList.html?fundId=' + $fundId+'&investorId='+$investorId);
    }else{
        goto('/static/html/fileList.html?fundId=' + $fundId);
    }
}