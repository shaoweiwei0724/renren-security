package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyObjDao;
import io.renren.modules.sys.entity.SifanyObjEntity;
import io.renren.modules.sys.service.SifanyObjService;


@Service("sifanyObjService")
public class SifanyObjServiceImpl extends ServiceImpl<SifanyObjDao, SifanyObjEntity> implements SifanyObjService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyObjEntity> page = this.page(
                new Query<SifanyObjEntity>().getPage(params),
                new QueryWrapper<SifanyObjEntity>()
        );

        return new PageUtils(page);
    }

    @Override
    public PageUtils queryPageTree(Map<String, Object> params) {
        IPage<SifanyObjEntity> page = null;
        if(params.size() == 7 || Long.parseLong(params.get("selected_id").toString()) == -1l) {
            page = this.page(
                    new Query<SifanyObjEntity>().getPage(params),
                    new QueryWrapper<SifanyObjEntity>().isNull("parent_id")
            );
        }else {
            page = this.page(
                    new Query<SifanyObjEntity>().getPage(params),
                    new QueryWrapper<SifanyObjEntity>().eq("parent_id", params.get("selected_id"))
            );
        }

        return new PageUtils(page);
    }

}
