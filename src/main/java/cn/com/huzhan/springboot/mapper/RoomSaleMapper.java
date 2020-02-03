package cn.com.huzhan.springboot.mapper;

import cn.com.huzhan.springboot.entity.RoomSale;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 *   房屋销售记录Mapper代理对象
 */
public interface RoomSaleMapper extends BaseMapper<RoomSale> {
    //查询房间号及各个房间销售总金额
    @Select("SELECT room_num,SUM(sale_price) as saleprices FROM roomsale GROUP BY room_num")
    List<Map<String,Object>> selectMoney()throws Exception;
}