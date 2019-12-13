package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyHealthModeDao;
import io.renren.modules.sys.entity.SifanyHealthModeEntity;
import io.renren.modules.sys.service.SifanyHealthModeService;


@Service("sifanyHealthModeService")
public class SifanyHealthModeServiceImpl extends ServiceImpl<SifanyHealthModeDao, SifanyHealthModeEntity> implements SifanyHealthModeService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyHealthModeEntity> page = this.page(
                new Query<SifanyHealthModeEntity>().getPage(params),
                new QueryWrapper<SifanyHealthModeEntity>()
        );

        return new PageUtils(page);
    }

}
