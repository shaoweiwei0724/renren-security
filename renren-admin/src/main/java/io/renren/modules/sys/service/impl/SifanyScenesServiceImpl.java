package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyScenesDao;
import io.renren.modules.sys.entity.SifanyScenesEntity;
import io.renren.modules.sys.service.SifanyScenesService;


@Service("sifanyScenesService")
public class SifanyScenesServiceImpl extends ServiceImpl<SifanyScenesDao, SifanyScenesEntity> implements SifanyScenesService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyScenesEntity> page = this.page(
                new Query<SifanyScenesEntity>().getPage(params),
                new QueryWrapper<SifanyScenesEntity>()
        );

        return new PageUtils(page);
    }

}
