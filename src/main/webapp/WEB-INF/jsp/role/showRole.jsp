<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--http://localhost:8080/-->
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<head>
    <!--引用基础路径-->
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>标题</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <!--引入ztree相关css和js文件-->
    <link rel="stylesheet" href="lib/zTree/css/icomoon_styles.css" type="text/css">
    <link rel="stylesheet" href="lib/zTree/css/metroStyle.css" type="text/css">
    <script type="text/javascript" src="lib/zTree/js/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.excheck.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.exedit.js"></script>
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
    <style type="text/css">
        .layui-table td{
            height: 60px;
        }
        .layui-table td img{
            width:60px;
            height: 60px;
        }
    </style>
</head>
<body>
    <div align="center">
        <h1>角色显示界面</h1>
        <table id="demo" lay-filter="test"></table>
    </div>
    <!--权限树形容器-->
    <div id="ztreeDiv" class="content_wrap" style="display: none;">
        <div class="zTreeDemoBackground left">
            <ul id="test1" class="ztree"></ul>
        </div>
    </div>

</body>
    <!--引入自定义的js文件-->
    <script src="js/showRole.js"></script>

    <!--是否可用自定义模板-->
    <script type="text/html" id="statusTpl">
        {{#  if(d.status == 1){ }}
        <font color="blue">可用</font>
        {{#  } else { }}
        <font color="#ffc0cb">不可用</font>
        {{#  } }}
    </script>

    <!--是否显示自定义模板-->
    <script type="text/html" id="flagTpl">
        {{#  if(d.flag == 1){ }}
        <font color="#adff2f">显示</font>
        {{#  } else { }}
        <font color="#1e90ff">不显示</font>
        {{#  } }}
    </script>

<!--工具条-->
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>

</script>
</html>