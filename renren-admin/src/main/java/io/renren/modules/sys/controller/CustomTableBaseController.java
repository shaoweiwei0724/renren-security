package io.renren.modules.sys.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.CustomExtendEntity;
import io.renren.modules.sys.entity.CustomTableBaseAdd;
import io.renren.modules.sys.entity.CustomTableEntity;
import io.renren.modules.sys.service.CustomExtendService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.CustomTableBaseEntity;
import io.renren.modules.sys.service.CustomTableBaseService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-12 14:17:31
 */
@RestController
@RequestMapping("sys/customtablebase")
public class CustomTableBaseController {
    @Autowired
    private CustomTableBaseService customTableBaseService;
    @Autowired
    private CustomExtendService customExtendService;
    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:customtablebase:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = customTableBaseService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:customtablebase:info")
    public R info(@PathVariable("id") Long id){
        CustomTableBaseEntity customTableBase = customTableBaseService.getById(id);

        return R.ok().put("customTableBase", customTableBase);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:customtablebase:save")
    public R save(@RequestBody CustomTableBaseAdd customTableBase){
      //  customTableBaseService.save(customTableBase);

        CustomTableBaseEntity sntity = new CustomTableBaseEntity();
        BeanUtils.copyProperties(customTableBase, sntity);
        customTableBaseService.save(sntity);
        if(customTableBase.getMap()!=null){

            for(Integer key : customTableBase.getMap().keySet()){
                String value = customTableBase.getMap().get(key);
                CustomExtendEntity extend = new CustomExtendEntity();
                extend.setFieldId(key);
                extend.setValue(value);
                extend.setDefenseId(sntity.getId());
                customExtendService.save(extend);
            }

        }
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:customtablebase:update")
    public R update(@RequestBody CustomTableBaseAdd customTableBase){
        /*ValidatorUtils.validateEntity(customTableBase);
        customTableBaseService.updateById(customTableBase);*/
        CustomTableBaseEntity sntity = new CustomTableBaseEntity();
        BeanUtils.copyProperties(customTableBase, sntity);
        ValidatorUtils.validateEntity(sntity);
        customTableBaseService.updateById(sntity);
        if(customTableBase.getMap()!=null){

            for(Integer key : customTableBase.getMap().keySet()){
                String value = customTableBase.getMap().get(key);

                List<CustomExtendEntity> list =  customExtendService.list(new QueryWrapper<CustomExtendEntity>().eq("defense_id",sntity.getId()).eq("field_id",key));
                if(!list.isEmpty()){
                    List<Long> setn = new ArrayList<Long>();
                    for(CustomExtendEntity attr:list){
                        setn.add(attr.getId());
                    }
                    customExtendService.removeByIds(setn);
                    CustomExtendEntity extend = new CustomExtendEntity();
                    extend.setFieldId(key);
                    extend.setValue(value);
                    extend.setDefenseId(sntity.getId());
                    customExtendService.save(extend);
                }else{
                    CustomExtendEntity extend = new CustomExtendEntity();
                    extend.setFieldId(key);
                    extend.setValue(value);
                    extend.setDefenseId(sntity.getId());
                    customExtendService.save(extend);
                }
            }

        }
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:customtablebase:delete")
    public R delete(@RequestBody Long[] ids){
        customTableBaseService.removeByIds(Arrays.asList(ids));
        for(int i =0;i<ids.length;i++) {
            List<CustomExtendEntity> list = customExtendService.list(new QueryWrapper<CustomExtendEntity>().eq("defense_id", ids[i]));
            if (!list.isEmpty()) {
                List<Long> setn = new ArrayList<Long>();
                for (CustomExtendEntity attr : list) {
                    setn.add(attr.getId());
                }
                customExtendService.removeByIds(setn);

            }
        }
        return R.ok();
    }

}
