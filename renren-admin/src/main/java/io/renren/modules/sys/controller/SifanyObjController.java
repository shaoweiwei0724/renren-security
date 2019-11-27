package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.renren.common.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.SifanyObjEntity;
import io.renren.modules.sys.service.SifanyObjService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 模型实例
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@RestController
@RequestMapping("sys/sifanyobj")
public class SifanyObjController {
    @Autowired
    private SifanyObjService sifanyObjService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyobj:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sifanyObjService.queryPageTree(params);

        return R.ok().put("page", page);
    }

    /**
     * select
     */
    @RequestMapping("/select/{id}")
      public R select(@PathVariable("id") Long id){
        List<SifanyObjEntity> objEntityList = getChilds(id);

        return R.ok().put("objEntityList", objEntityList);
    }

    @RequestMapping("/select")
    public R selects(){
        List<SifanyObjEntity> objEntityLists = sifanyObjService.list();

        SifanyObjEntity sifanyObjEntity = new SifanyObjEntity();
        sifanyObjEntity.setName("场景实例");
        sifanyObjEntity.setId(-1l);
        objEntityLists.add(sifanyObjEntity);
        for(SifanyObjEntity obj : objEntityLists){
            if(obj.getParentId() == null)
                obj.setParentId(sifanyObjEntity.getId());
        }
        return R.ok().put("objEntityLists", objEntityLists);
    }

    private List<SifanyObjEntity> getChilds(Long id){
        return sifanyObjService.list(new QueryWrapper<SifanyObjEntity>().eq(true,"parent_id",id));
    }
    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyobj:info")
    public R info(@PathVariable("id") Long id){
        SifanyObjEntity sifanyObj = sifanyObjService.getById(id);

        return R.ok().put("sifanyObj", sifanyObj);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyobj:save")
    public R save(@RequestBody SifanyObjEntity sifanyObj){
        sifanyObjService.save(sifanyObj);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyobj:update")
    public R update(@RequestBody SifanyObjEntity sifanyObj){
        ValidatorUtils.validateEntity(sifanyObj);
        sifanyObjService.updateById(sifanyObj);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyobj:delete")
    public R delete(@RequestBody Long[] ids){
        sifanyObjService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
