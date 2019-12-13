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

import io.renren.modules.sys.entity.SifanyHealthOmenEntity;
import io.renren.modules.sys.service.SifanyHealthOmenService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 故障征兆
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:08
 */
@RestController
@RequestMapping("sys/sifanyhealthomen")
public class SifanyHealthOmenController {
    @Autowired
    private SifanyHealthOmenService sifanyHealthOmenService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyhealthomen:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyHealthOmenService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyhealthomen:info")
    public R info(@PathVariable("id") Long id){
        SifanyHealthOmenEntity sifanyHealthOmen = sifanyHealthOmenService.getById(id);

        return R.ok().put("sifanyHealthOmen", sifanyHealthOmen);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyhealthomen:save")
    public R save(@RequestBody SifanyHealthOmenEntity sifanyHealthOmen){
        sifanyHealthOmenService.save(sifanyHealthOmen);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyhealthomen:update")
    public R update(@RequestBody SifanyHealthOmenEntity sifanyHealthOmen){
        ValidatorUtils.validateEntity(sifanyHealthOmen);
        sifanyHealthOmenService.updateById(sifanyHealthOmen);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyhealthomen:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyHealthOmenService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
