package cn.com.huzhan.springboot.service.impl;

import cn.com.huzhan.springboot.entity.Authority;
import cn.com.huzhan.springboot.entity.User;
import cn.com.huzhan.springboot.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/*
* 用户业务实现类
* */
@Service
@Transactional(readOnly = false)
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {
    //重写用户分页方法
    @Override
    public Map<String, Object> findPageTByPramas(Integer page, Integer limit, User user) throws Exception {
        Map<String, Object> map =  super.findPageTByPramas(page, limit, user);
        //取出数据集合
        List<User> users =(List<User>) map.get("data");
        //对角色集合进行遍历 ,分别获取其一级权限
        for (User u:users) {
            List<Authority> authorities = authorityMapper.selAuthRoleAndParent(u.getRoleId(), 0);
            String authNames = "";
            for (Authority auth:authorities) {
                /*循环该角色拥有的权限  拼接字符串*/
                authNames+=auth.getAuthorityName()+",";
            }
            authNames = authNames.substring(0,authNames.length()-1);
            u.setAuthNames(authNames);
        }
        return map;

    }
}
