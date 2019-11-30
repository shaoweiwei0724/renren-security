package io.renren.modules.sys.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import io.renren.common.utils.R;
import io.renren.modules.sys.entity.*;
import io.renren.modules.sys.service.SifanyClassAttrService;
import io.renren.modules.sys.service.SifanyDataTextService;
import io.renren.modules.sys.service.SifanyObjDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyObjDao;
import io.renren.modules.sys.service.SifanyObjService;


@Service("sifanyObjService")
public class SifanyObjServiceImpl extends ServiceImpl<SifanyObjDao, SifanyObjEntity> implements SifanyObjService {


    @Autowired
    private SifanyDataTextService sifanyDataTextService;
    @Autowired
    private SifanyObjService sifanyObjService;
    @Autowired
    private SifanyClassAttrService sifanyClassAttrService;
    @Autowired
    private SifanyObjDataService sifanyObjDataService;
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

    @Override
    public List<SifanyObjEntity> queryList(Map<String, Object> map) {
        return baseMapper.queryList(map);
    }

    @Override
    public List<SifanyObjEntity> swanList(QueryWrapper queryWrapper) {
        return this.addIronUrl(this.list(queryWrapper));
    }

    private List<SifanyObjEntity> addIronUrl(List<SifanyObjEntity> sifanyObjEntities){
        for(SifanyObjEntity sifanyObjEntity:sifanyObjEntities){
            sifanyObjEntity.setIrconurl("../../sys/sifanydataimage/image/"+sifanyObjEntity.getIcons()+".svg");
        }
        return sifanyObjEntities;
    }

    @Override
    public List<SifanyObjEntity> scadalist() {
        return this.addIronUrl(this.list(Wrappers.emptyWrapper()));
    }

        }

