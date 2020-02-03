layui.use(['jquery','layer','table','form','laydate'],function () {
    //创建出内置模块的对象
    var $ = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        form = layui.form,
        laydate = layui.laydate;

    var selJsonVip;

    var vipObj;

    //初始化vip
    loadVip(selJsonVip);

    //第一个实例
    function loadVip(selJsonVip){
        table.render({
            elem: '#demo'
            ,height: 312
            ,url: 'vip/loadPageTByPramas' //数据接口
            ,page: true //开启分页
            ,even:true
            ,where:selJsonVip
            ,limit:3
            ,limits:[2,3,5,8,10,15]
            ,cols: [[ //表头
                {type:'checkbox'}
                ,{field: 'id', title: 'ID', width:120, sort: true,align:'center'}
                ,{field: 'vipNum', title: '会员卡号', width:250,align:'center'}
                ,{field: 'customerName', title: '客人姓名', width:160, sort: true,align:'center', edit: 'text'}
                ,{field: 'vipRate', title: '会员类型', width:140,align:'center',templet: '#vipRateTpl'}
                ,{field: 'gender', title: '性别', width:120,align:'center',templet: '#genderTpl'}
                ,{field: 'idcard', title: '身份证号', width: 250,align:'center'}
                ,{field: 'phone', title: '手机号', width: 230, sort: true,align:'center'}
                ,{field: 'createDate', title: '创建时间', width: 260, sort: true,align:'center'}
                ,{fixed: 'right', width:180,  title: '操作',align:'center', toolbar: '#barDemo',align:'center'}
             ]]
        });
    }

    //监听查询表单提交
    form.on('submit(demo1)', function(data){
        selJsonVip = data.field;
        console.log(selJsonVip);
        loadVip(selJsonVip);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        vipObj = obj;
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if(layEvent === 'query'){ //查看
            //do somehing
            layer.msg(data.id+"被查看了。。")
        } else if(layEvent === 'edit'){ //编辑
            //会员用户的信息修改
            //1.数据回显
            $("#phone").val(data.phone);
            var vipTypeStr = '';
            if(data.vipRate==0.8){
                vipTypeStr = '<option value="0.8">超级会员</option><option value="0.9">普通会员</option>'
            }else {
                vipTypeStr = '<option value="0.9">普通会员</option><option value="0.8">超级会员</option>'
            }
            $("#vipRate").html(vipTypeStr);
            form.render('select');
            //2.弹框
            layer.open({
                type:1,
                title:'修改会员信息界面',
                area:['520px','350px'],
                shade:0.5,
                content:$("#updVipDiv"),
                anim:4
            });
            //3.监听提交修改
            form.on('submit(demo3)', function(vipData){
                var updJsonVip = vipData.field;
                updJsonVip['id'] = data.id;
                updVip(updJsonVip);
                layer.closeAll();  //关闭所有弹框
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
        }
    });

    //监听单元格编辑
    table.on('edit(test)', function(obj){
        var value = obj.value //得到修改后的值
            ,data = obj.data //得到所在行所有键值
            ,field = obj.field; //得到字段
        var updJsonVip = {};
        updJsonVip['id'] = data.id;
        updJsonVip[field] = value;
        updJsonVip['phone'] = '';
        updVip(updJsonVip);
    });

    /********************自定义的方法*************************/
    function updVip(updJsonVip) {
        $.ajax({
            type:'POST',
            url:'vip/updByPrimaryKeySelective',
            data:updJsonVip,
            success:function (data) {
                if(data=='success'){
                    layer.msg("修改成功。。",{icon:1,time:2000,anim:4});
                    if(updJsonVip.phone!=''){
                        //同步更新缓存对应的值
                        vipObj.update({
                            phone: updJsonVip.phone
                            ,vipRate: updJsonVip.vipRate
                        });
                    }
                }else {
                    layer.msg("修改失败！！",{icon:2,time:2000,anim:3});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }



});