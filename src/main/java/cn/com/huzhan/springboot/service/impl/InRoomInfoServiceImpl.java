package cn.com.huzhan.springboot.service.impl;

import cn.com.huzhan.springboot.entity.InRoomInfo;
import cn.com.huzhan.springboot.entity.Rooms;
import cn.com.huzhan.springboot.service.InRoomInfoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   房屋入住信息业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class InRoomInfoServiceImpl extends BaseServiceImpl<InRoomInfo> implements InRoomInfoService {

    //重写入住信息添加的业务层方法

    @Override
    public String saveT(InRoomInfo inRoomInfo) throws Exception {
        //完成入住信息添加的同时要求修改选中的房屋状态
        //1.房屋状态修改
        Rooms rooms = new Rooms();
        rooms.setId(inRoomInfo.getRoomId());
        rooms.setRoomStatus("1");  //以入住
        Integer updRooms = roomsMapper.updateByPrimaryKeySelective(rooms);
        //2.完成入住信息添加
        Integer insINI = baseMapper.insert(inRoomInfo);
        if(updRooms>0&&insINI>0){
            return "success";
        }else {
            return "fail";
        }
    }


}
