package cn.com.huzhan.springboot.service;

import cn.com.huzhan.springboot.entity.Authority;
import cn.com.huzhan.springboot.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface AuthService extends BaseService<Authority> {
    //根据登录后获取该用户的菜单权限
    List<Map<String,Object>> findAuthByLogin(User loginUser)throws Exception;

    //根据角色id查询权限
    List<Authority> findAuthByRoleId(@Param("roleId") Integer roleId, @Param("parent") Integer parent)throws Exception;
}
