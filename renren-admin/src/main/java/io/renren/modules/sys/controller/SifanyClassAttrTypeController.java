package io.renren.modules.sys.controller;

import java.util.*;

import io.renren.common.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.SifanyClassAttrTypeEntity;
import io.renren.modules.sys.service.SifanyClassAttrTypeService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 模型类属性类型
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@RestController
@RequestMapping("sys/sifanyclassattrtype")
public class SifanyClassAttrTypeController {
    @Autowired
    private SifanyClassAttrTypeService sifanyClassAttrTypeService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyclassattrtype:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyClassAttrTypeService.queryPage(params);

        return R.ok().put("page", page);
    }

    /**
     * 选择类型添加、修改菜单)
     */
    @RequestMapping("/select")
    public R select(){
        List<SifanyClassAttrTypeEntity> typeLists = sifanyClassAttrTypeService.queryList(new HashMap<String, Object>());
        List<SifanyClassAttrTypeEntity> typeLists2 = new ArrayList();
        for(SifanyClassAttrTypeEntity type : typeLists){
            type.setName(type.getTypes());
            typeLists2.add(type);
        }
        return R.ok().put("typeLists", typeLists2);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyclassattrtype:info")
    public R info(@PathVariable("id") Long id){
        SifanyClassAttrTypeEntity sifanyClassAttrType = sifanyClassAttrTypeService.getById(id);

        return R.ok().put("sifanyClassAttrType", sifanyClassAttrType);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyclassattrtype:save")
    public R save(@RequestBody SifanyClassAttrTypeEntity sifanyClassAttrType){
        Long time = System.currentTimeMillis();
        sifanyClassAttrType.setCreateTime(time);
        sifanyClassAttrType.setUpdateTime(time);
        sifanyClassAttrTypeService.save(sifanyClassAttrType);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyclassattrtype:update")
    public R update(@RequestBody SifanyClassAttrTypeEntity sifanyClassAttrType){
        ValidatorUtils.validateEntity(sifanyClassAttrType);
        Long time = System.currentTimeMillis();
        sifanyClassAttrType.setUpdateTime(time);
        sifanyClassAttrTypeService.updateById(sifanyClassAttrType);
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyclassattrtype:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyClassAttrTypeService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
