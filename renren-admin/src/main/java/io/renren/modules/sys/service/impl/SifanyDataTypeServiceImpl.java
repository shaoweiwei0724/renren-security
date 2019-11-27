package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyDataTypeDao;
import io.renren.modules.sys.entity.SifanyDataTypeEntity;
import io.renren.modules.sys.service.SifanyDataTypeService;


@Service("sifanyDataTypeService")
public class SifanyDataTypeServiceImpl extends ServiceImpl<SifanyDataTypeDao, SifanyDataTypeEntity> implements SifanyDataTypeService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyDataTypeEntity> page = this.page(
                new Query<SifanyDataTypeEntity>().getPage(params),
                new QueryWrapper<SifanyDataTypeEntity>()
        );

        return new PageUtils(page);
    }

}
