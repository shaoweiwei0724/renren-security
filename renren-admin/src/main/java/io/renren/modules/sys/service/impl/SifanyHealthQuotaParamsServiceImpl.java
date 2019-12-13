package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyHealthQuotaParamsDao;
import io.renren.modules.sys.entity.SifanyHealthQuotaParamsEntity;
import io.renren.modules.sys.service.SifanyHealthQuotaParamsService;


@Service("sifanyHealthQuotaParamsService")
public class SifanyHealthQuotaParamsServiceImpl extends ServiceImpl<SifanyHealthQuotaParamsDao, SifanyHealthQuotaParamsEntity> implements SifanyHealthQuotaParamsService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyHealthQuotaParamsEntity> page = this.page(
                new Query<SifanyHealthQuotaParamsEntity>().getPage(params),
                new QueryWrapper<SifanyHealthQuotaParamsEntity>()
        );

        return new PageUtils(page);
    }

}
