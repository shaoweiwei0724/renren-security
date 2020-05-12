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

import io.renren.modules.sys.entity.SifanyObjPropEntity;
import io.renren.modules.sys.service.SifanyObjPropService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 模型实例属性关系表
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-05-12 16:26:46
 */
@RestController
@RequestMapping("sys/sifanyobjprop")
public class SifanyObjPropController {
    @Autowired
    private SifanyObjPropService sifanyObjPropService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyobjprop:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyObjPropService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyobjprop:info")
    public R info(@PathVariable("id") Long id){
        SifanyObjPropEntity sifanyObjProp = sifanyObjPropService.getById(id);

        return R.ok().put("sifanyObjProp", sifanyObjProp);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyobjprop:save")
    public R save(@RequestBody SifanyObjPropEntity sifanyObjProp){
        sifanyObjPropService.save(sifanyObjProp);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyobjprop:update")
    public R update(@RequestBody SifanyObjPropEntity sifanyObjProp){
        ValidatorUtils.validateEntity(sifanyObjProp);
        sifanyObjPropService.updateById(sifanyObjProp);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyobjprop:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyObjPropService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
