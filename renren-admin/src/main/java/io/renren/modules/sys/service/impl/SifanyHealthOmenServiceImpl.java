package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyHealthOmenDao;
import io.renren.modules.sys.entity.SifanyHealthOmenEntity;
import io.renren.modules.sys.service.SifanyHealthOmenService;


@Service("sifanyHealthOmenService")
public class SifanyHealthOmenServiceImpl extends ServiceImpl<SifanyHealthOmenDao, SifanyHealthOmenEntity> implements SifanyHealthOmenService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyHealthOmenEntity> page = this.page(
                new Query<SifanyHealthOmenEntity>().getPage(params),
                new QueryWrapper<SifanyHealthOmenEntity>()
        );

        return new PageUtils(page);
    }

}
