package io.renren.modules.sys.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.renren.common.utils.RedisUtils;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.SifanyClassAttrEntity;
import io.renren.modules.sys.entity.SifanyDataTextEntity;
import io.renren.modules.sys.service.SifanyObjAttrService;
import io.renren.modules.sys.service.SifanyDataTextService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.SifanyObjEntity;
import io.renren.modules.sys.entity.SifanyObjAttrEntity;
import io.renren.modules.sys.service.SifanyObjService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 模型实例
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@RestController
@RequestMapping("sys/sifanyobj")
public class SifanyObjController  extends AbstractController{
    @Autowired
    private SifanyObjService sifanyObjService;
    @Autowired
    private SifanyDataTextService sifanyDataTextService;
    @Autowired
    private RedisUtils redisUtils;
    @Autowired
    private SifanyObjAttrService sifanyObjAttrService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyobj:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyObjService.queryPageTree(params);

        return R.ok().put("page", page);
    }

    /**
     * select
     */
    @RequestMapping("/select/{id}")
      public R select(@PathVariable("id") Long id){
        List<SifanyObjEntity> objEntityList = getChilds(id);

        return R.ok().put("objEntityList", objEntityList);
    }

    @RequestMapping("/select")
    public R selects(){
        List<SifanyObjEntity> objEntityLists = sifanyObjService.swanList(new QueryWrapper());

        SifanyObjEntity sifanyObjEntity = new SifanyObjEntity();
        sifanyObjEntity.setName("场景实例");
        sifanyObjEntity.setId(-1l);
        objEntityLists.add(sifanyObjEntity);
        System.out.println(objEntityLists);
        for(SifanyObjEntity obj : objEntityLists){
            if(obj.getParentId() == null)
                obj.setParentId(sifanyObjEntity.getId());
        }

        return R.ok().put("objEntityLists", objEntityLists);
    }

    private List<SifanyObjEntity> getChilds(Long id){
        return sifanyObjService.list(new QueryWrapper<SifanyObjEntity>().eq(true,"parent_id",id));
    }
    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyobj:info")
    public R info(@PathVariable("id") Long id){
        SifanyObjEntity sifanyObj = sifanyObjService.getById(id);

        return R.ok().put("sifanyObj", sifanyObj);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyobj:save")
    public R save(@RequestBody SifanyObjEntity sifanyObj) throws UnsupportedEncodingException{
//        sifanyObjService.save(sifanyObj);
//        System.out.println("__________________save_________________");
//        System.out.println(sifanyObj);
//
//        return R.ok();

        Long time = System.currentTimeMillis();
        sifanyObj.setCreateTime(time);
        sifanyObj.setUserId(getUserId());
        SifanyDataTextEntity sifanyDataTextEntity=new SifanyDataTextEntity();
        if(sifanyObj.getIcons() != null){
            sifanyDataTextEntity.setContent(URLDecoder.decode(sifanyObj.getIcons(),"utf-8"));

            sifanyDataTextEntity.setCreateTime(new Date().getTime());
            sifanyDataTextEntity.setUpdateTime(sifanyDataTextEntity.getCreateTime());
            sifanyDataTextService.save(sifanyDataTextEntity);
        }


        sifanyObj.setIcons(sifanyDataTextEntity.getId().toString());
        sifanyObjService.save(sifanyObj);
//        if(sifanyObj.getModelId() != null){
//            sifanyObjService.toObj(sifanyObj);
//        }

        List<SifanyObjAttrEntity> objAttrEntities =  sifanyObjAttrService.list(new QueryWrapper<SifanyObjAttrEntity>().eq("obj_id",sifanyObj.getParentId()));
        for(SifanyObjAttrEntity attr:objAttrEntities){
            attr.setObjId(sifanyObj.getId());
            attr.setId(null);
            attr.setCreateTime(time);
            attr.setUpdateTime(time);
            attr.setUserId(getUserId());
            sifanyObjAttrService.save(attr);
        }

        System.out.println("obj_save_sifanyObj+++++++++++++++++++++++++++++++");
        System.out.println(sifanyObj);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyobj:update")
    public R update(@RequestBody SifanyObjEntity sifanyObj) throws UnsupportedEncodingException {
//        ValidatorUtils.validateEntity(sifanyObj);
//        sifanyObjService.updateById(sifanyObj);
//        System.out.println("__________________update_________________");
//        System.out.println(sifanyObj);
//        return R.ok();

        ValidatorUtils.validateEntity(sifanyObj);
        Long time = System.currentTimeMillis();
        sifanyObj.setUpdateTime(time);
        SifanyDataTextEntity sifanyDataTextEntity=new SifanyDataTextEntity();
        if(sifanyObj.getIcons() != null)
            sifanyDataTextEntity.setContent(URLDecoder.decode(sifanyObj.getIcons(),"utf-8"));

        sifanyDataTextEntity.setCreateTime(new Date().getTime());
        sifanyDataTextEntity.setUpdateTime(sifanyDataTextEntity.getCreateTime());
        sifanyDataTextService.save(sifanyDataTextEntity);
        sifanyObj.setIcons(sifanyDataTextEntity.getId().toString());
        SifanyDataTextEntity sifanyDataText=new SifanyDataTextEntity();
        if(sifanyObj.getModelId() != null) {
            sifanyDataText.setContent(URLDecoder.decode(sifanyObj.getModelId(), "utf-8"));
            sifanyDataText.setCreateTime(new Date().getTime());
            sifanyDataText.setUpdateTime(sifanyDataText.getCreateTime());
            sifanyDataTextService.save(sifanyDataText);
            sifanyObj.setModelId(sifanyDataText.getId().toString());
        }
        sifanyObjService.updateById(sifanyObj);

        if(sifanyObj.getModelId() != null){
            sifanyObjService.toObj(sifanyObj);
        }

        return R.ok();


    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyobj:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyObjService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/deleteDom")
    @RequiresPermissions("sys:sifanyobj:delete")
    public R deleteDom(@RequestBody Long id){
        sifanyObjService.removeById(id);
        List<SifanyObjAttrEntity> objAttrEntities =  sifanyObjAttrService.list(new QueryWrapper<SifanyObjAttrEntity>().eq("obj_id",id));
        List<Long> setn = new ArrayList<Long>();
        for(SifanyObjAttrEntity attr:objAttrEntities){
            setn.add(attr.getId());
            sifanyObjAttrService.removeByIds(setn);
        }
        return R.ok();
    }

}
