package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyDataImageDao;
import io.renren.modules.sys.entity.SifanyDataImageEntity;
import io.renren.modules.sys.service.SifanyDataImageService;


@Service("sifanyDataImageService")
public class SifanyDataImageServiceImpl extends ServiceImpl<SifanyDataImageDao, SifanyDataImageEntity> implements SifanyDataImageService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyDataImageEntity> page = this.page(
                new Query<SifanyDataImageEntity>().getPage(params),
                new QueryWrapper<SifanyDataImageEntity>()
        );

        return new PageUtils(page);
    }

}
