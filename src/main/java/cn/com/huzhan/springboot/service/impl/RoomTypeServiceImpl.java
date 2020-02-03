package cn.com.huzhan.springboot.service.impl;

import cn.com.huzhan.springboot.entity.RoomType;
import cn.com.huzhan.springboot.service.RoomTypeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/*
* 房屋类型实现类
* */
@Service
@Transactional(readOnly = false)
public class RoomTypeServiceImpl extends BaseServiceImpl<RoomType> implements RoomTypeService {
}
