package cn.com.huzhan.springboot.service.impl;

import cn.com.huzhan.springboot.entity.Authority;
import cn.com.huzhan.springboot.entity.Roles;
import cn.com.huzhan.springboot.service.RoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/*
* 角色业务层实现类
* */
@Service
@Transactional(readOnly = false)
public class RoleServiceImpl extends BaseServiceImpl<Roles> implements RoleService {

    //重写角色的分页方法
    @Override
    public Map<String, Object> findPageTByPramas(Integer page, Integer limit, Roles roles) throws Exception {
        Map<String, Object> map = super.findPageTByPramas(page, limit, roles);
       //取出数据集合
        List<Roles> rolesList =(List<Roles>) map.get("data");
        //对角色集合进行遍历 ,分别获取其一级权限
        for (Roles role:rolesList) {
            List<Authority> authorities = authorityMapper.selAuthRoleAndParent(role.getId(), 0);
           String authNames = "";
            for (Authority auth:authorities) {
                /*循环该角色拥有的权限  拼接字符串*/
                authNames+=auth.getAuthorityName()+",";
            }
            role.setAuthNames(authNames);
        }
        return map;
    }
}
