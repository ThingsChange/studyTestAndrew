<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html;charset=UTF-8" %>
<script type="text/javascript" src="${ctxStatic}/js/right-nav.js"></script>
<script src="${ctxStatic}/jquery.nicescroll/jquery.nicescroll.min.js"></script>
<link rel="stylesheet" href="${ctxStatic}/css/right-nav.css"/>





<!-- 右侧导航 S -->
<!-- 导航 S -->
<div id="right">

    <div id="right-nav" >
        <div id="nav-content">
			<span id="group-inquiry">
				<span class="right-icon"></span>
				<span>询团
                    <span id="right-nav-hover">

                        <ul>
                            <span></span>
                            <li class="inquiry-pop"><i></i>我要询团</li>
                            <li class="inquiry-show-records" onclick="show()"><i></i>询团记录</li>
                        </ul>

                    </span>
                </span>
			</span>
            <a href="#" id="auth">
                <span class="right-icon"></span>
                <span>认证</span>
            </a>
        </div>
        <div class="to-top right-icon"></div>
    </div>
    <!-- 导航 E -->
    <!-- 询团记录 S -->
    <div id="inquiry-records">
        <div id="records-top">询团记录<span class="right-icon" onclick="rightClose()"></span></div>
        <div id="records-list">
            <div id="add-more"  onclick="rightReadRecords(10)">加载更多</div>
        </div>
    </div>
    <!-- 询团记录 E -->
</div>
