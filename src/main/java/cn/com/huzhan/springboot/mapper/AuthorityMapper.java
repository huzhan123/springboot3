package cn.com.huzhan.springboot.mapper;

import cn.com.huzhan.springboot.entity.Authority;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 *   权限Mapper代理对象
 */
public interface AuthorityMapper extends BaseMapper<Authority>{
    //根据角色id和parent查询角色权限
    List<Authority> selAuthRoleAndParent(@Param("roleId") Integer roleId, @Param("parent") Integer parent)throws Exception;
}