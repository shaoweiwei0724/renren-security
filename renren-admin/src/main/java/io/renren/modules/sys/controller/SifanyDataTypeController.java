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

import io.renren.modules.sys.entity.SifanyDataTypeEntity;
import io.renren.modules.sys.service.SifanyDataTypeService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 数据类型
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@RestController
@RequestMapping("sys/sifanydatatype")
public class SifanyDataTypeController {
    @Autowired
    private SifanyDataTypeService sifanyDataTypeService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanydatatype:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyDataTypeService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanydatatype:info")
    public R info(@PathVariable("id") Long id){
        SifanyDataTypeEntity sifanyDataType = sifanyDataTypeService.getById(id);

        return R.ok().put("sifanyDataType", sifanyDataType);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanydatatype:save")
    public R save(@RequestBody SifanyDataTypeEntity sifanyDataType){
        sifanyDataTypeService.save(sifanyDataType);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanydatatype:update")
    public R update(@RequestBody SifanyDataTypeEntity sifanyDataType){
        ValidatorUtils.validateEntity(sifanyDataType);
        sifanyDataTypeService.updateById(sifanyDataType);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanydatatype:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyDataTypeService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
