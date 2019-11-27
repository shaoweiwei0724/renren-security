package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyDataAudioDao;
import io.renren.modules.sys.entity.SifanyDataAudioEntity;
import io.renren.modules.sys.service.SifanyDataAudioService;


@Service("sifanyDataAudioService")
public class SifanyDataAudioServiceImpl extends ServiceImpl<SifanyDataAudioDao, SifanyDataAudioEntity> implements SifanyDataAudioService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyDataAudioEntity> page = this.page(
                new Query<SifanyDataAudioEntity>().getPage(params),
                new QueryWrapper<SifanyDataAudioEntity>()
        );

        return new PageUtils(page);
    }

}
