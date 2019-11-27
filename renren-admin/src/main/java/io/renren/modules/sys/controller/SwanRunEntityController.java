package io.renren.modules.sys.controller;


import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.SwanRunEntityEntity;
import io.renren.modules.sys.service.SwanRunEntityService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;


/**
 * 运行实例
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-07-19 10:50:22
 */
@RestController
@RequestMapping("sys/swanrunentity")
public class SwanRunEntityController {
    @Autowired
    private SwanRunEntityService swanRunEntityService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:swanrunentity:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = swanRunEntityService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:swanrunentity:info")
    public R info(@PathVariable("id") Long id){
        SwanRunEntityEntity swanRunEntity = swanRunEntityService.getById(id);

        return R.ok().put("swanRunEntity", swanRunEntity);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:swanrunentity:save")
    public R save(@RequestBody SwanRunEntityEntity swanRunEntity){
        swanRunEntityService.save(swanRunEntity);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:swanrunentity:update")
    public R update(@RequestBody SwanRunEntityEntity swanRunEntity){
        ValidatorUtils.validateEntity(swanRunEntity);
        swanRunEntityService.updateById(swanRunEntity);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:swanrunentity:delete")
    public R delete(@RequestBody Long[] ids){
        swanRunEntityService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }


    /**
     * 删除
     */
    @RequestMapping("/getcodes")
    @RequiresPermissions("sys:swanrunentity:save")
    public R getcodes(@RequestBody Long[] ids){
        return R.ok().put("res", swanRunEntityService.getCodes(ids));
    }


}
