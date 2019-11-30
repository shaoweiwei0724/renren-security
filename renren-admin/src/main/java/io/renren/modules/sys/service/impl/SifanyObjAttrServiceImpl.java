package io.renren.modules.sys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.SifanyObjAttrDao;
import io.renren.modules.sys.entity.SifanyObjAttrEntity;
import io.renren.modules.sys.service.SifanyObjAttrService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service("sifanyObjAttrService")
public class SifanyObjAttrServiceImpl extends ServiceImpl<SifanyObjAttrDao, SifanyObjAttrEntity> implements SifanyObjAttrService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyObjAttrEntity> page ;
        if(params.get("attrstypeId")!= null) {
             page = this.page(
                    new Query<SifanyObjAttrEntity>().getPage(params),
                    new QueryWrapper<SifanyObjAttrEntity>().eq("class_id", params.get("selected_id"))
                    .eq("attrstype_id", params.get("attrstypeId"))
            );
        }else{
          page = this.page(
                    new Query<SifanyObjAttrEntity>().getPage(params),
                    new QueryWrapper<SifanyObjAttrEntity>().eq("class_id", params.get("selected_id"))
            );
        }

        return new PageUtils(page);
    }

    @Override
    public List<SifanyObjAttrEntity> queryList(Map<String, Object> map) {
        return baseMapper.queryList(map);
    }




}
