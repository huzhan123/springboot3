package cn.com.huzhan.springboot.controller;

import cn.com.huzhan.springboot.entity.RoomSale;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 *   消费记录控制器
 */
@Controller
@RequestMapping("/roomSale")
public class RoomSaleController extends BaseController<RoomSale> {
    //数据分析
    @RequestMapping("/loadRoomPrice")
    public @ResponseBody
    Map<String, List<Object>> loadRoomPrice(){
        try {
            return roomSaleService.selRoomPrice();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
