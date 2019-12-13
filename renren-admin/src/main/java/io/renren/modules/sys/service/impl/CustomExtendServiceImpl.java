package io.renren.modules.sys.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.modules.sys.dao.CustomExtendDao;
import io.renren.modules.sys.entity.CustomExtendEntity;
import io.renren.modules.sys.service.CustomExtendService;
import org.springframework.stereotype.Service;


@Service("customExtendService")
public class CustomExtendServiceImpl extends ServiceImpl<CustomExtendDao, CustomExtendEntity> implements CustomExtendService {



}
