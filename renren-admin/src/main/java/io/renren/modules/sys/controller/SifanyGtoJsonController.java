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
import io.renren.modules.sys.service.SifanyClassAttrService;
import io.renren.modules.sys.service.SifanyClassService;
import io.renren.modules.sys.service.SifanyDataTextService;
import io.renren.modules.sys.service.SifanyObjAttrService;
import org.apache.commons.io.IOUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.io.File;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("sys/sifanygjson")
public class SifanyGtoJsonController extends AbstractController{
    @Autowired
    private SifanyClassAttrService sifanyClassAttrService;
    @Autowired
    private SifanyClassService sifanyClassService;
    @Autowired
    private SifanyDataTextService sifanyDataTextService;

    @RequestMapping("/upload")

    public R upload(@RequestParam("file") MultipartFile file) throws Exception {
        if (file.isEmpty()) {
            throw new RRException("上传文件不能为空");
        }
        String content=IOUtils.toString(file.getInputStream());
        SifanyDataTextEntity sifanyDataTextEntity=new SifanyDataTextEntity();
        sifanyDataTextEntity.setContent(content);
        sifanyDataTextService.save(sifanyDataTextEntity);
        return R.ok().put("id",sifanyDataTextEntity.getId());
    }



    @ResponseBody              //将结果发送给浏览器
    @RequestMapping("/getGJson")  //接受hello请求
    public JSONObject Hello() throws Exception{
        SAXReader reader = new SAXReader();
        JSONObject object=new JSONObject();
        Document document = reader.read(new File("D:\\swan-git\\doc-tuoguan\\SH.G"));
        Element root = document.getRootElement();
        Integer id=0;//元件属性的id
        //获取父节点
        Iterator it = root.elementIterator();
        while (it.hasNext()) {
            Element element = (Element) it.next();
            //获取父节点标签名
            System.out.println("<"+element.getName()+">");

            //获取父节点标签属性
            Iterator attrElement = element.attributeIterator();
            while (attrElement.hasNext()) {
                Attribute attr  = (Attribute) attrElement.next();

                System.out.println(attr.getName()+":"+attr.getValue());

            }
            //获取子节点
            JSONArray node_list = new JSONArray();
            JSONArray link_list = new JSONArray();
            Iterator childIt = element.elementIterator();
            while(childIt.hasNext()){
                //获取子节点标签名
                Element childElement=(Element) childIt.next();
                JSONObject node =new JSONObject();
                JSONObject link=new JSONObject();


                //获取连接线的属性
                if(childElement.getName()=="ConnectLine"||childElement.getName()=="ACLineEnd"||childElement.getName()=="DCLineEnd") {

                    //获取属性名称
                    link.put("name", childElement.getName());
                    link.put("category",childElement.getName());
                    //获取子节点标签属性
                    Iterator link_attrChildElement = childElement.attributeIterator();
                    while (link_attrChildElement.hasNext()) {
                        Attribute attrChild = (Attribute) link_attrChildElement.next();
                        //将坐标的属性名换成points
                        if(attrChild.getName()=="d") {
                            String points=attrChild.getValue().replaceAll(" ",",");
                            String link_points[]=points.split(",|;");
                            double[] link_points_int=new double[link_points.length];
                            for(int i=0;i<link_points.length;i++){
                                link_points_int[i]=Double.parseDouble(link_points[i]);
                            }
                            System.out.println("points:"+link_points_int);
                            link.put("points",link_points_int);
                        }
                        //选择连接点
                        else if(attrChild.getName()=="link"){
                            //连接线的第一个节点
                            String link_node[]=attrChild.getValue().split(",|;");
                            link.put("from", link_node[2]);
                            //连接线的第二个节点
                            link.put("to", link_node[5]);
                            //节点的连接端点
                            link.put("fromPort", link_node[1]);
                            link.put("toPort", link_node[4]);
                        }
                        //添加线色
                        else if(attrChild.getName()=="lc"){
                            link.put("stroke_color","rgb("+attrChild.getValue()+")");
                        }
                        //添加填充色
                        else if(attrChild.getName()=="fc"){
                            link.put("fill_color","rgb("+attrChild.getValue()+")");
                        }
                        //添加线的形式
                        else if(attrChild.getName()=="ls"){
                            Integer ls=Integer.parseInt(attrChild.getValue());
                            JSONArray dash=new JSONArray();
                            if(ls==2){
                                dash.add(4);
                                dash.add(2);
                                link.put("ls",dash);
                            }
                            else if(ls==3){
                                dash.add(1);
                                dash.add(2);
                                link.put("ls",dash);
                            }
                            else if(ls==4){
                                dash.add(4);
                                dash.add(2);
                                dash.add(1);
                                dash.add(2);
                                link.put("ls",dash);
                            }
                            else if(ls==5){
                                dash.add(4);
                                dash.add(2);
                                dash.add(1);
                                dash.add(2);
                                dash.add(1);
                                dash.add(2);
                                link.put("ls",dash);
                            }
                            else {}
                        }
                        //获取旋转的角度和比例
                        else if(attrChild.getName()=="tfr"){
                            String value=attrChild.getValue();
                            //截取角度和比例
                            JSONArray tfr=new JSONArray();
                            Pattern pattern = Pattern.compile("(?<=\\()[^\\)]+");
                            Matcher matcher = pattern.matcher(value);
                            while(matcher.find()){
                                tfr.add(matcher.group());
                            }
                            Double link_angle=Double.parseDouble(tfr.getString(0));//角度

                            //计算比例
                            String link_scale=tfr.getString(1);
                            System.out.println(link_scale);
                            String scale[]=link_scale.split(",");
                            System.out.println(scale);
                            Double sca=Double.parseDouble(scale[0])/Double.parseDouble(scale[1]);
                            System.out.println(sca);
                            //保存
                            node.put("angle",link_angle);
                            node.put("scale",sca);
                        }
                        else {
                            link.put(attrChild.getName(), attrChild.getValue());
                        }
                    }
                    link_list.add(link);//保存连接线信息
                }


                //获取节点的属性
                else {
                    String X="0",Y="0";//初始化
                    int lab=0;//初始化
                    int lab_x=0;
                    int lab_y=0;
                    double bus_x=0;
                    double bus_y=0;
                    double b_x=0;
                    double b_y=0;
                    double size_x=0;
                    double size_y=0;
                    double x1=0;
                    double x2=0;
                    double y1=0;
                    double y2=0;

                    //获取元件属性
                    JSONArray attrs=new JSONArray();
                    if(childElement.getName()!="Text"&&childElement.getName()!="Station"&&childElement.getName()!="EnergyConsumer"){
                        id+=1;
                        List<SifanyClassEntity> classEntities =  sifanyClassService.list(new QueryWrapper<SifanyClassEntity>().eq("code",childElement.getName()));
                        System.out.println("class"+classEntities);
                        System.out.println("Name:"+childElement.getName());
                        if(classEntities.size()==0){
                            node.put("attrs","");
                        }
                        else {
                            for(SifanyClassEntity classEntitie:classEntities){
                                System.out.println("objId:"+classEntitie.getId());
                                List<SifanyClassAttrEntity> classAttrEntities =  sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq("class_id",classEntitie.getId()));
                                for(SifanyClassAttrEntity attr:classAttrEntities){
                                    id+=1;
                                    JSONObject attr1=new JSONObject();
                                    attr1.put("id",id);
                                    attr1.put("objName",attr.getName());
                                    attr1.put("value","0");
                                    attrs.add(attr1);
                                }
                                node.put("attrs",attrs);
                            }
                        }

                    }
                    //获取元件类型
                    node.put("category",childElement.getName());
                    node.put("type",childElement.getName());

                    //获取子节点标签属性
                    Iterator node_attrChildElement = childElement.attributeIterator();
                    while (node_attrChildElement.hasNext()) {
                        Attribute attrChild = (Attribute) node_attrChildElement.next();

                        //将坐标属性替换成pos(x,y)格式
                        if (attrChild.getName() == "x") {
                            if (lab == 1) {
                                node.put("pos", attrChild.getValue() + " " + Y);
                            } else {
                                X = attrChild.getValue();
                                lab += 1;
                            }

                        }
                        else if (attrChild.getName() == "y") {
                            if (lab == 1) {
                                node.put("pos", X + " " + attrChild.getValue());
                            } else {
                                Y = attrChild.getValue();
                                lab += 1;
                            }
                        }
                        else if (attrChild.getName() == "x1"||attrChild.getName() == "x2") {
                            if (lab_x == 1) {
                                x2=Double.parseDouble(attrChild.getValue());
                                size_x=b_x-Double.parseDouble(attrChild.getValue());
                                b_x=b_x+Double.parseDouble(attrChild.getValue());
                                size_x=Math.abs(size_x);
                                bus_x=b_x/2;
                                if(lab==1){
                                    node.put("pos", String.valueOf(bus_x) + " " +String.valueOf(bus_y) );
                                    node.put("size", String.valueOf(size_x) + " " +String.valueOf(size_y) );
                                }
                                else {
                                    lab+=1;
                                }
                            } else {
                                x1=Double.parseDouble(attrChild.getValue());
                                b_x = Double.parseDouble(attrChild.getValue());
                                lab_x += 1;
                            }
                        }
                        else if (attrChild.getName() == "y1"||attrChild.getName() == "y2") {
                            if (lab_y == 1) {
                                y2=Double.parseDouble(attrChild.getValue());
                                size_y=b_y-Double.parseDouble(attrChild.getValue());
                                b_y=b_y+Double.parseDouble(attrChild.getValue());
                                size_y=Math.abs(size_y);
                                bus_y=b_y/2;
                                if(lab==1){
                                    node.put("pos", String.valueOf(bus_x) + " " +String.valueOf(bus_y) );
                                    node.put("size", String.valueOf(size_x) + " " +String.valueOf(size_y) );
                                }
                                else {

                                    lab+=1;
                                }
                            } else {
                                y1=Double.parseDouble(attrChild.getValue());
                                b_y = Double.parseDouble(attrChild.getValue());
                                lab_y += 1;
                            }
                        }

                        //将id换成key
                        else if (attrChild.getName() == "id") {
                            if(childElement.getName()=="BusbarSection"){
                                node.put("category", attrChild.getValue());
                            }
                            node.put("key", attrChild.getValue());
                        }

                        //添加线色
                        else if (attrChild.getName() == "lc") {
                            node.put("stroke_color", "rgb(" + attrChild.getValue() + ")");
                        }

                        //添加填充色
                        else if (attrChild.getName() == "fc") {
                            node.put("fill_color", "rgb(" + attrChild.getValue() + ")");
                        }

                        //添加线的形式
                        else if (attrChild.getName() == "ls") {
                            Integer ls = Integer.parseInt(attrChild.getValue());
                            JSONArray dash = new JSONArray();
                            if (ls == 2) {
                                dash.add(4);
                                dash.add(2);
                                node.put("ls", dash);
                            } else if (ls == 3) {
                                dash.add(1);
                                dash.add(2);
                                node.put("ls", dash);
                            } else if (ls == 4) {
                                dash.add(4);
                                dash.add(2);
                                dash.add(1);
                                dash.add(2);
                                node.put("ls", dash);
                            } else if (ls == 5) {
                                dash.add(4);
                                dash.add(2);
                                dash.add(1);
                                dash.add(2);
                                dash.add(1);
                                dash.add(2);
                                node.put("ls", dash);
                            } else {
                            }
                        }

                        //获取旋转的角度和图元的比例
                        else if (attrChild.getName() == "tfr") {
                            String value = attrChild.getValue();
                            //截取角度和比例
                            JSONArray tfr = new JSONArray();
                            Pattern pattern = Pattern.compile("(?<=\\()[^\\)]+");
                            Matcher matcher = pattern.matcher(value);
                            while (matcher.find()) {
                                tfr.add(matcher.group());
                            }
                            Double node_angle = Double.parseDouble(tfr.getString(0));//角度

                            //计算比例
                            String node_scale = tfr.getString(1);
                            System.out.println(node_scale);
                            String scale[] = node_scale.split(",");
                            System.out.println(scale);
                            Double sca = Double.parseDouble(scale[0]) / Double.parseDouble(scale[1]);
                            System.out.println(sca);
                            //保存
                            node.put("angle", node_angle);
                            node.put("scale", sca);
                        }

                        //获取节点的状态
                        else if (attrChild.getName() == "sta") {
                            if(childElement.getName()!="BusbarSection"&&childElement.getName()!="Station"&&childElement.getName()!="EnergyConsumer"){
                                String category = node.getString("category");
                                node.put("category", category + "_" + attrChild.getValue());
                            }
                        }
                        //获取Station的状态
                        else if (attrChild.getName() == "shapeType") {
                            if(childElement.getName()=="Station"){
                                String category = node.getString("category");
                                node.put("category", category + "_" + attrChild.getValue());
                            }
                        }
                        else if (attrChild.getName() == "stationType") {
                            if(childElement.getName()=="Station"){
                                String category = node.getString("category");
                                String type= node.getString("type");
                                node.put("type",attrChild.getValue()+ "_"+ type);
                                node.put("category",attrChild.getValue()+ "_"+ category);
                                id+=1;
                                List<SifanyClassEntity> classEntities =  sifanyClassService.list(new QueryWrapper<SifanyClassEntity>().eq("code",attrChild.getValue()+ "_"+childElement.getName()));
                                if(classEntities.size()==0){
                                    node.put("attrs","");
                                }
                                else {
                                    for(SifanyClassEntity classEntitie:classEntities){
                                        System.out.println("objId:"+classEntitie.getId());
                                        List<SifanyClassAttrEntity> classAttrEntities =  sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq("class_id",classEntitie.getId()));
                                        for(SifanyClassAttrEntity attr:classAttrEntities){
                                            id+=1;
                                            JSONObject attr1=new JSONObject();
                                            attr1.put("id",id);
                                            attr1.put("objName",attr.getName());
                                            attr1.put("value","0");
                                            attrs.add(attr1);
                                        }
                                        node.put("attrs",attrs);
                                    }
                                }
                            }
                        }
                        //获取EnergyConsumer的状态
                        else if (attrChild.getName() == "loadType") {
                            if(childElement.getName()=="EnergyConsumer"){
                                String category = node.getString("category");
                                String type=node.getString("type");
                                node.put("type",type + "_" + attrChild.getValue());
                                node.put("category", category + "_" + attrChild.getValue());
                                id+=1;
                                List<SifanyClassEntity> classEntities =  sifanyClassService.list(new QueryWrapper<SifanyClassEntity>().eq("code",childElement.getName()+ "_" + attrChild.getValue()));
                                if(classEntities.size()==0){
                                    node.put("attrs","");
                                }
                                else {
                                    for(SifanyClassEntity classEntitie:classEntities){
                                        System.out.println("objId:"+classEntitie.getId());
                                        List<SifanyClassAttrEntity> classAttrEntities =  sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq("class_id",classEntitie.getId()));
                                        for(SifanyClassAttrEntity attr:classAttrEntities){
                                            id+=1;
                                            JSONObject attr1=new JSONObject();
                                            attr1.put("id",id);
                                            attr1.put("objName",attr.getName());
                                            attr1.put("value","0");
                                            attrs.add(attr1);
                                        }
                                        node.put("attrs",attrs);
                                    }
                                }
                            }
                        }
                        //将其他属性添加至JSON
                        else {
                            node.put(attrChild.getName(), attrChild.getValue());
                        }
                    }


                    //保存母线的pin信息
                    if(childElement.getName()=="BusbarSection"){
                        //获取pin信息
                        Iterator Bus_pins=childElement.elementIterator();
                        JSONArray Pin=new JSONArray();
                        while(Bus_pins.hasNext()) {
                            double x_pin=0;
                            double y_pin=0;
                            double x_min=0;
                            double y_min=0;
                            Element pin_element = (Element) Bus_pins.next();
                            Iterator pin_attrElement = pin_element.attributeIterator();
                            JSONObject pin_port=new JSONObject();
                            while (pin_attrElement .hasNext()) {

                                Attribute pin_attr=(Attribute) pin_attrElement.next();

                                if(pin_attr.getName()=="lc"){
                                    pin_port.put("stroke_color", "rgb(" + pin_attr.getValue() + ")");
                                }
                                //添加填充色
                                else if (pin_attr.getName() == "fc") {
                                    pin_port.put("fill_color", "rgb(" + pin_attr.getValue() + ")");
                                }
                                else if(pin_attr.getName() == "r"){
                                    int r=Integer.parseInt(pin_attr.getValue())*2;
                                    pin_port.put("r", r);
                                }
                                else if (pin_attr.getName() == "cx") {
                                    if(x1!=0&&x2!=0){
                                        x_min=x1<x2?x1:x2;
                                        x_pin=x1>x2?x1-x2:x2-x1;
                                        if(x_pin==0)
                                        {
                                            x_pin=0.5;
                                        }
                                        else {
                                            x_pin=(Double.parseDouble(pin_attr.getValue())-x_min)/x_pin;
//                                            String x_pin_s = String.format("%.2f",x_pin);
//                                            x_pin=Double.parseDouble(x_pin_s);
                                        }

                                        pin_port.put("x_pin",x_pin);
                                    }
                                }
                                else if (pin_attr.getName() == "cy") {
                                    if(y1!=0&&y2!=0){
                                        y_min=y1<y2?y1:y2;
                                        y_pin=y1>y2?y1-y2:y2-y1;
                                        if(y_pin==0)
                                        {
                                            y_pin=0.5;
                                        }
                                        else {
                                            y_pin=(Double.parseDouble(pin_attr.getValue())-y_min)/y_pin;
//                                            String y_pin_s = String.format("%.2f",y_pin);
//                                            y_pin=Double.parseDouble(y_pin_s);
                                        }
                                        pin_port.put("y_pin",y_pin);
                                    }
                                }
                                else {
                                    pin_port.put(pin_attr.getName() ,pin_attr.getValue());
                                }

                            }
                            Pin.add(pin_port);
                        }
                        node.put("pin",Pin);
                    }
                    node_list.add(node);//保存节点信息
                }
            }
            object.put("node",node_list);
            object.put("link",link_list);
        }
        System.out.println(object.toString());
        return object;
    }
}
