package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.SifanyClassAttrEntity;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.SifanyClassPropEntity;
import io.renren.modules.sys.service.SifanyClassPropService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;

import static io.renren.modules.sys.shiro.ShiroUtils.getUserId;


/**
 * 模型类属性
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-05-11 11:33:27
 */
@RestController
@RequestMapping("sys/sifanyclassprop")
public class SifanyClassPropController {
    @Autowired
    private SifanyClassPropService sifanyClassPropService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyclassprop:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyClassPropService.queryPage(params);

        return R.ok().put("page", page);
    }
    /**
     * 列表
     */
    @RequestMapping("/propListInfo")
    @RequiresPermissions("sys:sifanyclassprop:list")
    public R listInfo(@RequestBody Long id){
        List<SifanyClassPropEntity> list  = sifanyClassPropService.list(new QueryWrapper<SifanyClassPropEntity>().eq("class_id",id));

        return R.ok().put("classPropList", list);
    }

    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyclassprop:info")
    public R info(@PathVariable("id") Long id){
        SifanyClassPropEntity sifanyClassProp = sifanyClassPropService.getById(id);

        return R.ok().put("sifanyClassProp", sifanyClassProp);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyclassprop:save")
    public R save(@RequestBody SifanyClassPropEntity sifanyClassProp){
        Long time = System.currentTimeMillis();
        sifanyClassProp.setCreateTime(time);
        sifanyClassProp.setUpdateTime(time);
        sifanyClassProp.setUserId(getUserId());
        sifanyClassProp.setOfflineSim(true);
        sifanyClassProp.setOnlineMonitor(true);
        sifanyClassProp.setOnlineSim(true);
        sifanyClassPropService.save(sifanyClassProp);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyclassprop:update")
    public R update(@RequestBody SifanyClassPropEntity sifanyClassProp){
        Long time = System.currentTimeMillis();
        sifanyClassProp.setUpdateTime(time);
        ValidatorUtils.validateEntity(sifanyClassProp);
        sifanyClassPropService.updateById(sifanyClassProp);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyclassprop:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyClassPropService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }
    @RequestMapping("/saveClassProp")
    @RequiresPermissions("sys:sifanyclassprop:save")
    public R saveClassAttr(@RequestBody List<SifanyClassPropEntity> classPropList){

        for (SifanyClassPropEntity str : classPropList) {
            Long time = System.currentTimeMillis();
            str.setUpdateTime(time);
            sifanyClassPropService.updateById(str);

        }

        return R.ok();
    }

}
