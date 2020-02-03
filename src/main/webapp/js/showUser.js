layui.use(['table','form'],function () {
    //创建出内置模块的对象(layer不需要显示在js文件中写出,jquery在layui单独使用要写$ = layui.$)
    var $ = layui.$,
        table = layui.table,
        form = layui.form;

    var UserObj;

    table.render({
        elem: '#demo'
        , height: 512
        , url: 'user/loadPageTByPramas' //数据接口
        , limit: 3
        , limits: [2, 3, 5, 8, 10, 15]
        , page: true //开启分页
        , even: true
        , cols: [[ //表头
            {type: 'checkbox'}
            , {field: 'id', title: 'ID', width: 80, align: 'center', sort: true}
            , {field: 'username', title: '用户名', align: 'center', width: 140}
            , {field: 'pwd', title: '密码', align: 'center', width: 380,event: 'setPwd'}
            , {field: 'isAdmin', title: '角色', align: 'center', sort: true, width: 110, sort: true}
            , {field: 'authNames', title: '权限', align: 'center', sort: true, width: 600, sort: true}
            , {field: 'createDate', title: '创建时间', align: 'center', width: 220, sort: true}
            , {field: 'useStatus', title: '是否可用', align: 'center', sort: true, width: 130, sort: true,templet: '#useStatusTpl'}
            , {fixed: 'right', width: 110, title: '操作', align: 'center', toolbar: '#barDemo'}
        ]]
    });

    //监听单元格事件
    table.on('tool(test)', function(obj){
        UserObj = obj;
        var data = obj.data;
        if(obj.event === 'setPwd'){
            layer.prompt({  //弹框
                formType: 2
                ,title: '修改 ID 为 ['+ data.id +'] 的用户密码'
                ,value: data.pwd
            }, function(value, index){
                //这里一般是发送修改的Ajax请求
                updUserPwd(data.id,value);
                layer.close(index);
            });
        }
    });

    function updUserPwd(id,pwd) {
        $.ajax({
            type:'POST',
            url:'user/updUserPwd',
            data:{"id":id,"pwd":pwd},
            success:function (data) {
                if(data!=''){
                    layer.msg("密码修改成功。。",{icon:1,time:2000,anim:4});
                    //同步更新表格和缓存对应的值
                    UserObj.update({
                        pwd: data
                    });
                }else {
                    layer.msg("密码修改失败！！",{icon:2,time:2000,anim:3});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }


});