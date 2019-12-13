package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.CustomTableDao;
import io.renren.modules.sys.entity.CustomTableEntity;
import io.renren.modules.sys.service.CustomTableService;


@Service("customTableService")
public class CustomTableServiceImpl extends ServiceImpl<CustomTableDao, CustomTableEntity> implements CustomTableService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<CustomTableEntity> page = this.page(
                new Query<CustomTableEntity>().getPage(params),
                new QueryWrapper<CustomTableEntity>()
        );

        return new PageUtils(page);
    }

}
