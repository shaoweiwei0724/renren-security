package io.renren.modules.sys.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sun.xml.internal.stream.events.StartDocumentEvent;
import io.renren.common.utils.Constant;
import io.renren.common.utils.RedisUtils;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.*;
import io.renren.modules.sys.service.*;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;
import sun.awt.geom.AreaOp;

import javax.print.DocFlavor;


/**
 * 模型实例
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@RestController
@RequestMapping("sys/sifanyobj")
public class SifanyObjController  extends AbstractController{
    @Autowired
    private SifanyObjService sifanyObjService;
    @Autowired
    private SifanyDataTextService sifanyDataTextService;
    @Autowired
    private RedisUtils redisUtils;
    @Autowired
    private SifanyObjAttrService sifanyObjAttrService;
    @Autowired
    private SifanyObjDataService sifanyObjDataService;

    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysDeptService sysDeptService;
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
     * 上级部门Id(管理员则为0)
     */
    @RequestMapping("/infoOrganization")
    @RequiresPermissions("sys:sifanyobj:list")
    public R infoOrganization(){
        long deptId = 0;
            List<SifanyObjEntity> objEntityLists = sifanyObjService.swanList(new QueryWrapper<SifanyObjEntity>().eq("node_type","0"));
            Long parentId = null;
            for(SifanyObjEntity sysDeptEntity : objEntityLists){
                if(parentId == null){
                    parentId = sysDeptEntity.getParentId();
                    continue;
                }

                if(parentId > sysDeptEntity.getParentId().longValue()){
                    parentId = sysDeptEntity.getParentId();
                }
            }
            deptId = parentId;


        return R.ok().put("deptId", deptId);
    }

    /**
     * //组织机构列表
     * @param params
     * @return
     */

