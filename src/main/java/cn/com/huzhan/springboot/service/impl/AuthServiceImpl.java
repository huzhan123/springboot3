package cn.com.huzhan.springboot.service.impl;

import cn.com.huzhan.springboot.entity.Authority;
import cn.com.huzhan.springboot.entity.User;
import cn.com.huzhan.springboot.service.AuthService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = false)
public class AuthServiceImpl extends BaseServiceImpl<Authority> implements AuthService {
    //根据角色id和parent查询角色权限
    @Override
    public List<Map<String,Object>> findAuthByLogin(User loginUser) throws Exception {
        //新建一个一级权限一级其包含的二级权限List集合
        List<Map<String,Object>> listMap = new ArrayList<>();
        //查询出该用户拥有的一级权限
        List<Authority> firstAuths = authorityMapper.selAuthRoleAndParent(loginUser.getRoleId(),0);
        //循环得到一级权限和二级权限的map集合
        for (Authority firstAuth:firstAuths) {
             Map<String,Object> dataMap = new HashMap<>();
             dataMap.put("authName",firstAuth.getAuthorityName()); //装一级权限的名字
             dataMap.put("authId",firstAuth.getId()); //装一级权限的id
             //查出该一级权限所拥有的二级权限
            List<Authority> secAuths = authorityMapper.selAuthRoleAndParent(loginUser.getRoleId(), firstAuth.getId());
            dataMap.put("secAuths",secAuths); //装二级权限装入map中
            //将构建的dataMap装入到listMap集合中
            listMap.add(dataMap);
        }
        return listMap;
    }

    @Override
    public List<Authority> findAuthByRoleId(Integer roleId, Integer parent) throws Exception {
        return authorityMapper.selAuthRoleAndParent(roleId,parent);
    }
}
