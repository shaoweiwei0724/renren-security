package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.Map;

import io.renren.common.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.SifanyDataTextEntity;
import io.renren.modules.sys.service.SifanyDataTextService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 文本数据
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-30 20:15:26
 */
@RestController
@RequestMapping("sys/sifanydatatext")
public class SifanyDataTextController {
    @Autowired
    private SifanyDataTextService sifanyDataTextService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanydatatext:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyDataTextService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping(value="/info/{id}")
    @RequiresPermissions("sys:sifanydatatext:info")
    public R info(@PathVariable("id") Long id){
        SifanyDataTextEntity sifanyDataText = sifanyDataTextService.getById(id);

        return R.ok().put("sifanyDataText", sifanyDataText);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanydatatext:save")
    public R save(@RequestBody SifanyDataTextEntity sifanyDataText){
        sifanyDataTextService.save(sifanyDataText);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanydatatext:update")
    public R update(@RequestBody SifanyDataTextEntity sifanyDataText){
        ValidatorUtils.validateEntity(sifanyDataText);
        sifanyDataTextService.updateById(sifanyDataText);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanydatatext:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyDataTextService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

    @RequestMapping(value="/scene/{id}")
    public R saveScene(@PathVariable("id") Long id){
        SifanyDataTextEntity sifanyClassEntity = sifanyDataTextService.getById(id);
        return R.ok().put("icons", sifanyClassEntity);
    }

}
