package cn.com.huzhan.springboot.controller;

import cn.com.huzhan.springboot.entity.RoomType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/*
* 房屋类型控制器
* */
@Controller
@RequestMapping("/roomType")
public class RoomTypeController extends BaseController<RoomType> {
}
