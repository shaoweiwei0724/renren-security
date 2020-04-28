package io.renren.modules.sys.controller;

import java.util.*;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.renren.common.utils.Constant;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.SifanyObjEntity;
import io.renren.modules.sys.entity.SysDeptEntity;
import io.renren.modules.sys.service.SifanyObjService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.SifanyOrganizationEntity;
import io.renren.modules.sys.service.SifanyOrganizationService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 组织机构管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-04-26 16:06:52
 */
@RestController
@RequestMapping("sys/sifanyorganization")
public class SifanyOrganizationController extends AbstractController{
    @Autowired
    private SifanyOrganizationService sifanyOrganizationService;
    @Autowired
    private SifanyObjService sifanyObjService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sifanyorganization:list")
    public List<SifanyOrganizationEntity> list(){
        List<SifanyOrganizationEntity> deptList = sifanyOrganizationService.queryList(new HashMap<String, Object>());

        return deptList;
    }

    /**
     * 列表添加接线图
     */
    @RequestMapping("/diagramList")
    @RequiresPermissions("sys:sifanyorganization:list")
    public R diagramList(){
        List<SifanyOrganizationEntity> deptList = sifanyOrganizationService.queryList(new HashMap<String, Object>());


        List<SifanyObjEntity>  objEntityLists = sifanyObjService.swanList(new QueryWrapper<SifanyObjEntity>().eq("node_type","1"));
        if(!objEntityLists.isEmpty()){
            for(SifanyOrganizationEntity entity:deptList){
                List<SifanyObjEntity> sat=new ArrayList<>();
                for(SifanyObjEntity obj:objEntityLists){
                    if(obj.getOrgId()!=null){
                        if(entity.getId().toString().equals(obj.getOrgId().toString())){
                            sat.add(obj);
                        }
                    }
                }
                entity.setChildren(sat);
            }
        }
        return R.ok().put("objEntityLists", deptList);
    }

    /**
     * 选择部门(添加、修改菜单)
     */
    @RequestMapping("/select")
    @RequiresPermissions("sys:sifanyorganization:select")
    public R select(){
        List<SifanyOrganizationEntity> deptList = sifanyOrganizationService.queryList(new HashMap<String, Object>());

        //添加一级部门
        if(getUserId() == Constant.SUPER_ADMIN){
            SifanyOrganizationEntity root = new SifanyOrganizationEntity();
            root.setId(0L);
            root.setName("一级部门");
            root.setParentId(-1L);
            root.setOpen(true);
            deptList.add(root);
        }

        return R.ok().put("deptList", deptList);
    }

    /**
     * 上级部门Id(管理员则为0)
     */
    @RequestMapping("/info")
    @RequiresPermissions("sys:sifanyorganization:list")
    public R info(){
        long deptId = 0;
        if(getUserId() != Constant.SUPER_ADMIN){
            List<SifanyOrganizationEntity> deptList = sifanyOrganizationService.queryList(new HashMap<String, Object>());
            Long parentId = null;
            for(SifanyOrganizationEntity sysDeptEntity : deptList){
                if(parentId == null){
                    parentId = sysDeptEntity.getParentId();
                    continue;
                }

                if(parentId > sysDeptEntity.getParentId().longValue()){
                    parentId = sysDeptEntity.getParentId();
                }
            }
            deptId = parentId;
        }

        return R.ok().put("deptId", deptId);
    }
    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:sifanyorganization:info")
    public R info(@PathVariable("id") Long id){
        SifanyOrganizationEntity sifanyOrganization = sifanyOrganizationService.getById(id);

        return R.ok().put("sifanyOrganization", sifanyOrganization);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sifanyorganization:save")
    public R save(@RequestBody SifanyOrganizationEntity sifanyOrganization){
        sifanyOrganizationService.save(sifanyOrganization);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyorganization:update")
    public R update(@RequestBody SifanyOrganizationEntity sifanyOrganization){

        sifanyOrganizationService.updateById(sifanyOrganization);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sifanyorganization:delete")
    public R delete(long id){
        //判断是否有子部门
        List<Long> deptList = sifanyOrganizationService.queryDetpIdList(id);
        if(deptList.size() > 0){
            return R.error("请先删除子部门");
        }
        sifanyOrganizationService.removeById(id);

        return R.ok();
    }

}
