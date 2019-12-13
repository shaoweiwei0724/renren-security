package io.renren.modules.sys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.CustomFieldDao;
import io.renren.modules.sys.entity.CustomFieldEntity;
import io.renren.modules.sys.service.CustomFieldService;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service("customFieldService")
public class CustomFieldServiceImpl extends ServiceImpl<CustomFieldDao, CustomFieldEntity> implements CustomFieldService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<CustomFieldEntity> page = this.page(
                new Query<CustomFieldEntity>().getPage(params),
                new QueryWrapper<CustomFieldEntity>()
        );

        return new PageUtils(page);
    }

}
