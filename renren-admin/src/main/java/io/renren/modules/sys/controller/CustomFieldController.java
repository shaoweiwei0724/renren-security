package io.renren.modules.sys.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.CustomExtendEntity;
import io.renren.modules.sys.entity.CustomFieldEntity;
import io.renren.modules.sys.service.CustomFieldService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;


/**
 * 模型实例数据
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@RestController
@RequestMapping("sys/customfield")
public class CustomFieldController {
    @Autowired
    private CustomFieldService customFieldService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:customfield:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = customFieldService.queryPage(params);

        return R.ok().put("page", page);
    }
    /**
     * 列表
     */
    @RequestMapping("/listInfo")
    @RequiresPermissions("sys:customfield:list")
    public R listInfo(@RequestBody Long id){
        List<CustomFieldEntity> list  = customFieldService.list(new QueryWrapper<CustomFieldEntity>().eq("field_id",id));

        return R.ok().put("list", list);
    }

    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:customfield:info")
    public R info(@PathVariable("id") Long id){
        CustomFieldEntity sifanyObjData = customFieldService.getById(id);

        return R.ok().put("sifanyObjData", sifanyObjData);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:customfield:save")
    public R save(@RequestBody CustomFieldEntity sifanyObjData){
        customFieldService.save(sifanyObjData);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:customfield:update")
    public R update(@RequestBody CustomFieldEntity sifanyObjData){
        ValidatorUtils.validateEntity(sifanyObjData);
        customFieldService.updateById(sifanyObjData);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:customfield:delete")
    public R delete(@RequestBody Long[] ids){
        customFieldService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
