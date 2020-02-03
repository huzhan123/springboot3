layui.use(['jquery','layer','form','laydate'],function () {
    var $ = layui.jquery,
        layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate;


    //执行一个laydate实例
    laydate.render({
        elem: '#create_date', //指定元素
        format: 'yyyy/MM/dd HH:mm:ss',  //日期的字符串格式
        value:new Date(),  //显示当前时间
        type:'datetime',  //选则格式（精确到秒）
        min:0  //只能选中当前时间之后的时间
    });

    //添加提交
    form.on('submit(demo1)', function(data){
        var saveJsonINI = data.field;
        if (saveJsonINI.roleId==1) {
            saveJsonINI['isAdmin']="超级管理员";
        }else if (saveJsonINI.roleId==2){
            saveJsonINI['isAdmin']="主管";
        } else {
            saveJsonINI['isAdmin']="前台";
        }
        saveINI(saveJsonINI);  //添加入住信息
        return false;  //阻止页面跳转
    });


/******************自定义方法**************************/

    //添加用户信息
    function saveINI(saveJsonINI){
        $.ajax({
            type:'POST',
            url:'user/saveUser',
            data:saveJsonINI,
            success:function (data) {
                if(data=="success"){
                    layer.msg("用户添加成功",{icon:1,time:2000,anim:4});
                    setTimeout('window.location = "model/toShowUser"',2000);
                }else {
                    layer.msg("用户添加失败！！",{icon:2,time:2000,anim:5});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }
});