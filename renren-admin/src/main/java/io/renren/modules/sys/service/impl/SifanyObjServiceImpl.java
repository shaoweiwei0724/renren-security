package io.renren.modules.sys.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import io.renren.common.annotation.DataFilter;
import io.renren.common.utils.R;
import io.renren.modules.sys.entity.*;
import io.renren.modules.sys.service.*;
import org.apache.shiro.SecurityUtils;
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
    @Autowired
    private SifanyClassService sifanyClassService;
    @Autowired
    private SifanyObjAttrService sifanyObjAttrService;
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyObjEntity> page = this.page(
                new Query<SifanyObjEntity>().getPage(params),
                new QueryWrapper<SifanyObjEntity>()
        );

        return new PageUtils(page);
    }

    public PageUtils queryOrg(Map<String, Object> params) {
        IPage<SifanyObjEntity> page = this.page(
                new Query<SifanyObjEntity>().getPage(params),
                new QueryWrapper<SifanyObjEntity>().eq("node_type",params.getOrDefault("node_type","0"))
        );

        return new PageUtils(page);
    }

    @Override
    public PageUtils queryPageTree(Map<String, Object> params) {
        IPage<SifanyObjEntity> page = null;
        if(params.get("selected_id") != null && (params.size() == 7 || Long.parseLong(params.get("selected_id").toString()) == -1l)) {
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
    protected SysUserEntity getUser() {
        return (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
    }

    @Override
    public void toObj(SifanyObjEntity sifanyObjEntity) {
        SifanyDataTextEntity sifanyDataTextEntity=sifanyDataTextService.getById(sifanyObjEntity.getModelId());
        JSONObject irons=JSONObject.parseObject(sifanyDataTextEntity.getContent());
        JSONArray ironArray=irons.getJSONArray("nodeDataArray");
        Long time = System.currentTimeMillis();

        sifanyObjService.remove(new QueryWrapper<SifanyObjEntity>().eq("parent_id",sifanyObjEntity.getId()));
        for(int i=0;i<ironArray.size();i++){
            JSONObject iron=ironArray.getJSONObject(i);
            SifanyClassEntity obj=sifanyClassService.getById(iron.getJSONObject("source").getLong("id"));


            //模型实例
            SifanyObjEntity objEntity = new SifanyObjEntity();
            objEntity.setClassId(obj.getId());
            objEntity.setName(obj.getName() + "_entity");
            objEntity.setGoKey(iron.getInteger("key"));
            objEntity.setCreateTime(time);
            objEntity.setUpdateTime(time);
            objEntity.setIcons(obj.getIcons());
            objEntity.setParentId(sifanyObjEntity.getId());
            objEntity.setUserId(getUser().getUserId());
            sifanyObjService.save(objEntity);

            List<SifanyClassAttrEntity> classAttrEntities =  sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq(true,"class_id",obj.getId()));



            for(SifanyClassAttrEntity classAttrEntity : classAttrEntities){
                SifanyObjDataEntity sifanyObjDataEntity = new SifanyObjDataEntity();

                sifanyObjDataEntity.setObjId(objEntity.getId());
                sifanyObjDataEntity.setDataType(classAttrEntity.getDataType());
                sifanyObjDataEntity.setAttrId(classAttrEntity.getId());
                sifanyObjDataEntity.setOfflineSim(classAttrEntity.getOfflineSim());
                sifanyObjDataEntity.setOnlineMonitor(classAttrEntity.getOnlineMonitor());
                sifanyObjDataEntity.setOnlineSim(classAttrEntity.getOnlineSim());



//                sifanyObjDataEntity.setDataId();
                sifanyObjDataService.save(sifanyObjDataEntity);


                SifanyObjAttrEntity sifanyObjAttrEntity=new SifanyObjAttrEntity();
                sifanyObjAttrEntity.setObjId(objEntity.getId());
                sifanyObjAttrEntity.setDataType(classAttrEntity.getDataType());
                sifanyObjAttrEntity.setCode(classAttrEntity.getCode());
                sifanyObjAttrEntity.setName(classAttrEntity.getName());
                sifanyObjAttrEntity.setTypeId(classAttrEntity.getTypeId());
                sifanyObjAttrEntity.setUnitId(classAttrEntity.getUnitId());
                sifanyObjAttrEntity.setRemark(classAttrEntity.getRemark());
                sifanyObjAttrEntity.setCreateTime(classAttrEntity.getCreateTime());
                sifanyObjAttrEntity.setUpdateTime(classAttrEntity.getUpdateTime());
                sifanyObjAttrEntity.setAttrstypeId(classAttrEntity.getAttrstypeId());

                sifanyObjAttrService.save(sifanyObjAttrEntity);
            }
        }
    }

    @Override
    public void GtoObj(SifanyObjEntity sifanyObjEntity) {
        SifanyDataTextEntity sifanyDataTextEntity=sifanyDataTextService.getById(sifanyObjEntity.getgModelId());
        JSONObject irons=JSONObject.parseObject(sifanyDataTextEntity.getContent());
//        JSONArray ironArray=irons.getJSONArray("nodeDataArray");
        JSONArray ironArray=irons.getJSONArray("node");
        Long time = System.currentTimeMillis();


        sifanyObjService.remove(new QueryWrapper<SifanyObjEntity>().eq("parent_id",sifanyObjEntity.getId()));
        for(int i=0;i<ironArray.size();i++){
            JSONObject iron=ironArray.getJSONObject(i);
            String type=iron.getString("type");
            String category=iron.getString("category");
            System.out.println("iron:"+iron.toJSONString());
            try{
            if(!("OfNodes").equals(category)&&!("TextNode").equals(category)){
                    if(!("Text").equals(type)){
                        SifanyClassEntity obj=sifanyClassService.getById(iron.getJSONObject("source").getLong("id"));

                        //模型实例
                        SifanyObjEntity objEntity = new SifanyObjEntity();
                        objEntity.setClassId(obj.getId());
                        objEntity.setName(obj.getName() + "_entity");
                        objEntity.setGoKey(iron.getInteger("key"));
                        objEntity.setCreateTime(time);
                        objEntity.setUpdateTime(time);
                        objEntity.setIcons(obj.getIcons());
                        objEntity.setParentId(sifanyObjEntity.getId());
                        objEntity.setUserId(getUser().getUserId());
                        sifanyObjService.save(objEntity);

                        List<SifanyClassAttrEntity> classAttrEntities =  sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq(true,"class_id",obj.getId()));



                        for(SifanyClassAttrEntity classAttrEntity : classAttrEntities){
                            SifanyObjDataEntity sifanyObjDataEntity = new SifanyObjDataEntity();

                            sifanyObjDataEntity.setObjId(objEntity.getId());
                            sifanyObjDataEntity.setDataType(classAttrEntity.getDataType());
                            sifanyObjDataEntity.setAttrId(classAttrEntity.getId());



//                sifanyObjDataEntity.setDataId();
                            sifanyObjDataService.save(sifanyObjDataEntity);


                            SifanyObjAttrEntity sifanyObjAttrEntity=new SifanyObjAttrEntity();
                            sifanyObjAttrEntity.setObjId(objEntity.getId());
                            sifanyObjAttrEntity.setDataType(classAttrEntity.getDataType());
                            sifanyObjAttrEntity.setCode(classAttrEntity.getCode());
                            sifanyObjAttrEntity.setName(classAttrEntity.getName());
                            sifanyObjAttrEntity.setTypeId(classAttrEntity.getTypeId());
                            sifanyObjAttrEntity.setUnitId(classAttrEntity.getUnitId());
                            sifanyObjAttrEntity.setRemark(classAttrEntity.getRemark());
                            sifanyObjAttrEntity.setCreateTime(classAttrEntity.getCreateTime());
                            sifanyObjAttrEntity.setUpdateTime(classAttrEntity.getUpdateTime());
                            sifanyObjAttrEntity.setAttrstypeId(classAttrEntity.getAttrstypeId());

                            sifanyObjAttrService.save(sifanyObjAttrEntity);
                        }
                    }

            }
            }catch (Exception e){
                continue;
            }

        }

    }


}

