package io.renren.modules.sys.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import io.renren.common.annotation.DataFilter;
import io.renren.common.utils.R;
import io.renren.modules.sys.dao.SifanyObjDao;
import io.renren.modules.sys.entity.*;
import io.renren.modules.sys.service.*;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyClassDao;


@Service("sifanyClassService")
public class SifanyClassServiceImpl extends ServiceImpl<SifanyClassDao, SifanyClassEntity> implements SifanyClassService {

    @Autowired
    private SifanyDataTextService sifanyDataTextService;
    @Autowired
    private SifanyObjService sifanyObjService;
    @Autowired
    private SifanyClassAttrService sifanyClassAttrService;
    @Autowired
    private SifanyObjDataService sifanyObjDataService;

    protected SysUserEntity getUser() {
        return (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
    }

    @Override
    public PageUtils queryPage(Map<String, Object> params) {

        IPage<SifanyClassEntity> page = this.page(
                new Query<SifanyClassEntity>().getPage(params),
                new QueryWrapper<SifanyClassEntity>()
        );

        return new PageUtils(page);
    }
    @Override
    public PageUtils queryPageTree(Map<String, Object> params) {


        IPage<SifanyClassEntity> page = this.page(
                new Query<SifanyClassEntity>().getPage(params),
                new QueryWrapper<SifanyClassEntity>().eq("parent_id",params.get("selected_id"))
                        .eq("type",params.get("type"))
        );

        this.addIronUrl(page.getRecords());

        return new PageUtils(page);
    }

    @Override
    public List<SifanyClassEntity> swanList(QueryWrapper queryWrapper) {
        return this.addIronUrl(this.list(queryWrapper));
    }

    private List<SifanyClassEntity> addIronUrl(List<SifanyClassEntity> sifanyClassEntities){
        for(SifanyClassEntity sifanyClassEntity:sifanyClassEntities){
            sifanyClassEntity.setIrconurl("../../sys/sifanydataimage/image/"+sifanyClassEntity.getIcons()+".svg");
        }
        return sifanyClassEntities;
    }
    @Override
    public List<SifanyClassEntity> scadalist() {
//       if(getUser().getUsername().equals("admin"))
        return this.addIronUrl(this.list(Wrappers.emptyWrapper()));
//       else
//           return this.addIronUrl(this.list(new QueryWrapper<SifanyClassEntity>().eq("user_id",getUser().getUserId())));
    }
    @Override
    public List<SifanyClassEntity> queryList(Map<String, Object> map) {
        return baseMapper.queryList(map);
    }

    @Override
    public R toObj(Long[] ids){
        ArrayList<Long> ids_s=new ArrayList<>();
        for(Long id :ids){
            ids_s.add(id);
        }
        List<SifanyClassEntity> sifanyClassEntities=new ArrayList<>(this.listByIds(ids_s));
        for(SifanyClassEntity sifanyClassEntity:sifanyClassEntities){
            this.toObjOne(sifanyClassEntity);
        }
        return R.ok();
    }

    private void toObjOne(SifanyClassEntity sifanyClassEntity){
        SifanyDataTextEntity sifanyDataTextEntity=sifanyDataTextService.getById(sifanyClassEntity.getIcons());
        JSONObject irons=JSONObject.parseObject(sifanyDataTextEntity.getContent());
        JSONArray ironArray=irons.getJSONArray("nodeDataArray");
        Long time = System.currentTimeMillis();
        SifanyObjEntity sifanyObjEntity = new SifanyObjEntity();
        sifanyObjEntity.setClassId(sifanyClassEntity.getId());
        sifanyObjEntity.setName(sifanyClassEntity.getName() +  "_entity");
        sifanyObjEntity.setCreateTime(time);
        sifanyObjEntity.setUpdateTime(time);
        sifanyObjService.save(sifanyObjEntity);
        for(int i=0;i<ironArray.size();i++){
            JSONObject iron=ironArray.getJSONObject(i);
            SifanyClassEntity obj=this.getById(iron.getJSONObject("source").getLong("id"));

            //模型实例
            SifanyObjEntity objEntity = new SifanyObjEntity();
            objEntity.setClassId(obj.getId());
            objEntity.setName(obj.getName() + "_entity");
            objEntity.setGoKey(iron.getInteger("key"));
            objEntity.setCreateTime(time);
            objEntity.setUpdateTime(time);
            objEntity.setParentId(sifanyObjEntity.getId());
            sifanyObjService.save(objEntity);

            List<SifanyClassAttrEntity> classAttrEntities =  sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq(true,"class_id",obj.getId()));


            for(SifanyClassAttrEntity classAttrEntity : classAttrEntities){
                SifanyObjDataEntity sifanyObjDataEntity = new SifanyObjDataEntity();

                sifanyObjDataEntity.setObjId(objEntity.getId());
                sifanyObjDataEntity.setDataType(classAttrEntity.getDataType());
                sifanyObjDataEntity.setAttrId(classAttrEntity.getId());
//                sifanyObjDataEntity.setDataId();
                sifanyObjDataService.save(sifanyObjDataEntity);
            }
        }

        //组态实例

    }
    @Override
    public R getMap(Long id){
        SifanyObjEntity sifanyObjEntity=sifanyObjService.getById(id);
        String mapJson=sifanyDataTextService.getById(sifanyObjEntity.getModelId()).getContent();
        Map res=new HashMap();
        res.put("mapJson",mapJson);

        List<SifanyObjEntity> objs=sifanyObjService.list(new QueryWrapper<SifanyObjEntity>().eq("parent_id",id));
        for(SifanyObjEntity obj:objs){
            List<SifanyObjDataEntity> sifanyObjDataEntities=sifanyObjDataService.list(new QueryWrapper<SifanyObjDataEntity>().eq("obj_id",obj.getId()));
            for(SifanyObjDataEntity sifanyObjDataEntity:sifanyObjDataEntities){
                sifanyObjDataEntity.setObjName(sifanyClassAttrService.getById(sifanyObjDataEntity.getAttrId()).getName());

            }
            obj.setAttrs(sifanyObjDataEntities);

        }
        res.put("objs",objs);


        return R.ok(res);




    }



}
