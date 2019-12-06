package io.renren.modules.sys.controller;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.SifanyObjAttrEntity;
import io.renren.modules.sys.entity.SifanyObjEntity;
import io.renren.modules.sys.service.SifanyObjAttrService;
import io.renren.modules.sys.service.SifanyObjService;
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
@RequestMapping("sys/sifanyobjattr")
public class SifanyObjAttrController extends AbstractController{
    @Autowired
    private SifanyObjAttrService sifanyObjAttrService;
    @Autowired
    private SifanyObjService sifanyObjService;
    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyobjattr:list")
    public R list(@RequestParam Map<String, Object> params){
//        System.out.println("++++++++++++++++++++++++++=");
//        System.out.println(params);
        PageUtils page = sifanyObjAttrService.queryPage(params);
        return R.ok().put("page", page);
    }

    /**
     * 选择父类(添加、修改菜单)
     */
    @RequestMapping("/select")
    public R select(){
        List<SifanyObjEntity> classList = sifanyObjService.queryList(new HashMap<String, Object>());

        return R.ok().put("classLists", classList);
    }

    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyobjattr:info")
    public R info(@PathVariable("id") Long id){
        SifanyObjAttrEntity sifanyObjAttr = sifanyObjAttrService.getById(id);
        System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7");
        System.out.println(sifanyObjAttr);

        return R.ok().put("sifanyObjAttr", sifanyObjAttr);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyobjattr:save")
    public R save(@RequestBody SifanyObjAttrEntity sifanyObjAttr){
        Long time = System.currentTimeMillis();
        sifanyObjAttr.setCreateTime(time);
        sifanyObjAttr.setUpdateTime(time);
        sifanyObjAttr.setUserId(getUserId());
        sifanyObjAttrService.save(sifanyObjAttr);
        System.out.println("attr_save_=====================================");
        System.out.println(sifanyObjAttr);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyobjattr:update")
    public R update(@RequestBody SifanyObjAttrEntity sifanyObjAttr){
        Long time = System.currentTimeMillis();
        sifanyObjAttr.setUpdateTime(time);
        ValidatorUtils.validateEntity(sifanyObjAttr);
        sifanyObjAttrService.updateById(sifanyObjAttr);

        System.out.println("attr_update_=====================================");
        System.out.println(sifanyObjAttr);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyobjattr:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyObjAttrService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
