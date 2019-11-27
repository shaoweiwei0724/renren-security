package io.renren.modules.sys.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.SifanyDataTextEntity;
import io.renren.modules.sys.service.SifanyDataTextService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.SifanyDataImageEntity;
import io.renren.modules.sys.service.SifanyDataImageService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;


/**
 * 图片数据
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-30 20:15:26
 */
@RestController
@RequestMapping("sys/sifanydataimage")
public class SifanyDataImageController {
    @Autowired
    private SifanyDataImageService sifanyDataImageService;
    @Autowired
    private SifanyDataTextService sifanyDataTextService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanydataimage:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyDataImageService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanydataimage:info")
    public R info(@PathVariable("id") Long id){
        SifanyDataImageEntity sifanyDataImage = sifanyDataImageService.getById(id);

        return R.ok().put("sifanyDataImage", sifanyDataImage);
    }

    @RequestMapping(value="/image/{id}",  produces = MediaType.APPLICATION_XML_VALUE)
    public String image(@PathVariable("id") String id, HttpServletResponse response) throws IOException {
        id=id.replace(".svg","");
        SifanyDataTextEntity sifanyDataTextEntity = sifanyDataTextService.getById(id);
        String res=sifanyDataTextEntity.getContent();
//        SifanyDataImageEntity sifanyDataImageEntity = sifanyDataImageService.getById(id);
//        byte[] res = sifanyDataImageEntity.getContent();
        response.setContentType("image/svg+xml;charset=UTF-8");
        response.addHeader("Accept-Ranges","bytes");
        String svgdata=res;
        byte bs[]=svgdata.getBytes();


        ServletOutputStream sout =response.getOutputStream();
        sout.write(bs);
        sout.close();
        response.flushBuffer();

        return res;
    }

    /**
     * 保
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanydataimage:save")
    public R save(@RequestBody SifanyDataImageEntity sifanyDataImage){
        sifanyDataImageService.save(sifanyDataImage);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanydataimage:update")
    public R update(@RequestBody SifanyDataImageEntity sifanyDataImage){
        ValidatorUtils.validateEntity(sifanyDataImage);
        sifanyDataImageService.updateById(sifanyDataImage);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanydataimage:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyDataImageService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
