package cn.com.huzhan.springboot.service;

import cn.com.huzhan.springboot.entity.RoomSale;

import java.util.List;
import java.util.Map;

/**
 *   消费记录的业务层接口
 */
public interface RoomSaleService extends BaseService<RoomSale> {
 //查询房间销售金额 返回map集合
    Map<String, List<Object>> selRoomPrice()throws Exception;
}
