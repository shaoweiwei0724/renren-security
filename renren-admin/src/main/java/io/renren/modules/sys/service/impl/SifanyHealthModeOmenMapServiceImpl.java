package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyHealthModeOmenMapDao;
import io.renren.modules.sys.entity.SifanyHealthModeOmenMapEntity;
import io.renren.modules.sys.service.SifanyHealthModeOmenMapService;


@Service("sifanyHealthModeOmenMapService")
public class SifanyHealthModeOmenMapServiceImpl extends ServiceImpl<SifanyHealthModeOmenMapDao, SifanyHealthModeOmenMapEntity> implements SifanyHealthModeOmenMapService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyHealthModeOmenMapEntity> page = this.page(
                new Query<SifanyHealthModeOmenMapEntity>().getPage(params),
                new QueryWrapper<SifanyHealthModeOmenMapEntity>()
        );

        return new PageUtils(page);
    }

}
