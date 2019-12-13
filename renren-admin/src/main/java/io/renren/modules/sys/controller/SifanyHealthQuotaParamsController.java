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

import io.renren.modules.sys.entity.SifanyHealthQuotaParamsEntity;
import io.renren.modules.sys.service.SifanyHealthQuotaParamsService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:07
 */
@RestController
@RequestMapping("sys/sifanyhealthquotaparams")
public class SifanyHealthQuotaParamsController {
    @Autowired
    private SifanyHealthQuotaParamsService sifanyHealthQuotaParamsService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyhealthquotaparams:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyHealthQuotaParamsService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyhealthquotaparams:info")
    public R info(@PathVariable("id") Long id){
        SifanyHealthQuotaParamsEntity sifanyHealthQuotaParams = sifanyHealthQuotaParamsService.getById(id);

        return R.ok().put("sifanyHealthQuotaParams", sifanyHealthQuotaParams);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyhealthquotaparams:save")
    public R save(@RequestBody SifanyHealthQuotaParamsEntity sifanyHealthQuotaParams){
        sifanyHealthQuotaParamsService.save(sifanyHealthQuotaParams);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyhealthquotaparams:update")
    public R update(@RequestBody SifanyHealthQuotaParamsEntity sifanyHealthQuotaParams){
        ValidatorUtils.validateEntity(sifanyHealthQuotaParams);
        sifanyHealthQuotaParamsService.updateById(sifanyHealthQuotaParams);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyhealthquotaparams:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyHealthQuotaParamsService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
