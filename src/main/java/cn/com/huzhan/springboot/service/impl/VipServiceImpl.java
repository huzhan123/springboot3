package cn.com.huzhan.springboot.service.impl;

import cn.com.huzhan.springboot.entity.Vip;
import cn.com.huzhan.springboot.service.VipService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   vip业务层的实现类
 */
@Service
@Transactional(readOnly = false)
public class VipServiceImpl extends BaseServiceImpl<Vip> implements VipService {

}
