package cn.com.huzhan.springboot.service;

import cn.com.huzhan.springboot.entity.Orders;

/**
 *   订单业务层接口
 */
public interface OrdersService extends BaseService<Orders> {

    //支付完成后操作
    String payAfter(Orders orders)throws Exception;
}
