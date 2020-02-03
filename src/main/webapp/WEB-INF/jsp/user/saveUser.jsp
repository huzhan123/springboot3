<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<head>
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>入住信息添加页面</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>
<blockquote class="layui-elem-quote">用户信息的添加</blockquote>
    <form class="layui-form" action="" lay-filter="example">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">用户名</label>
                <div class="layui-input-inline">
                    <input type="text" id="username" name="username" lay-verify="required" placeholder="请输入用户姓名" autocomplete="off" class="layui-input">
                </div>
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">密码</label>
            <div class="layui-input-inline">
                <input type="password" name="pwd" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux">密码不少于6位数哦</div>
        </div>

        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">选择角色</label>
                <div class="layui-input-block" id="userDiv">
                    <input type="radio" name="roleId" value="1" title="超级管理员" checked="checked"lay-filter="userRole"/>
                    <input type="radio" name="roleId" value="2" title="主管"lay-filter="userRole"/>
                    <input type="radio" name="roleId" value="3" title="前台"lay-filter="userRole"/>
                </div>
            </div>
        </div>

        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">创建时间</label>
                <div class="layui-input-inline">
                    <input type="text" name="createDate" id="create_date" lay-verify="required" placeholder="yyyy/MM/dd HH:mm:ss" autocomplete="off" class="layui-input">
                </div>
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">是否可用</label>
            <div class="layui-input-block">
                <input type="radio" name="useStatus" value="1" title="可用" checked="checked" lay-filter="useStatus"/>
                <input type="radio" name="useStatus" value="0" title="不可用" lay-filter="useStatus"/>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit="" lay-filter="demo1">添加</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
  </form>
</body>
<script src="js/saveUser.js"></script>
</html>