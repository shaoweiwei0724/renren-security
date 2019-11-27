package io.renren.modules.sys.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;
import io.renren.common.validator.ValidatorUtils;
import io.renren.modules.sys.entity.SwanPyControlEntity;
import io.renren.modules.sys.entity.SwanRunEntityEntity;
import io.renren.modules.sys.service.SwanPyControlService;
import io.renren.modules.sys.service.SwanRunEntityService;
import io.renren.modules.sys.utils.PyUntil;
import org.apache.commons.io.FileUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.sql.Types.NULL;


/**
 * 脚本控制; InnoDB free: 88064 kB
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-07-05 16:29:02
 */
@RestController
@RequestMapping("sys/swanpycontrol")
public class SwanPyControlController {
    @Autowired
    private SwanRunEntityService swanRunEntityService;
    @Autowired
    private SwanPyControlService swanPyControlService;

    public static int runtype = 0;

    private SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:swanpycontrol:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = swanPyControlService.queryPage(params);
        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:swanpycontrol:info")
    public R info(@PathVariable("id") Long id){
        SwanPyControlEntity swanPyControl = swanPyControlService.getById(id);

        return R.ok().put("swanPyControl", swanPyControl);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:swanpycontrol:save")
    public R save(@RequestBody SwanPyControlEntity swanPyControl){
        String scripPath = swanPyControlService.getSuperPath() + swanPyControl.getName() + ".py";
        write2File(swanPyControl, scripPath);
        swanPyControl.setPath(scripPath);
        swanPyControlService.save(swanPyControl);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:swanpycontrol:update")
    public R update(@RequestBody SwanPyControlEntity swanPyControl){

        SwanPyControlEntity swanPyControl1 =swanPyControlService.getById(swanPyControl.getId());
        String name1 = swanPyControl1.getName();
        String name2 = swanPyControl.getName();
        if(name1 != name2){
            String Path = swanPyControl1.getPath();
//            System.out.println(Path);
            File file = new File(Path);
            if (file.exists()) {
                file.delete();
            }
        }
        ValidatorUtils.validateEntity(swanPyControl);
        String scripPath = swanPyControlService.getSuperPath()+swanPyControl.getName() + ".py";
        write2File(swanPyControl, scripPath);
        swanPyControl.setPath(scripPath);
        swanPyControlService.updateById(swanPyControl);
        
        return R.ok();
    }

    private void write2File(@RequestBody SwanPyControlEntity swanPyControl, String scripPath) {
//        try {
//            FileWriter fileWriter=new FileWriter(scripPath);
//            fileWriter.write(swanPyControl.getTxtt());
//            fileWriter.flush();
//            fileWriter.close();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        try {

            FileUtils.write(new File(scripPath), swanPyControl.getTxtt(),"UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:swanpycontrol:delete")
    public R delete(@RequestBody Long[] ids){
        for(Long id : ids) {
            SwanPyControlEntity swanPyControl = swanPyControlService.getById(id);
            String Path = swanPyControl.getPath();
//            System.out.println(Path);
            File file = new File(Path);
            if (file.exists()) {
                file.delete();
            }
        }
        swanPyControlService.removeByIds(Arrays.asList(ids));
        return R.ok();
    }

    /**
     * 开始
     */
    @RequestMapping("/run")
    @RequiresPermissions("sys:swanpycontrol:delete")
    public R run(@RequestBody List<Long> ids){

        long begintime = System.currentTimeMillis();
        List<SwanPyControlEntity> swanPyControlEntityList= (List<SwanPyControlEntity>) swanPyControlService.listByIds(ids);

        for(SwanPyControlEntity swanPyControlEntity:swanPyControlEntityList){
            if(PyUntil.scan(swanPyControlEntity.getName())){
                continue;
            }
            String filePath = swanPyControlService.getSuperPath() + "py_control_txt\\" + swanPyControlEntity.getName() + begintime + ".txt";
            SwanRunEntityEntity swanRunEntityEntity = new SwanRunEntityEntity();
            swanRunEntityEntity.setStartTime(begintime);
            swanRunEntityEntity.setPyControlId(swanPyControlEntity.getId());
            swanRunEntityEntity.setCodeUrl(swanPyControlEntity.getPath());
            swanRunEntityEntity.setOutputPath(filePath);
            swanRunEntityEntity.setCodeDetail(swanPyControlEntity.getTxtt());
//            swanRunEntityEntity.setPid(swanPyControlEntity.getPid());
            swanRunEntityService.save(swanRunEntityEntity);
//            SwanRunEntityEntity swanRunEntityEntity1=swanRunEntityService.getOne(new QueryWrapper<SwanRunEntityEntity>().eq("py_control_id",swanPyControlEntity.getId())
//                    .eq("start_time",begintime));
            swanPyControlEntity.setEntityId(swanRunEntityEntity.getId());
            swanPyControlService.updateById(swanPyControlEntity);
//            System.out.println(JSONObject.toJSON(swanPyControlEntity));

            String result= PyUntil.start(swanPyControlEntity.getName(),filePath);
//            System.out.println("result:"+result);
        }
        return R.ok();
    }

    /**
     * 停止
     */
    @RequestMapping("/stop")
    @RequiresPermissions("sys:swanpycontrol:delete")
    public R stop(@RequestBody List<Long> ids){
        runtype = 1;
        List<SwanPyControlEntity> swanPyControlEntityList= (List<SwanPyControlEntity>) swanPyControlService.listByIds(ids);
        Integer status;
        Integer pid;
        long endtime;
        Map<String, Object> map = new HashMap<String,Object>();

        for(SwanPyControlEntity swanPyControlEntity:swanPyControlEntityList){
//            map.put("pid",Long.valueOf(swanPyControlEntity.getPid()));
//            List<SwanRunEntityEntity> swanRunEntityEntityList = ((List<SwanRunEntityEntity>)(swanRunEntityService.listByMap(map)));
            SwanRunEntityEntity swanRunEntityEntity=swanRunEntityService.getOne(new QueryWrapper<SwanRunEntityEntity>().eq("py_control_id",swanPyControlEntity.getId())
                                            .isNull("end_type"));

            if (!PyUntil.scan(swanPyControlEntity.getName())) {
                continue;
            }
//            System.out.println(JSONObject.toJSON(swanPyControlEntity));

            String result= PyUntil.stop(swanPyControlEntity.getName());
//            System.out.println("result:" + result);
            endtime = System.currentTimeMillis();
            swanRunEntityEntity.setEndType(1);
            swanRunEntityEntity.setEndTime(endtime);
            swanRunEntityEntity.setPyOutput(PyUntil.readTxtFile(swanRunEntityEntity.getOutputPath()));
            swanRunEntityService.updateById(swanRunEntityEntity);
            swanPyControlEntity.setStates(0);
            swanPyControlEntity.setPid(NULL);
            swanPyControlEntity.setEntityId(new Long(NULL));
            swanPyControlService.updateById(swanPyControlEntity);
        }
        runtype = 0;
        return R.ok();
    }

}
