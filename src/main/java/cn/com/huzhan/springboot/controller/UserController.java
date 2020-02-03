package cn.com.huzhan.springboot.controller;

import cn.com.huzhan.springboot.entity.User;
import cn.com.huzhan.springboot.utils.MD5;
import cn.com.huzhan.springboot.utils.VerifyCodeUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/*
* 用户控制器
* */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController<User> {
    //获取页面验证码
    @RequestMapping("/getVerifyCode")
    public void getVerifyCode(HttpServletResponse response, HttpSession session) throws Exception {
        //1.产生随机数
        String verifyCode = VerifyCodeUtils.generateVerifyCode(1);
        //2.将产生的随机数转化为小写,存入session中
        session.setAttribute("verifyCode",verifyCode.toLowerCase());
        //3.设置验证码样式
        VerifyCodeUtils.outputImage(200,30,response.getOutputStream(),verifyCode);
    }


    //验证码验证
    @RequestMapping("/verifyCode")
    public @ResponseBody
    String verifyCode(String yzm, HttpSession session){
        //1.将页面输入的验证码转为小写
        String s = yzm.toLowerCase();
        //2.取出session中的验证码
        String verifyCode = (String) session.getAttribute("verifyCode");
        //3.验证
        if (s.equals(verifyCode)){
            return "success";
        }else {
            return "fail";
        }
    }

    //用户名或密码验证
    @RequestMapping("/login")
    public @ResponseBody
    String login(User user, HttpSession session){
        //将用户传来的登陆密码进行MD5加密操作（单向加密的过程），保证用户数据安全
        String pwd = MD5.md5crypt(user.getPwd());//将页面传来的密码进行加密做登陆
        user.setPwd(pwd); //将加密后的密码重新设置到登陆用户对象中
        try {
            User loginUser = baseService.findTByPramas(user);
            if (loginUser!=null){ //登录成功
                session.setAttribute("loginUser",loginUser);
                return "success";
            }else {
                return "fail";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }

    }

    //退出登录
    @RequestMapping("/exit")
    public @ResponseBody
    String exit(HttpSession session){
        try {
            session.removeAttribute("loginUser");
            return "success";
        }catch (Exception e){
            e.printStackTrace();
            return  "fail";
        }
    }

    //修改用户密码
    @RequestMapping("/updUserPwd")
    public @ResponseBody
    String updUserPwd(User user){
        String pwd = MD5.md5crypt(user.getPwd());  //对密码进行加密
        user.setPwd(pwd);
        try {
            if(baseService.updByPrimaryKeySelective(user).equals("success")){
                return pwd;
            }else {
                return "";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    //重写添加用户的方法

    @RequestMapping("/saveUser")
    public @ResponseBody
    String saveUser(User user) {
        String pwd = MD5.md5crypt(user.getPwd());  //对密码进行加密
        user.setPwd(pwd);
        try {
            return baseService.saveT(user);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
}

