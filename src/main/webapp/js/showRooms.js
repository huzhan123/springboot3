layui.use(['jquery','layer','table','form','laydate','upload'],function () {
    //创建出内置模块的对象
    var $ = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        form = layui.form,
        laydate = layui.laydate,
        upload = layui.upload;

    //layer.msg("nice!!")
    //初始化房屋信息
    loadAllRooms();

    //初始化房屋类型信息
    loadAllRoomType();

    //房间号唯一性验证
    var roomNumIf = false;

    //点击事件  添加客房弹框
    $("#saveRoomsUI").click(function () {
        //清空弹框的值
        $("form :input").val(""); //清空form表单
        $("#roomPicId").val("renwu004.jpg");
        $("#demo1").attr("src","img/renwu004.jpg");
        $("#roomNum").removeAttr("disabled");
        //弹框
        layer.open({
            type:1,
            title:"添加客房",
            area:["500px","670px"],
            shade:0.6,
            content:$("#saveRoomsDiv"),
            anim:4
        });
    });


    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1'  //绑定上传按钮
        ,url: 'rooms/uploadPic'
        ,field:'myFile'  //设定文件域的字段名
        ,before: function(obj){  //上传之前函数回调
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){  //底层为jQuery的操作
                //result 选中图片的绝对访问路径
                $('#demo1').attr('src', result); //图片链接（base64） //更改图片显示路径(无论上传成功与否都会更改)
            });
        }
        ,done: function(res){  //上传操作的函数回调  res:表示上传后返回的map集合
            //如果上传失败
            if(res.code == 0){
                //将上传后的新文件名字加入添加房屋的from表单的隐藏域中
                $("#roomPicId").val(res.newFileName);
                return layer.msg('上传成功');
            }else {
                return layer.msg('上传失败');
            }
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });

    //房间号失去焦点事件 验证唯一性
    $("#roomNum").blur(function () {
        checkRoomNum($(this).val());
    });

    //监听表单提交
    form.on('submit(demo3)', function(data){
        if (roomNumIf) {
            var saveJson = data.field;
            saveJson['roomStatus'] = "0";
            saveJson['flag'] = 1;
            saveRooms(saveJson); //添加房屋
            layer.closeAll();
        }else {
            layer.msg("房间号输入错误!",{icon:2,time:2000,anim:6});
        }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });


    //点击事件  删除客房(修改flag 隐藏)
    $("ul").on('click','button',function () {
        var value = $(this).val();
        var id = $(this).attr("roomid");
       /* console.log(value);
        console.log(id);*/
        if (value=="del"){ //执行删除操作
            //layer.msg("点击执行删除操作")
            layer.confirm('真的删除行么', function(index){
                var updFlag = {};
                updFlag["id"]=id;
                updFlag["flag"]=0;
                updateRooms(updFlag,value); // 执行服务器端的操作
                layer.close(index);
            });

        } else if (value=="upd") {  //执行修改操作 房间号不可修改 图片房间类型可变
            //layer.msg("点击执行修改操作")
     //1.数据回显
            var arrRooms = $(this).attr("roomsStr").split(",");
           console.log(arrRooms);
            form.val("updRooms", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "roomPic":arrRooms[2]
                ,"roomNum": arrRooms[1]
            });
            $("#demo1").attr("src",arrRooms[2]); //图片回显
            $("#roomNum").attr("disabled","disabled");
            $("#roomType").replaceWith('<option value="'+arrRooms[3]+'" id="roomType" selected>'+arrRooms[4]+'</option>');
            form.render("select");
     //2.弹窗
            layer.open({
                type:1,
                title:"修改客房信息",
                area:["500px","670px"],
                shade:0.6,
                content:$("#saveRoomsDiv"),
                anim:4
            });
    //3.提交修改
            form.on('submit(demo3)', function(data){
                var jsonRooms=data.field;
                delete jsonRooms['roomNum'];  //删除json数据中的某一个属性值(不需要房间号)
                jsonRooms["id"] = arrRooms[0];
                updateRooms(jsonRooms,value);
                layer.closeAll();
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });

        }else if (value=="edit") {
           // layer.msg("点击执行空闲操作")
            layer.confirm('真的将此房间改为空闲么', function(index) {
                var updRoomStatus = {};
                updRoomStatus["id"] = id;
                updRoomStatus["roomStatus"] = 0;
                updateRooms(updRoomStatus,value); // 执行服务器端的操作
                layer.close(index);
            });
        }
    });

    /*=========================自定义的方法=============================*/
   //查询所有房间
    function loadAllRooms() {
        $.ajax({
            type:'POST',
            url:'rooms/loadAllT',
            dataType:"JSON",
            success:function (data) {
               //console.log(data)
                var roomStatus0="";
                var roomStatus1="";
                var roomStatus2="";
                var arrUl=$("ul"); //标签选择器获取页面所有的ul标签对象
                $.each(data,function (i,item) {
                    if(item.roomStatus=='0'){
                        var roomsStr = item.id+","+item.roomNum+","+item.roomPic+","+item.roomType.id+","+item.roomType.roomTypeName;
                        roomStatus0 += '<li style="background-color: greenyellow;">';
                        roomStatus0 += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus0 += '<div class="code">';
                        roomStatus0 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus0 += '<button type="button" value="del"  roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus0 += '<button type="button" value="upd"  roomsStr="'+roomsStr+'" class="layui-btn layui-btn-warm layui-btn-xs">修改</button>';
                        roomStatus0 += '</div>';
                        roomStatus0 += '</li>';
                    }else if(item.roomStatus=='1'){
                        roomStatus1 += '<li style="background-color: red;">';
                        roomStatus1 += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus1 += '<div class="code">';
                        roomStatus1 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus1 += '</div>';
                        roomStatus1 += '</li>';
                    }else {
                        roomStatus2 += '<li style="background-color: deepskyblue;">';
                        roomStatus2 += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus2 += '<div class="code">';
                        roomStatus2 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus2 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus2 += '<button type="button" value="edit" roomid="'+item.id+'" class="layui-btn layui-btn-xs layui-btn-normal">空闲</button>';
                        roomStatus2 += '</div>';
                        roomStatus2 += '</li>';
                    }
                });
                //填充
                $(arrUl[0]).html(roomStatus0);
                $(arrUl[1]).html(roomStatus1);
                $(arrUl[2]).html(roomStatus2);
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }

    //查询所有的房间类型
    function loadAllRoomType() {
        $.ajax({
            type:"POST",
            url:"roomType/loadAllT",
            data:"JSON",
            success:function (data) {
               // console.log(data);
                var roomTypeStr = "<option value='' id='roomType' selected>--请选择房屋类型--</option>";
                $.each(data,function (i,item) {
                    roomTypeStr += '<option value="'+item.id+'">'+item.roomTypeName+'</option>'
                });
                $("#selRoomType").html(roomTypeStr);
                form.render("select"); //渲染刷新下拉框
            },
            error:function () {
                layer.msg("服务器异常!",{icon:3,time:2000,anim:3})
            }
        })
    }

    //房间号唯一性验证
    function checkRoomNum(roomNum) {
        $.ajax({
            type:'POST',
            url:'rooms/getCountBy',
            data:{"roomNum":roomNum},
            async:false, //允许外部变量取到ajax里面的数据
            success:function (data) {
                if (data==1){
                    roomNumIf=false;
                    layer.tips('此房间号已被使用', '#roomNum', {tips: [2,'red'], time:3000});
                }else {
                    roomNumIf=true;
                    layer.tips('此房间号可用', '#roomNum', {tips: [2,'green'], time:3000});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }

    //添加房屋
    function saveRooms(saveJson) {
        $.ajax({
            type:'POST',
            url:'rooms/saveT',
            data:saveJson,
            success:function (data) {
                if (data=="success"){
                    layer.msg("房屋添加成功",{icon:1,time:2000,anim:3});
                    loadAllRooms(); //重新加载
                }else {
                    layer.msg("房屋添加失败",{icon:2,time:2000,anim:3});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }


    //修改
    function updateRooms(JsonRooms,value) {
        $.ajax({
            type:'POST',
            url:'rooms/updByPrimaryKeySelective',
            data:JsonRooms,
            success:function (data) {
                if(data=="success"){
                    if(value=='del'){
                        layer.msg("房屋删除成功。。",{icon:1,time:2000,anim:3});
                    }else if(value=='edit'){
                        layer.msg("房屋空闲修改成功。。",{icon:1,time:2000,anim:4});
                    }else {
                        layer.msg("房屋信息修改成功。。",{icon:1,time:2000,anim:4});
                    }
                    loadAllRooms();  //重新加载房屋信息
                }else {
                    if(value=='del'){
                        layer.msg("房屋删除失败！！",{icon:2,time:2000,anim:3});
                    }else if(value=='edit'){
                        layer.msg("房屋空闲修改失败！！",{icon:1,time:2000,anim:4});
                    }else {
                        layer.msg("房屋信息修改失败！！",{icon:1,time:2000,anim:4});
                    }
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        });
    }

});