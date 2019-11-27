package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.Map;

import io.renren.common.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.SifanyScenesEntity;
import io.renren.modules.sys.service.SifanyScenesService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-31 15:26:56
 */
@RestController
@RequestMapping("sys/sifanyscenes")
public class SifanyScenesController {
    @Autowired
    private SifanyScenesService sifanyScenesService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyscenes:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyScenesService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyscenes:info")
    public R info(@PathVariable("id") Integer id){
        SifanyScenesEntity sifanyScenes = sifanyScenesService.getById(id);

        return R.ok().put("sifanyScenes", sifanyScenes);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyscenes:save")
    public R save(@RequestBody SifanyScenesEntity sifanyScenes){
        sifanyScenesService.save(sifanyScenes);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyscenes:update")
    public R update(@RequestBody SifanyScenesEntity sifanyScenes){
        ValidatorUtils.validateEntity(sifanyScenes);
        sifanyScenesService.updateById(sifanyScenes);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyscenes:delete")
    public R delete(@RequestBody Integer[] ids){
        sifanyScenesService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
