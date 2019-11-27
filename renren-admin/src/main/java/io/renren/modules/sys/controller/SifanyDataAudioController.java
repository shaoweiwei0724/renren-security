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

import io.renren.modules.sys.entity.SifanyDataAudioEntity;
import io.renren.modules.sys.service.SifanyDataAudioService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 音频数据
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-30 20:15:26
 */
@RestController
@RequestMapping("sys/sifanydataaudio")
public class SifanyDataAudioController {
    @Autowired
    private SifanyDataAudioService sifanyDataAudioService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanydataaudio:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyDataAudioService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanydataaudio:info")
    public R info(@PathVariable("id") Long id){
        SifanyDataAudioEntity sifanyDataAudio = sifanyDataAudioService.getById(id);

        return R.ok().put("sifanyDataAudio", sifanyDataAudio);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanydataaudio:save")
    public R save(@RequestBody SifanyDataAudioEntity sifanyDataAudio){
        sifanyDataAudioService.save(sifanyDataAudio);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanydataaudio:update")
    public R update(@RequestBody SifanyDataAudioEntity sifanyDataAudio){
        ValidatorUtils.validateEntity(sifanyDataAudio);
        sifanyDataAudioService.updateById(sifanyDataAudio);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanydataaudio:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyDataAudioService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
