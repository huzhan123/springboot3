package cn.com.huzhan.springboot.service.impl;

import cn.com.huzhan.springboot.entity.RoomSale;
import cn.com.huzhan.springboot.service.RoomSaleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *   消费记录业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoomSaleServiceImpl extends BaseServiceImpl<RoomSale> implements RoomSaleService {
    @Override
    public Map<String, List<Object>> selRoomPrice() throws Exception {
        List<Map<String, Object>> mapList = roomSaleMapper.selectMoney();

        //房间编号的List集合
        List<Object> roomNumList = new ArrayList<>();
        //房间销售金额List集合
        List<Object> roomPriceList = new ArrayList<>();
        //循环mapList集合 赋值
        for (Map<String, Object> map:mapList) {
            roomNumList.add(map.get("room_num"));
            roomPriceList.add(map.get("saleprices"));
            System.out.println(map.toString());
        }
        //创建响应的map集合 ,并且装入数据
        Map<String, List<Object>> map = new HashMap<>();
        map.put("roomNumList",roomNumList);
        map.put("roomPriceList",roomPriceList);
        return map;
    }
}
