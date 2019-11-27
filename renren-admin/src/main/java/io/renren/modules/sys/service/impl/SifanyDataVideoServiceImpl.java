package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyDataVideoDao;
import io.renren.modules.sys.entity.SifanyDataVideoEntity;
import io.renren.modules.sys.service.SifanyDataVideoService;


@Service("sifanyDataVideoService")
public class SifanyDataVideoServiceImpl extends ServiceImpl<SifanyDataVideoDao, SifanyDataVideoEntity> implements SifanyDataVideoService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyDataVideoEntity> page = this.page(
                new Query<SifanyDataVideoEntity>().getPage(params),
                new QueryWrapper<SifanyDataVideoEntity>()
        );

        return new PageUtils(page);
    }

}
