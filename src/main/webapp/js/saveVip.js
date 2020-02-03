layui.use(['jquery','layer','form','laydate'],function () {
    var $ = layui.jquery,
        layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate;

    //身份证是否可用
    var idcardUse = false ;

    //手机号是否可用
    var phoneUse = false;

    //定义当前时间
    var  nowDate;

    //身份证唯一性验证
    $("#idcard").blur(function () {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //只有输入格式正确的身份证号才去查询数据库
        if(reg.test($(this).val())){
            //封装查询条件
            var selJson = {};
            selJson['idcard']=$(this).val();
            checkIdCard(selJson);  //根据身份证号查询记录条数
        }else {
            layer.tips('身份证号格式错误', '#idcard', {tips: [2,'red'], time:3000});
        }
    });
    //手机号唯一性验证
    $("#phone").blur(function () {
        var reg =  /^[1][3,4,5,6,7,8,9][0-9]{9}$/; //只有输入格式正确的手机号才去查询数据库
        if(reg.test($(this).val())){
            //封装查询条件
            var selJson = {};
            selJson['phone']=$(this).val();
            checkPhone(selJson);  //根据身份证号查询记录条数
        }else {
            layer.tips('手机号格式错误', '#phone', {tips: [2,'red'], time:3000});
        }
    });

   //监听select选择
    form.on('select(vipRate)', function(data){
         nowDate=new Date()
         var vipNum =dateReplace(getNowDate(nowDate));
        if (data.value==0.9){
            vipNum+="02";
        }else {
            vipNum+="01";
        }
        $("#vipNum").val(vipNum);
    });

    //监听表单提交
    form.on('submit(demo2)', function(data){
        if (idcardUse&&phoneUse){
            var saveJsonVip= data.field;
            saveJsonVip['createDate']= getNowDate(nowDate);
            saveVip(saveJsonVip);
        }else if (!idcardUse){
            layer.msg("身份证输入错误",{icon:2,time:2000,anim:3});
        } else if(idcardIf&&!phoneIf){
            layer.msg("手机号输入错误",{icon:2,time:2000,anim:6});
        }else {
            layer.msg("身份证和手机号输入均错误",{icon:2,time:2000,anim:6});
        }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });



    /************************自定义方法************************/


    //根据idcard查询
    function checkIdCard(selJson) {
        $.ajax({
            type:'POST',
            url:'vip/getCountBy',
            data:selJson,
            async:false, //允许外部变量取到ajax里面的数据
            success:function (data) {
               if (data==1){
                   idcardUse=false;
                   layer.tips('此身份证号已被注册', '#idcard', {tips: [2,'red'], time:3000});
               }else {
                   idcardUse=true;
                   layer.tips('此身份证号可用', '#idcard', {tips: [2,'green'], time:3000});
               }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }

    //根据phone查询
    function checkPhone(selJson) {
        $.ajax({
            type:'POST',
            url:'vip/getCountBy',
            data:selJson,
            async:false, //允许外部变量取到ajax里面的数据
            success:function (data) {
                if (data==1){
                    phoneUse=false;
                    layer.tips('此手机号已被使用', '#phone', {tips: [2,'red'], time:3000});
                }else {
                    phoneUse=true;
                    layer.tips('此手机号可用', '#phone', {tips: [2,'green'], time:3000});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }

    //添加会员
    function saveVip(saveJsonVip) {
        $.ajax({
            type:'POST',
            url:'vip/saveT',
            data:saveJsonVip,
            async:false, //允许外部变量取到ajax里面的数据
            success:function (data) {
                if (data=="success"){
                    layer.msg("添加成功",{icon:1,time:2000,anim:4});
                    setTimeout("window.location='model/toShowVip'",2000);
                }else {
                    layer.msg("添加失败",{icon:2,time:2000,anim:4});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }



    //获取当前时间字符串     Date()   ---->  yyyy/MM//dd HH:mm:ss 格式的字符串
    function getNowDate(date) {
        var sign1 = "/";
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds ;
        return currentdate;
    }

    //把 2019/01/01 12:12:12  -->  20190101121212
    function dateReplace(date) {
        date = date.replace("/","");
        date = date.replace("/","");
        date = date.replace(" ","");
        date = date.replace(":","");
        date = date.replace(":","");
        return date;
    }


});