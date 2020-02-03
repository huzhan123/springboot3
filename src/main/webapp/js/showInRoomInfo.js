layui.use(['jquery','layer','table','form','laydate'],function () {
    //创建出内置模块的对象
    var $ = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        form = layui.form,
        laydate = layui.laydate;

    var INIobj;  //全局的表格行操作对象

    var currentPage = 1;   //表格当前页

    //执行一个laydate实例
    laydate.render({
        elem: '#endDate', //指定元素
        format: 'yyyy/MM/dd HH:mm:ss',
        value:new Date()
    });

    //表格的方法级渲染
    table.render({
        elem: '#demo'
        ,height: 512
        ,url: 'inRoomInfo/loadPageTByPramas' //数据接口
        ,limit: 3
        ,limits: [2,3,5,8,10,15]
        ,page: true //开启分页
        ,even: true //逐行变色
        ,cols: [[ //表头
            {type:'checkbox'}
            ,{field: 'id', title: 'ID', width:80, align:'center',sort: true}
            ,{field: 'roomNum', title: '房屋号', align:'center',width:100,templet: '<div>{{d.rooms.roomNum}}</div>'}
            ,{field: 'roomPic', title: '封面图',align:'center', width:100, sort: true,templet: '<div><img src="{{d.rooms.roomPic}}"></div>'}
            ,{field: 'roomTypeName', title: '类型',align:'center', width:100,templet: '<div>{{d.rooms.roomType.roomTypeName}}</div>'}
            ,{field: 'roomPrice', title: '价格',align:'center',sort: true, width: 100,templet: '<div>{{d.rooms.roomType.roomPrice}}</div>'}
            ,{field: 'customerName', title: '客人姓名',align:'center', width: 120, sort: true}
            ,{field: 'gender', title: '性别',align:'center', width: 80, sort: true,templet: '#genderTpl'}
            ,{field: 'isVip', title: 'VIP', align:'center',width: 80,templet: '#isVipTpl'}
            ,{field: 'idcard', title: '身份证号',align:'center', width: 235, sort: true}
            ,{field: 'phone', title: '手机号',align:'center', width: 180, sort: true}
            ,{field: 'money', title: '押金',align:'center', width: 100, sort: true}
            ,{field: 'createDate', title: '入住时间',align:'center',sort: true, width: 215, sort: true}
            ,{field: 'outRoomStatus', title: '状态',align:'center', width: 120, sort: true,templet: '#outRoomStatusTpl'}
            ,{fixed: 'right', width:150,  title: '操作',align:'center', toolbar: '#barDemo'}
        ]]
       ,done:function () {  //表格执行加载时的函数回调
            hoverOpenImg();
        }
    });

    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        INIobj = obj;
        if(layEvent === 'detail'){ //查看
            layer.msg("查看"+data.id)
        } else if(layEvent === 'del'){ //删除 (修改订单显示状态)
            layer.confirm('真的删除行么', function(index){
                var updStatus = {};
                updStatus["id"]=data.id;
                updStatus["status"]=0;
               // console.log(data);
               updateStatus(updStatus); // 执行服务器端的操作
                layer.close(index);
            });
        } else if(layEvent === 'edit'){ //退房

            //1.数据回显
            //给表单赋值
            var vipStr = "否";
            if (data.isVip==1){
               vipStr = "是";
                selVipByIdcard(data.idcard)
            }

            form.val("exitInRoomInfoForm", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "roomNum":data.rooms.roomNum // "name": "value"
                ,"customerName": data.customerName
                ,"idcard": data.idcard
                ,"roomPrice": data.rooms.roomType.roomPrice
                ,"createDate": data.createDate
                ,"isVip":vipStr
            });
            //计算入住天数
               //将其他消费和备注清空
              $("#otherPrice").val(0);
              $("#remark").val(" ");
            /*console.log(data.createDate);
            console.log($("#endDate").val());*/
            var startTime = getDateStr(data.createDate);  //格式转化 将目前的时间格式2019/08/06 12:12:08  -->  2019/08/06
            var endTime = getDateStr($("#endDate").val());
             var days = getDays(startTime,endTime);  //得到天数
                if (days==0){
                    days=1;
                }
            $("#days").text(days);
            //计算金额 (先除开其他消费)
            var daysPrice;
            if (data.isVip==1){
                 daysPrice = data.rooms.roomType.roomPrice * days*$("#vipRate").val();
                console.log($("#vipRate").val());
            }else {
                 daysPrice = data.rooms.roomType.roomPrice ;
            }
            $("#zprice").text(daysPrice);
                //给其他消费一个鼠标滑出事件
            var otherPrice;
            var allPrice;
            $("#otherPrice").blur(function () {
                otherPrice = $("#otherPrice").val();
                if (otherPrice>0){
                     allPrice = daysPrice+otherPrice*1;  //*1将字符串转化为int类型 用于计算
                    $("#zprice").text(allPrice);
                }
            });

            //2.弹框
            layer.open({
                type:1,
                title:"退房操作界面",
                area:["800px","700px"],
                shade:0.6,
                content:$("#exitInRoomInfoDiv"),
                anim:4
            });

            //3.退房 ( 房间状态修改 生成订单记录)
            form.on('submit(demo3)', function(INIdata){
               var jsonOrder={};
               var nowDate=getNowDate(new Date());
               jsonOrder["orderNum"]=dateReplace(nowDate)+getRandom(6);
               jsonOrder["orderMoney"]=$("#zprice").text();
                jsonOrder["remark"]=INIdata.field.remark;
                jsonOrder["orderStatus"]=0;
                jsonOrder["iriId"]=data.id;
                jsonOrder["createDate"]=nowDate;
                jsonOrder["flag"]=1;
                //8208,莫容龙城,2019/07/06 08:27:52,2019/07/14 10:23:19,8
                jsonOrder["orderOther"]=INIdata.field.roomNum+","+INIdata.field.customerName+","+INIdata.field.createDate+","+INIdata.field.endDate+","+days;
                //500,88,3600.00
                jsonOrder["orderPrice"]=INIdata.field.roomPrice+","+otherPrice +","+allPrice;
                saveOrders(jsonOrder);
                layer.closeAll();
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
        }
    });




    /***************************自定义方法******************************/
    //表格重新加载
    function fulsh(currentPage){
        table.reload('demo', {
            page: {
                curr: currentPage //重新从第 1 页开始
            }
        });
    }

    //放大图像
    function hoverOpenImg(){
        var img_show = null; // tips提示
        $('td img').hover(function(){
            var img = "<img class='img_msg' src='"+$(this).attr('src')+"' style='width:230px;' />";
            img_show = layer.tips(img, this,{
                tips:[2, 'rgba(41,41,41,.5)']
                ,area: ['260px']
            });
        },function(){
            layer.close(img_show);
        });
        $('td img').attr('style','max-width:70px');
    }

    //修改入住信息显示状态
    function updateStatus(updStatus){
        $.ajax({
            type:"POST",
            url:"inRoomInfo/updByPrimaryKeySelective",
            data:updStatus,
            success:function (data) {
                if (data=="success"){
                    layer.msg("删除成功!",{icon:1,time:2000,anim:3});
                    INIobj.del();
                }else {
                    layer.msg("删除失败!",{icon:2,time:2000,anim:3});
                }
            },
            error:function () {
                layer.msg("服务器异常!",{icon:3,time:2000,anim:3})
            }
        })
    }

        //根据身份证号查询vip
    function selVipByIdcard(idcard){
        $.ajax({
            type:"POST",
            url:"vip/loadTByPramas",
            data:{"idcard":idcard},
            //async:false,   //允许局部变量取到异步加载的数据 (数据不安全)
            success:function (data) {
                //填充
                $("#vipNum").val(data.vipNum);
                $("#vipRate").val(data.vipRate);  //通过隐藏域传递
            },
            error:function () {
                layer.msg("服务器异常!",{icon:3,time:2000,anim:3})
            }
        })
    }
    //添加订单信息
    function saveOrders(jsonOrder){
        $.ajax({
            type:"POST",
            url:"orders/saveT",
            data:jsonOrder,
            //async:false,   //允许局部变量取到异步加载的数据 (数据不安全)
            success:function (data) {
                if (data=="success"){
                    layer.msg("退房成功!",{icon:1,time:2000,anim:3});
                    fulsh(currentPage);
                }else {
                    layer.msg("退房失败!",{icon:2,time:2000,anim:3});
                }
            },
            error:function () {
                layer.msg("服务器异常!",{icon:3,time:2000,anim:3})
            }
        })
    }

    //将目前的时间格式2019/08/06 12:12:08  -->  2019/08/06
    function getDateStr(dateStr) {
        var indexOf = dateStr.indexOf(" ");  //取到" "的下标
        dateStr = dateStr.substring(0,indexOf);  //第1个参数为下标，第2个参数为切割的字符串长度
        return dateStr;
    }

    //计算天数
    function getDays(startDate,endDate){  //2019/09/09   2019/10/10
        var date1Str = startDate.split("/");
        var date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
        var date2Str = endDate.split("/");
        var date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
        var t1 = date1Obj.getTime();
        var t2 = date2Obj.getTime();
        var datetime=1000*60*60*24;
        var minusDays = Math.floor(((t2-t1)/datetime));
        var days = Math.abs(minusDays);
        return minusDays;
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

    //获取随机数
    function getRandom(num) {
        var count = '';   //随机数
        for (var i=0;i<num;i++){
            count += parseInt(Math.random()*10)  //0.123123123...
        }
        return count;
    }
});