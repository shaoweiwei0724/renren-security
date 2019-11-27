package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyClassAttrDao;
import io.renren.modules.sys.entity.SifanyClassAttrEntity;
import io.renren.modules.sys.service.SifanyClassAttrService;


@Service("sifanyClassAttrService")
public class SifanyClassAttrServiceImpl extends ServiceImpl<SifanyClassAttrDao, SifanyClassAttrEntity> implements SifanyClassAttrService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyClassAttrEntity> page ;
        if(params.get("attrstypeId")!= null) {
             page = this.page(
                    new Query<SifanyClassAttrEntity>().getPage(params),
                    new QueryWrapper<SifanyClassAttrEntity>().eq("class_id", params.get("selected_id"))
                    .eq("attrstype_id", params.get("attrstypeId"))
            );
        }else{
          page = this.page(
                    new Query<SifanyClassAttrEntity>().getPage(params),
                    new QueryWrapper<SifanyClassAttrEntity>().eq("class_id", params.get("selected_id"))
            );
        }

        return new PageUtils(page);
    }

    @Override
    public List<SifanyClassAttrEntity> queryList(Map<String, Object> map) {
        return baseMapper.queryList(map);
    }

}
