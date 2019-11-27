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

import io.renren.modules.sys.entity.SifanyObjDataEntity;
import io.renren.modules.sys.service.SifanyObjDataService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 模型实例数据
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@RestController
@RequestMapping("sys/sifanyobjdata")
public class SifanyObjDataController {
    @Autowired
    private SifanyObjDataService sifanyObjDataService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyobjdata:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyObjDataService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyobjdata:info")
    public R info(@PathVariable("id") Long id){
        SifanyObjDataEntity sifanyObjData = sifanyObjDataService.getById(id);

        return R.ok().put("sifanyObjData", sifanyObjData);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyobjdata:save")
    public R save(@RequestBody SifanyObjDataEntity sifanyObjData){
        sifanyObjDataService.save(sifanyObjData);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyobjdata:update")
    public R update(@RequestBody SifanyObjDataEntity sifanyObjData){
        ValidatorUtils.validateEntity(sifanyObjData);
        sifanyObjDataService.updateById(sifanyObjData);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyobjdata:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyObjDataService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
