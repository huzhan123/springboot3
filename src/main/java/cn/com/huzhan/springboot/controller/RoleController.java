package cn.com.huzhan.springboot.controller;

import cn.com.huzhan.springboot.entity.Roles;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/*
* 角色控制器
* */
@Controller
@RequestMapping("/role")
public class RoleController extends BaseController<Roles> {
}
