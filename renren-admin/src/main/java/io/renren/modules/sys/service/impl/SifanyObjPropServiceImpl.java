package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyObjPropDao;
import io.renren.modules.sys.entity.SifanyObjPropEntity;
import io.renren.modules.sys.service.SifanyObjPropService;


@Service("sifanyObjPropService")
public class SifanyObjPropServiceImpl extends ServiceImpl<SifanyObjPropDao, SifanyObjPropEntity> implements SifanyObjPropService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyObjPropEntity> page = this.page(
                new Query<SifanyObjPropEntity>().getPage(params),
                new QueryWrapper<SifanyObjPropEntity>()
        );

        return new PageUtils(page);
    }

}
