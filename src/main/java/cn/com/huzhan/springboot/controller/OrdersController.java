package cn.com.huzhan.springboot.controller;

import cn.com.huzhan.springboot.entity.Orders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 *   订单控制器层
 */
@Controller
@RequestMapping("/orders")
public class OrdersController extends BaseController<Orders> {

    //去支付
    @RequestMapping("/toPay")
    public String toPay(String orderNum, Double orderMoney, HttpServletRequest request){
        //带上要支付的订单变号和金额
        request.setAttribute("orderNum",orderNum);
        request.setAttribute("orderMoney",orderMoney);
        return "alipay/ordersPay";
    }

    //支付成功之后的操作
    /**
     *  1.订单状态的修改
     *  2.生成消费记录
     *  3.跳转到平台首页
     */
    @RequestMapping("/2")
    public String myOrdersPay(String out_trade_no){
        Orders orders = new Orders();
        orders.setOrderNum(out_trade_no);
        try {
            ordersService.payAfter(orders);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "redirect:/model/toShowInRoomInfo";
    }



}