//    @RequestMapping("/listOrganization")
//    @RequiresPermissions("sys:sifanyobj:list")
//    public R listOrganization(@RequestParam Map<String, Object> params){
//        PageUtils page = sifanyObjService.queryOrg(params);
//        return R.ok().put("page", page);
//    }

    @RequestMapping("/listOrganization")
    @RequiresPermissions("sys:sifanyobj:list")
    public List<SifanyObjEntity> listOrganization(){
        List<SifanyObjEntity> objEntityLists = null;
        Long uerId = getUser().getUserId();
        if(getUser().getUsername().equals("admin"))
            objEntityLists = sifanyObjService.swanList(new QueryWrapper<SifanyObjEntity>().eq("node_type","0"));
//            objEntityLists = sifanyObjService.swanList(new QueryWrapper());
        else {
            objEntityLists = sifanyObjService.swanList(new QueryWrapper<SifanyObjEntity>().eq("node_type","0"));
//            objEntityLists = sifanyObjService.swanList(new QueryWrapper<SifanyObjEntity>());
            objEntityLists = listDept(objEntityLists);
        }
//        return R.ok().put("organizationLists", objEntityLists);
        return objEntityLists;
    }


    /**
     * 添加组织机构
     * @param sifanyObj
     * @return

     */
    @RequestMapping("/saveOrganization")
    @RequiresPermissions("sys:sifanyobj:save")
    public R saveOrganization(@RequestBody SifanyObjEntity sifanyObj) {
        sifanyObj.setNodeType("0");
        sifanyObj.setUserId(getUserId());

        sifanyObjService.save(sifanyObj);
        return R.ok();
    }

    /**
     * 修改组织机构
     * @param sifanyObj
     * @return

     */
    @RequestMapping("/updateOrganization")
    @RequiresPermissions("sys:sifanyobj:save")
    public R updateOrganization(@RequestBody SifanyObjEntity sifanyObj) {
        ValidatorUtils.validateEntity(sifanyObj);
        sifanyObjService.updateById(sifanyObj);

        return R.ok();
    }
    /**
     * 组织机构树
     */
    @RequestMapping("/selectOrganization")
    public R selectOrganization(){

        List<SifanyObjEntity> objEntityLists = null;
        Long uerId = getUser().getUserId();
        if(getUser().getUsername().equals("admin"))
            objEntityLists = sifanyObjService.swanList(new QueryWrapper<SifanyObjEntity>().eq("node_type","0"));
//            objEntityLists = sifanyObjService.swanList(new QueryWrapper());
        else {
            objEntityLists = sifanyObjService.swanList(new QueryWrapper<SifanyObjEntity>().eq("node_type","0"));
//            objEntityLists = sifanyObjService.swanList(new QueryWrapper<SifanyObjEntity>());
            objEntityLists = listDept(objEntityLists);
        }
        return R.ok().put("organizationLists", objEntityLists);
    }

    /**
     * 删除组织机构
     */
    @RequestMapping("/deleteOrganization")
    @RequiresPermissions("sys:sifanyobj:delete")
    public R deleteOrganization(Long sifanyobjId){
        List<SifanyObjEntity> sifanyobjList = sifanyObjService.swanList(new QueryWrapper<SifanyObjEntity>().eq("node_type","0").eq("parent_id",sifanyobjId));
        if(sifanyobjList.size() > 0){
            return R.error("请先删除子部门");
        }
        sifanyObjService.removeById(sifanyobjId);

        return R.ok();
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

        List<SifanyObjEntity> objEntityLists = null;
        Long uerId = getUser().getUserId();
        if(getUser().getUsername().equals("admin"))
            objEntityLists = sifanyObjService.swanList(new QueryWrapper<SifanyObjEntity>().notLike("name","_entity"));
//            objEntityLists = sifanyObjService.swanList(new QueryWrapper());
        else {
            objEntityLists = sifanyObjService.swanList(new QueryWrapper<SifanyObjEntity>().notLike("name","_entity"));
//            objEntityLists = sifanyObjService.swanList(new QueryWrapper<SifanyObjEntity>());
            objEntityLists = listDept(objEntityLists);
        }
        if(objEntityLists.size() == 0) {
            SifanyObjEntity sifanyObjEntity = new SifanyObjEntity();
            sifanyObjEntity.setName("场景实例");
            sifanyObjEntity.setUserId(uerId);
            sifanyObjService.save(sifanyObjEntity);
            objEntityLists.add(sifanyObjEntity);
        }

        return R.ok().put("objEntityLists", objEntityLists);
    }

    public List<SifanyObjEntity> listDept(List<SifanyObjEntity> objEntityLists){

        List<SifanyObjEntity> sifanyObjEntities= new ArrayList<>();
        for(SifanyObjEntity sifanyObjEntity : objEntityLists){
            Long usrId = sifanyObjEntity.getUserId();
            if(usrId != null) {
                SysUserEntity sysUserEntity = sysUserService.getById(usrId);

                if(sysUserEntity.getDeptId()!=null) {
                    SysDeptEntity deptEntity = sysDeptService.getById(sysUserEntity.getDeptId());

                    if (deptEntity.getDeptId().equals(getUser().getDeptId())) {
                        sifanyObjEntities.add(sifanyObjEntity);
                    }
                }
            }
        }
        return sifanyObjEntities;
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
    public R save(@RequestBody SifanyObjEntity sifanyObj) throws UnsupportedEncodingException{
//        sifanyObjService.save(sifanyObj);
//        System.out.println("__________________save_________________");
//        System.out.println(sifanyObj);
//
//        return R.ok();

        Long time = System.currentTimeMillis();
        sifanyObj.setCreateTime(time);
        sifanyObj.setUserId(getUserId());
        SifanyDataTextEntity sifanyDataTextEntity=new SifanyDataTextEntity();
        if(sifanyObj.getIcons() != null){
            sifanyDataTextEntity.setContent(URLDecoder.decode(sifanyObj.getIcons(),"utf-8"));

            sifanyDataTextEntity.setCreateTime(new Date().getTime());
            sifanyDataTextEntity.setUpdateTime(sifanyDataTextEntity.getCreateTime());
            sifanyDataTextService.save(sifanyDataTextEntity);
        }


        sifanyObj.setIcons(sifanyDataTextEntity.getId().toString());
        sifanyObjService.save(sifanyObj);
//        if(sifanyObj.getModelId() != null){
//            sifanyObjService.toObj(sifanyObj);
//        }

        List<SifanyObjAttrEntity> objAttrEntities =  sifanyObjAttrService.list(new QueryWrapper<SifanyObjAttrEntity>().eq("obj_id",sifanyObj.getParentId()));
        for(SifanyObjAttrEntity attr:objAttrEntities){
            attr.setObjId(sifanyObj.getId());
            attr.setId(null);
            attr.setCreateTime(time);
            attr.setUpdateTime(time);
            attr.setUserId(getUserId());
            sifanyObjAttrService.save(attr);
        }

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sifanyobj:update")
    public R update(@RequestBody SifanyObjEntity sifanyObj) throws UnsupportedEncodingException {
//        ValidatorUtils.validateEntity(sifanyObj);
//        sifanyObjService.updateById(sifanyObj);
//        System.out.println("__________________update_________________");
//        System.out.println(sifanyObj);
//        return R.ok();

        ValidatorUtils.validateEntity(sifanyObj);
        Long time = System.currentTimeMillis();
        sifanyObj.setUpdateTime(time);

        SifanyObjEntity sifanyObjEntity = sifanyObjService.getById(sifanyObj.getId());

        if(sifanyObj.getIcons() != null && sifanyObj.getIcons() != "" && sifanyObj.getIcons().length() >= 20) {
            SifanyDataTextEntity sifanyDataTextEntity=new SifanyDataTextEntity();
            SifanyDataTextEntity sifanyDataTextEntityIcons = sifanyDataTextService.getById(sifanyObjEntity.getIcons());
            if(sifanyDataTextEntityIcons == null) {
                sifanyDataTextEntity.setContent(URLDecoder.decode(sifanyObj.getIcons(), "utf-8"));

                sifanyDataTextEntity.setCreateTime(new Date().getTime());
                sifanyDataTextEntity.setUpdateTime(sifanyDataTextEntity.getCreateTime());
                sifanyDataTextService.save(sifanyDataTextEntity);
                sifanyObj.setIcons(sifanyDataTextEntity.getId().toString());
            }else{
                sifanyDataTextEntityIcons.setContent(URLDecoder.decode(sifanyObj.getIcons(), "utf-8"));
                sifanyDataTextEntityIcons.setUpdateTime(new Date().getTime());
                sifanyDataTextService.updateById(sifanyDataTextEntityIcons);
                sifanyObj.setIcons(sifanyDataTextEntityIcons.getId().toString());
            }
        }

        String  basestring  = "{ \"class\": \"GraphLinksModel\",  \"nodeDataArray\": [],  \"linkDataArray\": []}";
//        if(sifanyObj.getModelId() != null && sifanyObj.getModelId() != "" && URLDecoder.decode(sifanyObj.getModelId(), "utf-8").length()> basestring.length() + 10) {
//            SifanyDataTextEntity sifanyDataTextEntityModel = sifanyDataTextService.getById(sifanyObjEntity.getModelId());
//            if(sifanyDataTextEntityModel == null) {
//                SifanyDataTextEntity sifanyDataText=new SifanyDataTextEntity();
//                sifanyDataText.setContent(URLDecoder.decode(sifanyObj.getModelId(), "utf-8"));
//                sifanyDataText.setCreateTime(new Date().getTime());
//                sifanyDataText.setUpdateTime(sifanyDataText.getCreateTime());
//                sifanyDataTextService.save(sifanyDataText);
//                sifanyObj.setModelId(sifanyDataText.getId().toString());
//            }else{
//                sifanyDataTextEntityModel.setContent(URLDecoder.decode(sifanyObj.getModelId(), "utf-8"));
//                sifanyDataTextEntityModel.setUpdateTime(new Date().getTime());
//                sifanyDataTextService.updateById(sifanyDataTextEntityModel);
//                sifanyObj.setModelId(sifanyDataTextEntityModel.getId().toString());
//            }
//
//            sifanyObjService.toObj(sifanyObj);
////            sifanyObjService.toObj(sifanyObj);
//        }else{
//            sifanyObj.setModelId(sifanyObjEntity.getModelId());
//        }
        if(sifanyObj.getModelId()!=null) { //组态
            if (URLDecoder.decode(sifanyObj.getModelId(), "utf-8").length() > basestring.length() + 10) {
                SifanyDataTextEntity sifanyDataTextEntityModel = sifanyDataTextService.getById(sifanyObjEntity.getModelId());
                SifanyDataTextEntity sifanyDataTextEntityZXFZ = sifanyDataTextService.getById(sifanyObjEntity.getOnlineSimModelId());
                SifanyDataTextEntity sifanyDataTextEntityLXFZ = sifanyDataTextService.getById(sifanyObjEntity.getOfflineSimModelId());
                if (sifanyDataTextEntityModel == null) {
                    SifanyDataTextEntity sifanyDataText=new SifanyDataTextEntity();
                    sifanyDataText.setContent(URLDecoder.decode(sifanyObj.getModelId(), "utf-8"));
                    sifanyDataText.setCreateTime(new Date().getTime());
                    sifanyDataText.setUpdateTime(sifanyDataText.getCreateTime());
                    sifanyDataTextService.save(sifanyDataText);
                    sifanyObj.setModelId(sifanyDataText.getId().toString());


                    sifanyDataText.setId(null);
                    sifanyDataTextService.save(sifanyDataText);
                    sifanyObj.setOnlineSimModelId(sifanyDataText.getId().toString());
                    sifanyDataText.setId(null);
                    sifanyDataTextService.save(sifanyDataText);
                    sifanyObj.setOfflineSimModelId(sifanyDataText.getId().toString());


                } else {
                    sifanyDataTextEntityModel.setContent(URLDecoder.decode(sifanyObj.getModelId(), "utf-8"));
                    sifanyDataTextEntityModel.setUpdateTime(new Date().getTime());
                    sifanyDataTextService.updateById(sifanyDataTextEntityModel);
                    sifanyObj.setModelId(sifanyDataTextEntityModel.getId().toString());

                    sifanyDataTextEntityZXFZ.setContent(URLDecoder.decode(sifanyObj.getOnlineSimModelId(), "utf-8"));
                    sifanyDataTextEntityZXFZ.setUpdateTime(new Date().getTime());
                    sifanyDataTextService.updateById(sifanyDataTextEntityZXFZ);
                    sifanyObj.setOnlineSimModelId(sifanyDataTextEntityZXFZ.getId().toString());

                    sifanyDataTextEntityLXFZ.setContent(URLDecoder.decode(sifanyObj.getOfflineSimModelId(), "utf-8"));
                    sifanyDataTextEntityLXFZ.setUpdateTime(new Date().getTime());
                    sifanyDataTextService.updateById(sifanyDataTextEntityLXFZ);
                    sifanyObj.setOfflineSimModelId(sifanyDataTextEntityLXFZ.getId().toString());
                }

//                sifanyObjService.toObj(sifanyObj);
            } else {
                sifanyObj.setModelId(sifanyObjEntity.getModelId());
                sifanyObj.setOnlineSimModelId(sifanyObjEntity.getOnlineSimModelId());
                sifanyObj.setOfflineSimModelId(sifanyObjEntity.getOfflineSimModelId());
            }
        }
        if(sifanyObj.getgModelId()!=null){ //接线图
            if( URLDecoder.decode(sifanyObj.getgModelId(), "utf-8").length()> basestring.length() + 10) {
                SifanyDataTextEntity sifanyDataTextEntityModel = sifanyDataTextService.getById(sifanyObjEntity.getgModelId());
                SifanyDataTextEntity sifanyDataTextEntityZXFZ = sifanyDataTextService.getById(sifanyObjEntity.getOnlineSimModelId());
                SifanyDataTextEntity sifanyDataTextEntityLXFZ = sifanyDataTextService.getById(sifanyObjEntity.getOfflineSimModelId());
                if (sifanyDataTextEntityModel == null) {
                    SifanyDataTextEntity sifanyDataText = new SifanyDataTextEntity();
                    sifanyDataText.setContent(URLDecoder.decode(sifanyObj.getgModelId(), "utf-8").replace("linkDataArray","link").replace("nodeDataArray","node"));
                    sifanyDataText.setCreateTime(new Date().getTime());
                    sifanyDataText.setUpdateTime(sifanyDataText.getCreateTime());
                    sifanyDataTextService.save(sifanyDataText);
                    sifanyObj.setgModelId(sifanyDataText.getId().toString());

                    sifanyDataText.setId(null); //设置在线仿真
                    sifanyDataTextService.save(sifanyDataText);
                    sifanyObj.setOnlineSimModelId(sifanyDataText.getId().toString());
                    sifanyDataText.setId(null); //设置离线仿真
                    sifanyDataTextService.save(sifanyDataText);
                    sifanyObj.setOfflineSimModelId(sifanyDataText.getId().toString());
                } else {

                    sifanyDataTextEntityModel.setContent(URLDecoder.decode(sifanyObj.getgModelId(), "utf-8").replace("linkDataArray","link").replace("nodeDataArray","node"));
                    sifanyDataTextEntityModel.setUpdateTime(new Date().getTime());
                    sifanyDataTextService.updateById(sifanyDataTextEntityModel);
                    sifanyObj.setgModelId(sifanyDataTextEntityModel.getId().toString());

                    if(sifanyDataTextEntityZXFZ != null) {
                        sifanyDataTextEntityZXFZ.setContent(URLDecoder.decode(sifanyObj.getOnlineSimModelId(), "utf-8"));
                        sifanyDataTextEntityZXFZ.setUpdateTime(new Date().getTime());
                        sifanyDataTextService.updateById(sifanyDataTextEntityZXFZ);
                    }else{
                        sifanyDataTextEntityZXFZ = new SifanyDataTextEntity();
                        sifanyDataTextEntityZXFZ.setContent(URLDecoder.decode(sifanyObj.getOnlineSimModelId(), "utf-8"));
                        sifanyDataTextEntityZXFZ.setUpdateTime(new Date().getTime());
                        sifanyDataTextService.save(sifanyDataTextEntityZXFZ);
                    }
                    sifanyObj.setOnlineSimModelId(sifanyDataTextEntityZXFZ.getId().toString());

                    if(sifanyDataTextEntityLXFZ != null) {
                        sifanyDataTextEntityLXFZ.setContent(URLDecoder.decode(sifanyObj.getOfflineSimModelId(), "utf-8"));
                        sifanyDataTextEntityLXFZ.setUpdateTime(new Date().getTime());
                        sifanyDataTextService.updateById(sifanyDataTextEntityLXFZ);
                    }
                    else{
                        sifanyDataTextEntityLXFZ = new SifanyDataTextEntity();
                        sifanyDataTextEntityLXFZ.setContent(URLDecoder.decode(sifanyObj.getOfflineSimModelId(), "utf-8"));
                        sifanyDataTextEntityLXFZ.setUpdateTime(new Date().getTime());
                        sifanyDataTextService.save(sifanyDataTextEntityLXFZ);
                    }
                    sifanyObj.setOfflineSimModelId(sifanyDataTextEntityLXFZ.getId().toString());
                }
            sifanyObjService.GtoObj(sifanyObj);
            }else{
                sifanyObj.setgModelId(sifanyObjEntity.getgModelId());
            }
        }
        sifanyObjService.updateById(sifanyObj);

//        if(sifanyObj.getModelId() != null){
//            sifanyObjService.toObj(sifanyObj);
//        }

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

    /**
     * 删除
     */
    @RequestMapping("/deleteDom")
    @RequiresPermissions("sys:sifanyobj:delete")
    public R deleteDom(@RequestBody Long id){
        //删除节点
//        sifanyObjService.removeById(id);
////        //删除节点属性
////        List<SifanyObjAttrEntity> objAttrEntities =  sifanyObjAttrService.list(new QueryWrapper<SifanyObjAttrEntity>().eq("obj_id",id));
////        List<Long> setn = new ArrayList<Long>();
////        List<SifanyObjEntity> objEntities =  sifanyObjService.list(new QueryWrapper<SifanyObjEntity>().eq("parent_id",id));
////        List<Long> child_id = new ArrayList<Long>();
////        for(SifanyObjAttrEntity attr:objAttrEntities){
////            setn.add(attr.getId());
////            sifanyObjAttrService.removeByIds(setn);
////        }
////        //删除子节点
////        for(SifanyObjEntity child_obj:objEntities) {
////            child_id.add(child_obj.getId());
////            sifanyObjService.removeByIds(child_id);
////        }
        delete_child(id);
        return R.ok();
    }

    public String delete_child(Long id){
        //删除节点
        sifanyObjService.removeById(id);
        //删除节点属性
        List<SifanyObjAttrEntity> objAttrEntities =  sifanyObjAttrService.list(new QueryWrapper<SifanyObjAttrEntity>().eq("obj_id",id));
        List<Long> setn = new ArrayList<Long>();

        for(SifanyObjAttrEntity attr:objAttrEntities){
            setn.add(attr.getId());
            sifanyObjAttrService.removeByIds(setn);
        }
        //删除子节点
        List<SifanyObjEntity> objEntities =  sifanyObjService.list(new QueryWrapper<SifanyObjEntity>().eq("parent_id",id));
        List<Long> child_id = new ArrayList<Long>();
        for(SifanyObjEntity child_obj:objEntities) {
            delete_child(child_obj.getId());
        }
        return "sucess";
    }


    /**
     * 修改在线监测标签
     */
    @RequestMapping("/updateonm")
    public R updateOnm(@RequestBody SifanyObjDataEntity sifanyObjData) throws UnsupportedEncodingException {
        sifanyObjDataService.updateById(sifanyObjData);
        System.out.println("data:"+sifanyObjData);
        return R.ok();
    }
    /**
     * 修改在线监测标签
     */
    @RequestMapping("/updateons")
    public R updateOns(@RequestBody SifanyObjDataEntity sifanyObjData) throws UnsupportedEncodingException {
        sifanyObjDataService.updateById(sifanyObjData);
        System.out.println("data:"+sifanyObjData);
        return R.ok();
    }
    /**
     * 修改在线监测标签
     */
    @RequestMapping("/updateofs")
    public R updateOfs(@RequestBody SifanyObjDataEntity sifanyObjData) throws UnsupportedEncodingException {
        sifanyObjDataService.updateById(sifanyObjData);
        System.out.println("data:"+sifanyObjData);
        return R.ok();
    }
}
