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

import io.renren.modules.sys.entity.SifanyHealthModeOmenMapEntity;
import io.renren.modules.sys.service.SifanyHealthModeOmenMapService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:07
 */
@RestController
@RequestMapping("sys/sifanyhealthmodeomenmap")
public class SifanyHealthModeOmenMapController {
    @Autowired
    private SifanyHealthModeOmenMapService sifanyHealthModeOmenMapService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyhealthmodeomenmap:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyHealthModeOmenMapService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyhealthmodeomenmap:info")
    public R info(@PathVariable("id") Long id){
        SifanyHealthModeOmenMapEntity sifanyHealthModeOmenMap = sifanyHealthModeOmenMapService.getById(id);

        return R.ok().put("sifanyHealthModeOmenMap", sifanyHealthModeOmenMap);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyhealthmodeomenmap:save")
    public R save(@RequestBody SifanyHealthModeOmenMapEntity sifanyHealthModeOmenMap){
        sifanyHealthModeOmenMapService.save(sifanyHealthModeOmenMap);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyhealthmodeomenmap:update")
    public R update(@RequestBody SifanyHealthModeOmenMapEntity sifanyHealthModeOmenMap){
        ValidatorUtils.validateEntity(sifanyHealthModeOmenMap);
        sifanyHealthModeOmenMapService.updateById(sifanyHealthModeOmenMap);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyhealthmodeomenmap:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyHealthModeOmenMapService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
