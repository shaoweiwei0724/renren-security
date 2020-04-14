package io.renren.modules.sys.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.renren.common.exception.RRException;
import io.renren.common.utils.R;
import io.renren.modules.oss.cloud.OSSFactory;
import io.renren.modules.oss.entity.SysOssEntity;
import io.renren.modules.sys.entity.SifanyClassAttrEntity;
import io.renren.modules.sys.entity.SifanyClassEntity;
import io.renren.modules.sys.entity.SifanyDataTextEntity;
import io.renren.modules.sys.entity.SifanyObjEntity;
import io.renren.modules.sys.service.*;
import jdk.internal.org.xml.sax.InputSource;
import org.apache.commons.io.IOUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.jdom.input.SAXBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.StringReader;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.parsers.DocumentBuilder;

@RestController
@RequestMapping("sys/sifanygjson")
public class SifanyGtoJsonController extends AbstractController{
    @Autowired
    private SifanyClassAttrService sifanyClassAttrService;
    @Autowired
    private SifanyClassService sifanyClassService;
    @Autowired
    private SifanyDataTextService sifanyDataTextService;
    @Autowired
    private SifanyObjService sifanyObjService;

    @RequestMapping("/upload")
    public R upload(@RequestParam("file") MultipartFile file,@RequestParam(name = "obj_id") String obj_id) throws Exception {
        if (file.isEmpty()) {
            throw new RRException("上传文件不能为空");
        }
        Long time = System.currentTimeMillis();
        String content=IOUtils.toString(file.getInputStream());
        SifanyDataTextEntity sifanyDataTextEntity=new SifanyDataTextEntity();
        content = sifanyDataTextService.getGJson(content).toString();
        sifanyDataTextEntity.setContent(content);
        sifanyDataTextEntity.setUpdateTime(time);
        sifanyDataTextEntity.setCreateTime(time);
        System.out.println(content);
        sifanyDataTextService.save(sifanyDataTextEntity);

//
//
//        List<SifanyObjEntity> objEntities =  sifanyObjService.list(new QueryWrapper<SifanyObjEntity>().eq("id",obj_id));
//        for(SifanyObjEntity obj:objEntities){
//            obj.setCreateTime(time);
//            obj.setUpdateTime(time);
//            obj.setUserId(getUserId());
//            obj.setgId(sifanyDataTextEntity.getId());
//            sifanyObjService.updateById(obj);
//        }
        return R.ok().put("id",sifanyDataTextEntity.getId());
    }



    @ResponseBody              //将结果发送给浏览器
    @RequestMapping("/getGJson")  //接受hello请求
    public JSONObject Hello(int idd) throws Exception{
        String content = sifanyDataTextService.getById(idd).getContent();
        JSONObject object= JSONObject.parseObject(content);
        return object;
    }
}
