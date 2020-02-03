package cn.com.huzhan.springboot.service.impl;

import cn.com.huzhan.springboot.entity.InRoomInfo;
import cn.com.huzhan.springboot.entity.Orders;
import cn.com.huzhan.springboot.entity.RoomSale;
import cn.com.huzhan.springboot.entity.Rooms;
import cn.com.huzhan.springboot.service.OrdersService;
import cn.com.huzhan.springboot.utils.DateUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *    订单业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class OrdersServiceImpl extends BaseServiceImpl<Orders> implements OrdersService {

    //重写订单添加的方法（控制在一个事物中）
    @Override
    public String saveT(Orders orders) throws Exception {
        //1.完成入住信息的修改（根据主键动态修改）
        //新建一个入住信息对象
        InRoomInfo inRoomInfo = new InRoomInfo();
        inRoomInfo.setId(orders.getIriId());
        inRoomInfo.setOutRoomStatus("1");
        int updINI = inRoomInfoMapper.updateByPrimaryKeySelective(inRoomInfo);
      //  int i = 1/0;  //报运行时异常：除数不为0
        //2.完成订单数据的添加
        int insOrd = baseMapper.insert(orders);
        //3.房屋状态修改  已入住--->打扫
        InRoomInfo inRoomInfo1 = inRoomInfoMapper.selectByPrimaryKey(orders.getIriId());
        Rooms rooms = new Rooms();
        rooms.setId(inRoomInfo1.getRoomId());
        rooms.setRoomStatus("2");
        Integer updRooms = roomsMapper.updateByPrimaryKeySelective(rooms);
        if(updINI>0&&insOrd>0&&updRooms>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /** 支付完成后的操作
     *   重写订单动态修改的方法
     *  1.订单状态的修改
     *  2.生成消费记录
     */
    @Override
    public String payAfter(Orders orders) throws Exception {
        //根据条件查询订单数据
        Orders orders1 = baseMapper.selectTByPramas(orders);
        //设置订单状态
        orders1.setOrderStatus("1");
        //完成订单状态的修改
        int updOrdersStatus = baseMapper.updateByPrimaryKeySelective(orders1);
        //添加消费记录
        RoomSale roomSale = new RoomSale();
        //得到相关数据  8201,独角大仙,2019/07/12 08:27:28,2019/07/14 10:14:41,2
        String[] orderOthers = orders1.getOrderOther().split(",");
        //140,90,252.00
        String[] orderPrices = orders1.getOrderPrice().split(",");
        //设置消费记录对象的相关属性值
        roomSale.setRoomNum(orderOthers[0]);
        roomSale.setCustomerName(orderOthers[1]);
        roomSale.setStartDate(DateUtil.stringToDate(orderOthers[2]));
        roomSale.setEndDate(DateUtil.stringToDate(orderOthers[3]));
        roomSale.setDays(Integer.valueOf(orderOthers[4]));
        roomSale.setRoomPrice(Double.valueOf(orderPrices[0]));
        roomSale.setOtherPrice(Double.valueOf(orderPrices[1]));
        roomSale.setRentPrice(Double.valueOf(orderPrices[2]));
        roomSale.setSalePrice(roomSale.getRentPrice()+roomSale.getOtherPrice());
        roomSale.setDiscountPrice(roomSale.getRoomPrice()*roomSale.getDays()-roomSale.getRentPrice());
        int insRoomSale = roomSaleMapper.insert(roomSale);
        if(updOrdersStatus>0&&insRoomSale>0){
            return "success";
        }else {
            return "fail";
        }
    }
}
