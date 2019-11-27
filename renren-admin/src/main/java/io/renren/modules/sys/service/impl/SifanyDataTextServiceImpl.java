package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyDataTextDao;
import io.renren.modules.sys.entity.SifanyDataTextEntity;
import io.renren.modules.sys.service.SifanyDataTextService;


@Service("sifanyDataTextService")
public class SifanyDataTextServiceImpl extends ServiceImpl<SifanyDataTextDao, SifanyDataTextEntity> implements SifanyDataTextService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyDataTextEntity> page = this.page(
                new Query<SifanyDataTextEntity>().getPage(params),
                new QueryWrapper<SifanyDataTextEntity>()
        );

        return new PageUtils(page);
    }

}
