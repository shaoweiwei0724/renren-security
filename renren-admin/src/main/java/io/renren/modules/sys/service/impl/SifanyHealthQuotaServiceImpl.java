package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyHealthQuotaDao;
import io.renren.modules.sys.entity.SifanyHealthQuotaEntity;
import io.renren.modules.sys.service.SifanyHealthQuotaService;


@Service("sifanyHealthQuotaService")
public class SifanyHealthQuotaServiceImpl extends ServiceImpl<SifanyHealthQuotaDao, SifanyHealthQuotaEntity> implements SifanyHealthQuotaService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyHealthQuotaEntity> page = this.page(
                new Query<SifanyHealthQuotaEntity>().getPage(params),
                new QueryWrapper<SifanyHealthQuotaEntity>()
        );

        return new PageUtils(page);
    }

}
