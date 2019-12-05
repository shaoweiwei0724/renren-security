package io.renren.modules.sys.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.gson.JsonObject;

import io.renren.common.utils.RedisUtils;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.*;
import io.renren.modules.sys.service.SifanyClassAttrService;
import io.renren.modules.sys.service.SifanyDataImageService;
import io.renren.modules.sys.service.SifanyDataTextService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.renren.modules.sys.service.SifanyClassService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 模型类
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@RestController
@RequestMapping("sys/sifanyclass")
public class SifanyClassController extends AbstractController{
    @Autowired
    private SifanyClassService sifanyClassService;
    @Autowired
    private SifanyDataTextService sifanyDataTextService;
    @Autowired
    private RedisUtils redisUtils;
    @Autowired
    private SifanyClassAttrService sifanyClassAttrService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyclass:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyClassService.queryPageTree(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyclass:info")
    public R info(@PathVariable("id") Long id){
        SifanyClassEntity sifanyClass = sifanyClassService.getById(id);

        return R.ok().put("sifanyClass", sifanyClass);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyclass:save")
    public R save(@RequestBody SifanyClassEntity sifanyClass) throws UnsupportedEncodingException {
        Long time = System.currentTimeMillis();
        sifanyClass.setCreateTime(time);
        sifanyClass.setUserId(getUserId());
        SifanyDataTextEntity sifanyDataTextEntity=new SifanyDataTextEntity();

        if(sifanyClass.getIcons()!=null&& !sifanyClass.getIcons().trim().equals("") ){
            sifanyDataTextEntity.setContent(URLDecoder.decode(sifanyClass.getIcons(),"utf-8"));
            sifanyDataTextEntity.setCreateTime(new Date().getTime());
            sifanyDataTextEntity.setUpdateTime(sifanyDataTextEntity.getCreateTime());
            sifanyDataTextService.save(sifanyDataTextEntity);
            sifanyClass.setIcons(sifanyDataTextEntity.getId().toString());
        }else{
            SifanyClassEntity parent=sifanyClassService.getById(sifanyClass.getParentId());
            if(parent.getIcons() != null)
                sifanyClass.setIcons(parent.getIcons());
        }

        sifanyClassService.save(sifanyClass);
        List<SifanyClassAttrEntity> classAttrEntities =  sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq("class_id",sifanyClass.getParentId()));
        for(SifanyClassAttrEntity attr:classAttrEntities){
            attr.setClassId(sifanyClass.getId());
            attr.setId(null);
            attr.setCreateTime(time);
            attr.setUpdateTime(time);
            attr.setUserId(getUserId());
            sifanyClassAttrService.save(attr);
        }
        return R.ok();
    }


    /**
     * 选择父类(添加、修改菜单)
     */
    @RequestMapping("/select/{id}")
    public R select(@PathVariable("id") Long id){
        List<SifanyClassEntity> sifanyClassEntities=getChilds(id);
        for(SifanyClassEntity sifanyClassEntity:sifanyClassEntities){
            sifanyClassEntity.setChilds(this.getChilds(sifanyClassEntity.getId()));
        }
//        List<SifanyClassEntity> classLists = sifanyClassService.queryList(new HashMap<String, Object>());
        return R.ok().put("classLists", sifanyClassEntities);
    }

    /**
     * 选择父类(添加、修改菜单)
     */
    @RequestMapping(value="/scenes/{id}")
    public R saveScenes(@PathVariable("id") Long id){
        return sifanyClassService.getMap(id);
    }



    private List<SifanyClassEntity> getChilds(Long id){
        return sifanyClassService.list(new QueryWrapper<SifanyClassEntity>().eq(true,"parent_id",id));
    }


    @RequestMapping("/select")
    public R selects(String type){
        List<SifanyClassEntity> classLists = null;
        if(type == null) {
            classLists = sifanyClassService.scadalist();
        }else {
            if (getUser().getUsername().equals("admin"))
                classLists = sifanyClassService.swanList(new QueryWrapper<SifanyClassEntity>().eq("type", type));
            else
                classLists = sifanyClassService.swanList(new QueryWrapper<SifanyClassEntity>().eq("type", type).eq("user_id",getUser().getUserId()));
        }
        return R.ok().put("classLists", classLists);
    }
    @RequestMapping("/getRedis")
    public String getRedis(String key){
        return redisUtils.get(key);
    }



    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyclass:update")
    public R update(@RequestBody SifanyClassEntity sifanyClass) throws UnsupportedEncodingException {

        ValidatorUtils.validateEntity(sifanyClass);
        Long time = System.currentTimeMillis();
        sifanyClass.setUpdateTime(time);

        if(sifanyClass.getIcons().length() >= 20 && sifanyClass.getIcons() != null && sifanyClass.getIcons() != ""){
            SifanyDataTextEntity sifanyDataTextEntity=new SifanyDataTextEntity();
            sifanyDataTextEntity.setContent(URLDecoder.decode(sifanyClass.getIcons(),"utf-8"));
            sifanyDataTextEntity.setCreateTime(new Date().getTime());
            sifanyDataTextEntity.setUpdateTime(sifanyDataTextEntity.getCreateTime());
            sifanyDataTextService.save(sifanyDataTextEntity);
            sifanyClass.setIcons(sifanyDataTextEntity.getId().toString());
        }

        if(sifanyClass.getModelId() != null) {
            SifanyDataTextEntity sifanyDataText=new SifanyDataTextEntity();
            sifanyDataText.setContent(URLDecoder.decode(sifanyClass.getModelId(), "utf-8"));
            sifanyDataText.setCreateTime(new Date().getTime());
            sifanyDataText.setUpdateTime(sifanyDataText.getCreateTime());
            sifanyDataTextService.save(sifanyDataText);
            sifanyClass.setModelId(sifanyDataText.getId().toString());
        }

        sifanyClassService.updateById(sifanyClass);
        
        return R.ok();
    }
    /**
     * 修改
     */
    @RequestMapping("/updateModel")
    @RequiresPermissions("sys:sifanyclass:update")
    public R updateModel(@RequestBody SifanyClassEntity sifanyClass) throws UnsupportedEncodingException {
        ValidatorUtils.validateEntity(sifanyClass);
        Long time = System.currentTimeMillis();
        sifanyClass.setUpdateTime(time);

        SifanyDataTextEntity sifanyDataText=new SifanyDataTextEntity();
        if(sifanyClass.getModelId() != null)
            sifanyDataText.setContent(URLDecoder.decode(sifanyClass.getModelId(), "utf-8"));
            sifanyDataText.setCreateTime(new Date().getTime());
            sifanyDataText.setUpdateTime(sifanyDataText.getCreateTime());
            sifanyDataTextService.save(sifanyDataText);
            sifanyClass.setModelId(sifanyDataText.getId().toString());

        sifanyClassService.updateById(sifanyClass);

        return R.ok();
    }
    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyclass:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyClassService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }
    /**
     * 删除
     */
    @RequestMapping("/deleteDom")
    @RequiresPermissions("sys:sifanyclass:delete")
    public R deleteDom(@RequestBody Long id){
//        sifanyClassService.removeById(id);
//        List<SifanyClassAttrEntity> classAttrEntities =  sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq("class_id",id));
//        List<Long> setn = new ArrayList<Long>();
//        for(SifanyClassAttrEntity attr:classAttrEntities){
//             setn.add(attr.getId());
//            sifanyClassAttrService.removeByIds(setn);
//        }
        delete_child(id);
        return R.ok();
    }
    /**
     * 删除
     */
    @RequestMapping("/toObj")
    public R toObj(@RequestBody Long[] ids){
        sifanyClassService.toObj(ids);

        return R.ok();
    }

    public String delete_child(Long id){
        //删除节点
        sifanyClassService.removeById(id);
        //删除节点属性
        List<SifanyClassAttrEntity> classAttrEntities =  sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq("class_id",id));
        List<Long> setn = new ArrayList<Long>();

        for(SifanyClassAttrEntity attr:classAttrEntities){
            setn.add(attr.getId());
            sifanyClassAttrService.removeByIds(setn);
        }
        //删除子节点
        List<SifanyClassEntity> classEntities =  sifanyClassService.list(new QueryWrapper<SifanyClassEntity>().eq("parent_id",id));
        List<Long> child_id = new ArrayList<Long>();
        for(SifanyClassEntity child_obj:classEntities) {
            delete_child(child_obj.getId());
        }
        return "sucess";
    }

}
