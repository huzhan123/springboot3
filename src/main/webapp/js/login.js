layui.use(['jquery','layer','form','laydate'],function () {
    var $ = layui.jquery,
        layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate;

    //定义验证码全局变量
    var verifyCodeIf = false;
    //定义用户名或密码全局变量
    var nameOrPwdIf = false;

    var loginMsg =$("#loginMsg").val();
    if (loginMsg!=""){
        layer.msg("你还没有登录哦",{icon:3,time:2000,anim:4});
    }

    //表单验证
    form.verify({
        userName: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length<2||value.length>6) {
                return '用户名长度应在2-6之间';
            }
        },
        pwd: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value<0) {
                return '密码不能为负数';
            }
            if (value.length<6||value.length>12) {
                return '密码长度应在6-12之间';
            }
        }
    });

    //验证码失去焦点事件
    $("#yzm").blur(function () {
        //获取页面的验证码
        verifyCode($(this).val());
    });

    //监听表单提交
    form.on('submit(login)', function(data){
        if (verifyCodeIf){
            var loginJsonUser= data.field;
            loginUser(loginJsonUser);
            if (nameOrPwdIf){
                layer.msg("登陆成功",{icon:1,time:2000,anim:4});
                setTimeout('window.location="auth/toLayout"',2000);
            } else {
                layer.msg("用户名或密码输入错误!",{icon:2,time:2000,anim:6});
            }
        }else {
            layer.msg("验证码输入错误!",{icon:2,time:2000,anim:6});
        }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    /************************自定义方法***********************************/
    //进行验证码验证
    function  verifyCode(yzm) {
        $.ajax({
            type:'POST',
            url:'user/verifyCode',
            data:{"yzm":yzm},
            async:false, //允许外部变量取到ajax里面的数据
            success:function (data) {
                if (data=="success"){
                    verifyCodeIf = true;
                }else {
                    verifyCodeIf=false;
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }

    //进行用户或者用户名验证
    function loginUser(loginJsonUser) {
        $.ajax({
            type:'POST',
            url:'user/login',
            data:loginJsonUser,
            async:false, //允许外部变量取到ajax里面的数据
            success:function (data) {
                if (data=="success"){
                    nameOrPwdIf = true;
                }else {
                    nameOrPwdIf=false;
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }


});