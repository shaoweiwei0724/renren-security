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

import io.renren.modules.sys.entity.SifanyDataVideoEntity;
import io.renren.modules.sys.service.SifanyDataVideoService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 视频数据
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-30 20:15:26
 */
@RestController
@RequestMapping("sys/sifanydatavideo")
public class SifanyDataVideoController {
    @Autowired
    private SifanyDataVideoService sifanyDataVideoService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanydatavideo:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyDataVideoService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanydatavideo:info")
    public R info(@PathVariable("id") Long id){
        SifanyDataVideoEntity sifanyDataVideo = sifanyDataVideoService.getById(id);

        return R.ok().put("sifanyDataVideo", sifanyDataVideo);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanydatavideo:save")
    public R save(@RequestBody SifanyDataVideoEntity sifanyDataVideo){
        sifanyDataVideoService.save(sifanyDataVideo);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanydatavideo:update")
    public R update(@RequestBody SifanyDataVideoEntity sifanyDataVideo){
        ValidatorUtils.validateEntity(sifanyDataVideo);
        sifanyDataVideoService.updateById(sifanyDataVideo);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanydatavideo:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyDataVideoService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
