package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.SifanyClassEntity;
import io.renren.modules.sys.service.SifanyClassService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.SifanyClassAttrEntity;
import io.renren.modules.sys.service.SifanyClassAttrService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 模型类属性
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@RestController
@RequestMapping("sys/sifanyclassattr")
public class SifanyClassAttrController extends AbstractController{
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
     * 列表
     */
    @RequestMapping("/attrListInfo")
    @RequiresPermissions("sys:sifanyclassattr:list")
    public R listInfo(@RequestBody Long id){
        List<SifanyClassAttrEntity> list  = sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq("class_id",id));

        return R.ok().put("classAttrList", list);
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
        sifanyClassAttr.setOfflineSim(true);
        sifanyClassAttr.setOnlineMonitor(true);
        sifanyClassAttr.setOnlineSim(true);
        sifanyClassAttrService.save(sifanyClassAttr);

        return R.ok();
    }
    @RequestMapping("/saveClassAttr")
    @RequiresPermissions("sys:sifanyclassattr:save")
    public R saveClassAttr(@RequestBody List<SifanyClassAttrEntity> classAttrList){

        for (SifanyClassAttrEntity str : classAttrList) {
            Long time = System.currentTimeMillis();
            str.setUpdateTime(time);
            sifanyClassAttrService.updateById(str);

        }

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
