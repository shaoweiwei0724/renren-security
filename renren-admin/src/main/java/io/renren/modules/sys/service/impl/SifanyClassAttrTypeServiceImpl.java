package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyClassAttrTypeDao;
import io.renren.modules.sys.entity.SifanyClassAttrTypeEntity;
import io.renren.modules.sys.service.SifanyClassAttrTypeService;


@Service("sifanyClassAttrTypeService")
public class SifanyClassAttrTypeServiceImpl extends ServiceImpl<SifanyClassAttrTypeDao, SifanyClassAttrTypeEntity> implements SifanyClassAttrTypeService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyClassAttrTypeEntity> page = this.page(
                new Query<SifanyClassAttrTypeEntity>().getPage(params),
                new QueryWrapper<SifanyClassAttrTypeEntity>()
        );

        return new PageUtils(page);
    }

    @Override
    public List<SifanyClassAttrTypeEntity> queryList(Map<String, Object> map) {
        return baseMapper.queryList(map);
    }

}
