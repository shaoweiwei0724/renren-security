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

import io.renren.modules.sys.entity.SifanyHealthModeEntity;
import io.renren.modules.sys.service.SifanyHealthModeService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 故障模式
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:07
 */
@RestController
@RequestMapping("sys/sifanyhealthmode")
public class SifanyHealthModeController {
    @Autowired
    private SifanyHealthModeService sifanyHealthModeService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyhealthmode:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyHealthModeService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyhealthmode:info")
    public R info(@PathVariable("id") Long id){
        SifanyHealthModeEntity sifanyHealthMode = sifanyHealthModeService.getById(id);

        return R.ok().put("sifanyHealthMode", sifanyHealthMode);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyhealthmode:save")
    public R save(@RequestBody SifanyHealthModeEntity sifanyHealthMode){
        sifanyHealthModeService.save(sifanyHealthMode);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyhealthmode:update")
    public R update(@RequestBody SifanyHealthModeEntity sifanyHealthMode){
        ValidatorUtils.validateEntity(sifanyHealthMode);
        sifanyHealthModeService.updateById(sifanyHealthMode);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyhealthmode:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyHealthModeService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
