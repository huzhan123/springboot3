package cn.com.huzhan.springboot.service.impl;

import cn.com.huzhan.springboot.entity.Rooms;
import cn.com.huzhan.springboot.service.RoomService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   房屋的业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoomServiceImpl extends BaseServiceImpl<Rooms> implements RoomService {

}
