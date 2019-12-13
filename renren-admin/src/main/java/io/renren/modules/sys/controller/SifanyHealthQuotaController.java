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

import io.renren.modules.sys.entity.SifanyHealthQuotaEntity;
import io.renren.modules.sys.service.SifanyHealthQuotaService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 健康指标
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:07
 */
@RestController
@RequestMapping("sys/sifanyhealthquota")
public class SifanyHealthQuotaController {
    @Autowired
    private SifanyHealthQuotaService sifanyHealthQuotaService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyhealthquota:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyHealthQuotaService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyhealthquota:info")
    public R info(@PathVariable("id") Long id){
        SifanyHealthQuotaEntity sifanyHealthQuota = sifanyHealthQuotaService.getById(id);

        return R.ok().put("sifanyHealthQuota", sifanyHealthQuota);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyhealthquota:save")
    public R save(@RequestBody SifanyHealthQuotaEntity sifanyHealthQuota){
        sifanyHealthQuotaService.save(sifanyHealthQuota);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyhealthquota:update")
    public R update(@RequestBody SifanyHealthQuotaEntity sifanyHealthQuota){
        ValidatorUtils.validateEntity(sifanyHealthQuota);
        sifanyHealthQuotaService.updateById(sifanyHealthQuota);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyhealthquota:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyHealthQuotaService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
