layui.use(['jquery','layer','table','form','laydate'],function () {
    //创建出内置模块的对象
    var $ = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        form = layui.form,
        laydate = layui.laydate;

    var currentPage = 1;  //当前页

    var selJsonOrders = {};  //查询的条件O

    var ordObj;   //表格的当前行操作对象

    //初始化
    loadOrders(selJsonOrders);

    //时间范围选择
    laydate.render({
        elem: '#test3'
        ,format: 'yyyy/MM/dd HH:mm:ss'  //springMVC框架默认识别此种格式的字符串为日期
        ,type: 'datetime'  //时间格式类型，精确到秒
        ,range: true //或 range: '~' 来自定义分割字符
    });

    //表格的方法级渲染
    function loadOrders(selJsonOrders){
        table.render({
            elem: '#demo'
            ,height: 512
            ,url: 'orders/loadPageTByPramas' //数据接口
            ,where:selJsonOrders
            ,limit: 3
            ,limits: [2,3,5,8,10,15]
            ,page: true //开启分页
            ,even: true
            ,cols: [[ //表头
                {type:'checkbox'}
                ,{field: 'id', title: 'ID', width:80, align:'center',sort: true}
                ,{field: 'orderNum', title: '订单编号', align:'center',width:250}
                ,{field: 'customerName', title: '客人姓名',align:'center', width: 120,templet: '<div>{{d.inRoomInfo.customerName}}</div>'}
                ,{field: 'idcard', title: '身份证号',align:'center', width: 230, sort: true,templet: '<div>{{d.inRoomInfo.idcard}}</div>'}
                ,{field: 'isVip', title: 'VIP', align:'center',width: 80,templet: '#isVipTpl'}
                ,{field: 'phone', title: '手机号',align:'center', width: 180, sort: true,templet: '<div>{{d.inRoomInfo.phone}}</div>'}
                ,{field: 'createDate', title: '下单时间',align:'center', width: 220, sort: true}
                ,{field: 'orderMoney', title: '总价',align:'center',sort: true, width: 120, sort: true}
                ,{field: 'remark', title: '备注',align:'center', width: 235}
                ,{field: 'outRoomStatus', title: '状态',align:'center', width: 120,templet: '#orderStatusTpl'}
                ,{fixed: 'right', width:120,  title: '操作',align:'center', toolbar: '#barDemo'}
            ]]
            ,done:function (res, curr, count) {  //表格执行加载时的函数回调
                currentPage = curr;
            }
        });
    }

    //订单查询的表单提交
    form.on('submit(demo1)', function(data){
        selJsonOrders = {};  //每一次提交将之前的查询条件清空
        selJsonOrders['orderNum'] = data.field.orderNum;  //订单编号
        selJsonOrders['orderStatus'] = data.field.orderStatus;  //订单状态
        if(data.field.queryTimes!=""){
            var arrTimes = data.field.queryTimes.split(" - ");  //将查询的时间范围切割成数组
            selJsonOrders['startTime'] = arrTimes[0];  //开始时间
            selJsonOrders['endTime'] = arrTimes[1];   //截止时间
        }
        console.log(selJsonOrders);
        loadOrders(selJsonOrders); //根据条件查询
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //监听工具条
    table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        ordbj = obj;
        if (layEvent === 'alipay') { //支付
            layer.confirm('确定要支付此订单么？', function (index) {
                window.open('orders/toPay?orderNum='+data.orderNum+'&orderMoney='+data.orderMoney);
                layer.close(index);
            });
        } else if (layEvent === 'del') { //删除
            layer.confirm('真的删除此订单信息么？', function (index) {
                //向服务端发送修改订单信息是否显示的状态，改为不显示
                var updOrders = {};
                updOrders['id'] = data.id;
                updOrders['flag'] = 0;
                console.log(updOrders);
                //执行服务器端操作
                updOrdersFlag(updOrders);
                layer.close(index);  //关闭弹框
            });
        }
    });

    //批量删除
    $("#batchBtn").click(function () {
        var checkStatus = table.checkStatus('demo'); //idTest 即为基础参数 id 对应的值
        var data = checkStatus.data;  //选中的所有行的数据
        if(data.length!=0){
            //判断所选中的订单有没有未支付，不能让其删除
            var delBatchIf = true;
            var ids = "";
            for (var i=0;i<data.length;i++){
                if(data[i].orderStatus==0){
                    delBatchIf = false;
                    ids = "";
                    break;
                }else {
                    ids += data[i].id + ",";
                }
            }
            if(delBatchIf){
                layer.confirm('真的删除选中的订单信息么？', function (index) {
                    ids = ids.substring(0, ids.length - 1);
                    delBatchOrders(ids);
                    layer.close(index);  //关闭弹框
                });
            }else {
                layer.msg("选中订单有未结算的不能删除！！",{icon:7,time:2000,shade:0.5,anim:6});
            }
        }else {
            layer.msg("还未选中要删除的数据！！",{icon:3,time:2000,shade:0.5,anim:6});
        }
    });

    /******************************自定义的方法************************/

    //表格重写加载，用于批量删除刷新当前页
    function flush(currentPage){
        table.reload('demo', {  //为数据表格的id
      //      where: selJsonOrders//查询的条件，不建议使用
            page: {
                curr: currentPage //重新从第几页开始
            }
        });
    }

    //修改订单显示的状态(删除)
    function updOrdersFlag(updOrders) {
        $.ajax({
            type:'POST',
            url:'orders/updByPrimaryKeySelective',
            data:updOrders,
            success:function (data) {
                if(data=='success'){
                    layer.msg("删除成功。。",{icon:1,time:2000,anim:4});
                    ordbj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                }else {
                    layer.msg("删除失败！！",{icon:2,time:2000,anim:3});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }

    //批量删除订单数据
    function delBatchOrders(ids) {
        $.ajax({
            type:'POST',
            url:'orders/updBatchByPrimaryKeySelective',
            data:{"ids":ids,"flag":0},
            success:function (data) {
                if(data=='success'){
                    layer.msg("批量删除订单数据成功。。",{icon:1,time:2000,anim:4});
                    flush(currentPage); //刷新当前页
                }else {
                    layer.msg("批量删除订单数据失败！！",{icon:2,time:2000,anim:3});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }

});