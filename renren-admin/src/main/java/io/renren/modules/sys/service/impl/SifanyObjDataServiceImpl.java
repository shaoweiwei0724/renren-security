package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyObjDataDao;
import io.renren.modules.sys.entity.SifanyObjDataEntity;
import io.renren.modules.sys.service.SifanyObjDataService;


@Service("sifanyObjDataService")
public class SifanyObjDataServiceImpl extends ServiceImpl<SifanyObjDataDao, SifanyObjDataEntity> implements SifanyObjDataService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyObjDataEntity> page = this.page(
                new Query<SifanyObjDataEntity>().getPage(params),
                new QueryWrapper<SifanyObjDataEntity>()
        );

        return new PageUtils(page);
    }

}
