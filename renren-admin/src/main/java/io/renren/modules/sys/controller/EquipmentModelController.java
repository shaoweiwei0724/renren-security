package io.renren.modules.sys.controller;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.SifanyClassAttrEntity;
import io.renren.modules.sys.entity.SifanyClassEntity;
import io.renren.modules.sys.service.SifanyClassAttrService;
import io.renren.modules.sys.service.SifanyClassService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 模型类属性
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@RestController
@RequestMapping("sys/equipmentmodel")
public class EquipmentModelController extends AbstractController{
    @Autowired
    private SifanyClassAttrService sifanyClassAttrService;
    @Autowired
    private SifanyClassService sifanyClassService;
    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyclassattr:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyClassAttrService.queryPage(params);

        return R.ok().put("page", page);
    }

    /**
     * 选择父类(添加、修改菜单)
     */
    @RequestMapping("/select")
    public R select(){
        List<SifanyClassEntity> classList = sifanyClassService.queryList(new HashMap<String, Object>());

        return R.ok().put("classLists", classList);
    }

    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyclassattr:info")
    public R info(@PathVariable("id") Long id){
        SifanyClassAttrEntity sifanyClassAttr = sifanyClassAttrService.getById(id);

        return R.ok().put("sifanyClassAttr", sifanyClassAttr);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyclassattr:save")
    public R save(@RequestBody SifanyClassAttrEntity sifanyClassAttr){
        Long time = System.currentTimeMillis();
        sifanyClassAttr.setCreateTime(time);
        sifanyClassAttr.setUpdateTime(time);
        sifanyClassAttr.setUserId(getUserId());
        sifanyClassAttrService.save(sifanyClassAttr);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyclassattr:update")
    public R update(@RequestBody SifanyClassAttrEntity sifanyClassAttr){
        Long time = System.currentTimeMillis();
        sifanyClassAttr.setUpdateTime(time);
        ValidatorUtils.validateEntity(sifanyClassAttr);
        sifanyClassAttrService.updateById(sifanyClassAttr);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyclassattr:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyClassAttrService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
