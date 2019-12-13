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

import io.renren.modules.sys.entity.CustomTableEntity;
import io.renren.modules.sys.service.CustomTableService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 动态表单
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 09:57:02
 */
@RestController
@RequestMapping("sys/customtable")
public class CustomTableController {
    @Autowired
    private CustomTableService customTableService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:customtable:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = customTableService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:customtable:info")
    public R info(@PathVariable("id") Long id){
        CustomTableEntity customTable = customTableService.getById(id);

        return R.ok().put("customTable", customTable);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:customtable:save")
    public R save(@RequestBody CustomTableEntity customTable){
        customTableService.save(customTable);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:customtable:update")
    public R update(@RequestBody CustomTableEntity customTable){
        ValidatorUtils.validateEntity(customTable);
        customTableService.updateById(customTable);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:customtable:delete")
    public R delete(@RequestBody Long[] ids){
        customTableService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
