package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyClassPropDao;
import io.renren.modules.sys.entity.SifanyClassPropEntity;
import io.renren.modules.sys.service.SifanyClassPropService;


@Service("sifanyClassPropService")
public class SifanyClassPropServiceImpl extends ServiceImpl<SifanyClassPropDao, SifanyClassPropEntity> implements SifanyClassPropService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyClassPropEntity> page = this.page(
                new Query<SifanyClassPropEntity>().getPage(params),
                new QueryWrapper<SifanyClassPropEntity>().eq("class_id", params.get("selected_id"))

        );

        return new PageUtils(page);
    }

}
