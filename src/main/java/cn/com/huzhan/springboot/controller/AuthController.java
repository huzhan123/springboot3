package cn.com.huzhan.springboot.controller;

/*
* 权限控制器
* */

import cn.com.huzhan.springboot.entity.Authority;
import cn.com.huzhan.springboot.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

/*
* 权限控制器
* */
@Controller
@RequestMapping("/auth")
public class AuthController extends BaseController<Authority>{

    @RequestMapping("/toLayout")
    public String toIndex(Model model, HttpSession session){
        //根据登录的用户信息查询出该用户拥有的权限 ,放入到model对象中带进平台首页
        User loginUser =(User)session.getAttribute("loginUser");
        try {
            model.addAttribute("listMap",authService.findAuthByLogin(loginUser));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "layout";
    }

    //根据角色id查询其所拥有的权限
    @RequestMapping("/loadAuthByRoleId")
    public @ResponseBody
    List<Authority>loadAuthByRoleId(Integer roleId){
        try {
            return authService.findAuthByRoleId(roleId,null);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
