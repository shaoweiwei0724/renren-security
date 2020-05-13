package io.renren.modules.sys.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import io.renren.modules.sys.entity.SifanyClassAttrEntity;
import io.renren.modules.sys.entity.SifanyClassEntity;
import io.renren.modules.sys.service.SifanyClassAttrService;
import io.renren.modules.sys.service.SifanyClassService;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyDataTextDao;
import io.renren.modules.sys.entity.SifanyDataTextEntity;
import io.renren.modules.sys.service.SifanyDataTextService;


@Service("sifanyDataTextService")
public class SifanyDataTextServiceImpl extends ServiceImpl<SifanyDataTextDao, SifanyDataTextEntity> implements SifanyDataTextService {

    @Autowired
    private SifanyClassAttrService sifanyClassAttrService;
    @Autowired
    private SifanyClassService sifanyClassService;
    @Autowired
    private SifanyDataTextService sifanyDataTextService;
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyDataTextEntity> page = this.page(
                new Query<SifanyDataTextEntity>().getPage(params),
                new QueryWrapper<SifanyDataTextEntity>()
        );

        return new PageUtils(page);
    }

    @Override
    public JSONObject getGJson(String contents) throws DocumentException {
        SAXReader reader = new SAXReader();
        JSONObject object=new JSONObject();


        Document document = reader.read(new ByteArrayInputStream(contents.getBytes()));

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
                if(childElement.getName().equals("ConnectLine")||childElement.getName().equals("ACLineEnd")||childElement.getName().equals("DCLineEnd")) {

                    //获取属性名称
                    link.put("name", childElement.getName());
                    link.put("category",childElement.getName());
                    //获取子节点标签属性
                    Iterator link_attrChildElement = childElement.attributeIterator();
                    while (link_attrChildElement.hasNext()) {
                        Attribute attrChild = (Attribute) link_attrChildElement.next();
                        //将坐标的属性名换成points
                        if(attrChild.getName().equals("d")) {
                            String points=attrChild.getValue().replaceAll(" ",",");
                            String link_points[]=points.split(",|;");
                            double[] link_points_int=new double[link_points.length];
                            for(int i=0;i<link_points.length;i++){
                                link_points_int[i]=Double.parseDouble(link_points[i]);
                            }
//                            if(link_points_int.length == 4) {
//                                link_points_int[0] += -0.5;
//                                link_points_int[2] += -0.5;
//                            }
                            System.out.println("points:"+link_points_int);
                            link.put("points",link_points_int);
                        }
                        //选择连接点
                        else if(attrChild.getName().equals("link")){
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
                        else if(attrChild.getName().equals("lc")){
                            link.put("stroke_color","rgb("+attrChild.getValue()+")");
                        }
                        //添加填充色
                        else if(attrChild.getName().equals("fc")){
                            link.put("fill_color","rgb("+attrChild.getValue()+")");
                        }
                        //添加线的形式
                        else if(attrChild.getName().equals("ls")){
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
//                        else if(attrChild.getName()=="tfr"){
                        else if(attrChild.getName().equals("tfr")){
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
                    if(!childElement.getName().equals("Text")&& !childElement.getName().equals("Station")&&!childElement.getName().equals("EnergyConsumer")){
                        id+=1;
                        List<SifanyClassEntity> classEntities =  sifanyClassService.list(new QueryWrapper<SifanyClassEntity>().eq("code",childElement.getName()));
                        if(classEntities.size()==0){
                            node.put("attrs","");
                        }
                        else {
                            for(SifanyClassEntity classEntitie:classEntities){
                                System.out.println("objId:"+classEntitie.getId());
                                //保存属性
//                                List<SifanyClassAttrEntity> classAttrEntities =  sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq("class_id",classEntitie.getId()));
//                                for(SifanyClassAttrEntity attr:classAttrEntities){
//                                    id+=1;
//                                    JSONObject attr1=new JSONObject();
//                                    attr1.put("id",id);
//                                    attr1.put("name",attr.getName());
//                                    attr1.put("value","0");
//                                    attr1.put("onm",true);
//                                    attr1.put("ons",true);
//                                    attr1.put("ofs",true);
//                                    attrs.add(attr1);
//                                }
//                                node.put("attrs",attrs);
                                //保存类信息
                                node.put("source",classEntitie);
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
                        String angle = node.getString("angle");
                        double angle_num = 0;
                        if(Objects.nonNull(angle))
                            angle_num = Double.parseDouble(angle);
                        double poss[] = new double[2];

                        //将坐标属性替换成pos(x,y)格式
                        if (attrChild.getName().equals("x")) {
//                            poss[0] = Double.parseDouble(attrChild.getValue()) -1;
//                            poss[1] = Double.parseDouble(Y)-1.5;
                            poss[0] = Double.parseDouble(attrChild.getValue());
                            poss[1] = Double.parseDouble(Y);

                            //坐标转换到元件中心，之前在左上角
//                            if(angle_num == 90.0 || angle_num ==270.0)
                                poss = getCenterXY(poss,node.getString("category"),angle_num);
                            if (lab == 1) {
                                node.put("pos", poss[0] + " " + poss[1]);
                            } else {
                                X = attrChild.getValue();
                                lab += 1;
                            }
                        }
                        else if (attrChild.getName().equals("y")) {
//                            poss[0] = Double.parseDouble(X) -1;
//                            poss[1] = Double.parseDouble(attrChild.getValue()) - 1.5;
                            poss[0] = Double.parseDouble(X);
                            poss[1] = Double.parseDouble(attrChild.getValue());

                            //坐标转换到元件中心，之前在左上角
//                            if(angle_num > 0)
                                poss = getCenterXY(poss,node.getString("category"),angle_num);
                            if (lab == 1) {
                                node.put("pos", poss[0] + " " + poss[1]);
                            } else {
                                Y = attrChild.getValue();
                                lab += 1;
                            }
                        }
                        else if (attrChild.getName().equals("x1")||attrChild.getName().equals("x2")) {
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
                        else if (attrChild.getName().equals("y1")||attrChild.getName().equals("y2")) {
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
                        else if (attrChild.getName().equals("id")) {
                            if(childElement.getName().equals("BusbarSection")){
                                node.put("category", attrChild.getValue());
                            }
                            node.put("key", attrChild.getValue());
                        }

                        //添加线色
                        else if (attrChild.getName().equals("lc")) {
                            node.put("stroke_color", "rgb(" + attrChild.getValue() + ")");
                        }

                        //添加填充色
                        else if (attrChild.getName().equals("fc")) {
                            node.put("fill_color", "rgb(" + attrChild.getValue() + ")");
                        }

                        //添加线的形式
                        else if (attrChild.getName().equals("ls")) {
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
                        else if (attrChild.getName().equals("tfr")) {
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
                        else if (attrChild.getName().equals("sta")) {
                            if(!childElement.getName().equals("BusbarSection")&&!childElement.getName().equals("Station")&&!childElement.getName().equals("EnergyConsumer")){
                                String category = node.getString("category");
                                node.put("category", category + "_" + attrChild.getValue());


                            }
                        }
                        //获取Station的状态
                        else if (attrChild.getName().equals("shapeType")) {
                            if(childElement.getName().equals("Station")){
                                String category = node.getString("category");
                                node.put("category", category + "_" + attrChild.getValue());
                            }
                        }
                        else if (attrChild.getName().equals("stationType")) {
                            if(childElement.getName().equals("Station")){
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
//                                        List<SifanyClassAttrEntity> classAttrEntities =  sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq("class_id",classEntitie.getId()));
//                                        for(SifanyClassAttrEntity attr:classAttrEntities){
//                                            id+=1;
//                                            JSONObject attr1=new JSONObject();
//                                            attr1.put("id",id);
//                                            attr1.put("objName",attr.getName());
//                                            attr1.put("value","0");
//                                            attrs.add(attr1);
//                                        }
//                                        node.put("attrs",attrs);
                                        node.put("source",classEntitie);
                                    }
                                }
                            }
                        }
                        //获取EnergyConsumer的状态
                        else if (attrChild.getName().equals("loadType")) {
                            if(childElement.getName().equals("EnergyConsumer")){
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
//                                        List<SifanyClassAttrEntity> classAttrEntities =  sifanyClassAttrService.list(new QueryWrapper<SifanyClassAttrEntity>().eq("class_id",classEntitie.getId()));
//                                        for(SifanyClassAttrEntity attr:classAttrEntities){
//                                            id+=1;
//                                            JSONObject attr1=new JSONObject();
//                                            attr1.put("id",id);
//                                            attr1.put("objName",attr.getName());
//                                            attr1.put("value","0");
//                                            attrs.add(attr1);
//                                        }
//                                        node.put("attrs",attrs);
                                        node.put("source",classEntitie);
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
                    if(childElement.getName().equals("BusbarSection")){
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

                                if(pin_attr.getName().equals("lc")){
                                    pin_port.put("stroke_color", "rgb(" + pin_attr.getValue() + ")");
                                }
                                //添加填充色
                                else if (pin_attr.getName().equals("fc")) {
                                    pin_port.put("fill_color", "rgb(" + pin_attr.getValue() + ")");
                                }
                                else if(pin_attr.getName().equals("r")){
                                    int r=Integer.parseInt(pin_attr.getValue())*2;
                                    pin_port.put("r", r);
                                }
                                else if (pin_attr.getName().equals("cx")) {
                                    if(x1!=0&&x2!=0){
                                        x_min=x1<x2?x1:x2;
                                        x_pin=x1>x2?x1-x2:x2-x1;
                                        if(x_pin==0)
                                        {
                                            x_pin=0.5;
                                        }
                                        else {
                                            x_pin=(Double.parseDouble(pin_attr.getValue())-x_min + 0.5)/x_pin;
//                                            String x_pin_s = String.format("%.2f",x_pin);
//                                            x_pin=Double.parseDouble(x_pin_s);
                                        }

                                        pin_port.put("x_pin",x_pin);
                                    }
                                }
                                else if (pin_attr.getName().equals("cy")) {
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
                    if("Transformer2".equals(node.getString("type"))) { //设置两卷变颜色
                        ArrayList strokes = new ArrayList();
//                        ArrayList strokes2 = new ArrayList();
                        ArrayList geometrys = new ArrayList();
                        Double v1 = node.getDouble("voltype1");
                        Double v2 = node.getDouble("voltype2");
                        strokes = getStrokes(v1,v2,strokes);
//                                    strokes.add("A");
//                                    strokes.add("B");
//                        node.put("geometry_2_stroke1",getStroke(v1));
//                        node.put("geometry_2_stroke2",getStroke(v2));
                        node.put("geometry_2_stroke",strokes);
                        geometrys.add("geometry_top");
                        geometrys.add("geometry_bottom");
                        node.put("geometry_2",geometrys);
                    }

                    if("Transformer3".equals(node.getString("type"))) { //设置三卷变颜色
                        ArrayList strokes = new ArrayList();
                        Double v1 = node.getDouble("voltype1");
                        Double v2 = node.getDouble("voltype2");
                        Double v3 = node.getDouble("voltype3");
                        strokes.add(getStroke(v1));
                        strokes.add(getStroke(v2));
                        strokes.add(getStroke(v3));
//
                        node.put("geometry_3_stroke",strokes);
                    }
                    node_list.add(node);//保存节点信息
                }
            }
            object.put("node",node_list);
            object.put("link",link_list);
        }
//        System.out.println(object.toString());
        return object;
    }

    //js里把旋转中心改为center之后需要修改x,y坐标
    private double[] getCenterXY(double[] poss, String category, double angle) {
        if (category.contains("Disconnector")){ //12,36
            if(angle == 90.0 || angle == 270.0) {
                poss[0] += 18;
                poss[1] += 6;
                return poss;
            }else{
                poss[1] += 18;
                poss[0] += 6;
                return poss;
            }
        }

        if (category.contains("Capacitor_P")){ //25.6,36.8
            if(angle == 90.0 || angle == 270.0) {
                poss[0] += 18.4;
                poss[1] += 12.8;
                return poss;
            }else{
                poss[1] += 18.4;
                poss[0] += 12.8;
                return poss;
            }
        }

        if (category.contains("Capacitor_S")){ //20.8,25.6
            if(angle == 90.0 || angle == 270.0) {
                poss[0] += 12.8;
                poss[1] += 10.4;
                return poss;
            }else{
                poss[1] += 12.8;
                poss[0] += 10.4;
                return poss;
            }
        }

        if (category.contains("Breaker")){ //8,26
            if(angle == 90.0 || angle == 270.0) {
                poss[0] += 13;
                poss[1] += 4;
                return poss;
            }else{
                poss[1] += 13;
                poss[0] += 4;
                return poss;
            }
        }

        if (category.contains("EnergyConsumer_0")){ //24,24
            poss[0] += 11.9999999995;
            poss[1] += 11.9999999995;
            return poss;

        }
//
        if (category.contains("EnergyConsumer_1")){  //32,32
            poss[0] += 16;
            poss[1] += 16;
            return poss;
        }

        if (category.contains("GeneralMeter_0")){ //26,66
            if(angle == 90.0 || angle == 270.0) {
                poss[0] += 33;
                poss[1] += 13;
                return poss;
            }else{
                poss[1] += 33;
                poss[0] += 13;
                return poss;
            }
        }

        if (category.contains("Generator_0")){ //32,32
            poss[0] += 16;
            poss[1] += 16;
            return poss;
        }

        if (category.contains("GroundDisconnector")){ //20.8,51.2
            if(angle == 90.0 || angle == 270.0) {
                poss[0] += 25.6;
                poss[1] += 10.4;
                return poss;
            }else{
                poss[1] += 25.6;
                poss[0] += 10.4;
                return poss;
            }
        }

        if (category.contains("Reactor_P")){ //20.8,45.6
            if(angle == 90.0 || angle == 270.0) {
                poss[0] += 22.8;
                poss[1] += 10.4;
                return poss;
            }else{
                poss[1] += 22.8;
                poss[0] += 10.4;
                return poss;
            }
        }

        if (category.contains("Reactor_S")){ //33.6，20.8
            if(angle == 90.0 || angle == 270.0) {
                poss[0] += 10.4;
                poss[1] += 12.8;
                return poss;
            }else{
                poss[1] += 10.4;
                poss[0] += 12.8;
                return poss;
            }
        }

        if (category.contains("Reactor_S")){ //33.6，20.8
            if(angle == 90.0 || angle == 270.0) {
                poss[0] += 10.4;
                poss[1] += 12.8;
                return poss;
            }else{
                poss[1] += 10.4;
                poss[0] += 12.8;
                return poss;
            }
        }

        if (category.contains("1_Station")){ //32，32
            poss[0] += 16;
            poss[1] += 16;
            return poss;
        }

        if (category.contains("2_Station")){ //42，30
            if(angle == 90.0 || angle == 270.0) {
                poss[0] += 15;
                poss[1] += 21;
                return poss;
            }else{
                poss[1] += 15;
                poss[0] += 30;
                return poss;
            }
        }

        if (category.contains("Transformer2")){ //32，59.2
            if(angle == 90.0 || angle == 270.0) {
                poss[0] += 29.6;
                poss[1] += 16;
                return poss;
            }else{
                poss[1] += 29.6;
                poss[0] += 16;
                return poss;
            }
        }
        if (category.contains("Transformer3")){ //54.4，59.2
            if(angle == 90.0 || angle == 270.0) {
                poss[0] += 29.6;
                poss[1] += 27.2;
                return poss;
            }else{
                poss[1] += 29.6;
                poss[0] += 27.2;
                return poss;
            }
        }
        return poss;
    }



    private ArrayList getStrokes(Double v1, Double v2, ArrayList strokes) {
        strokes.add(getStroke(v1));
        strokes.add(getStroke(v2));
        return  strokes;
    }

    private String getStroke(Double v) {

        if(v == 0) //灰色
            return "rgba(128,128,128)";
//            return "A";
        if(v > 0 && v < 6) //
            return "rgba(0,169,169)";
//            return "A";
        if(v >= 6 && v < 10) //深蓝
            return "rgba(0,0,139)";
//            return "B";
        if(v >= 10 && v < 13)
            return "rgba(185,72,66)";
//            return "C";
        if(v >= 13 && v < 15)
            return "rgba(0,210,0)";
//            return "D";
        if(v >= 15 && v < 20)
            return "rgba(0,128,0)";
//            return "E";
        if(v >= 20 && v < 35)
            return "rgba(226,172,6)";
//            return "F";
        if(v >= 35 && v < 66)
            return "rgba(255,255,0)";
//            return "G";
        if(v >= 66 && v < 110)
            return "rgba(255,204,0)";
//            return "H";
        if(v >= 110 && v < 220)
            return "rgba(240,65,128)";
//            return "L";
        if(v >= 220 && v < 330)
            return "rgba(128,0,128)";
//            return "M";
        if(v >= 330 && v < 500)
            return "rgba(255,0,0)";
//            return "N";
        if(v >= 500 && v < 660)
            return "rgba(255,0,0)";
//            return "O";
        if(v >= 660 && v < 750)
            return "rgba(250,128,10)";
//            return "P";
        if(v >= 750 && v < 800)
            return "rgba(250,128,10)";
//            return "Q";
        if(v >= 800 && v < 1000)
            return "rgba(0,0,255)";
//            return "R";
        else // >=1000
            return "rgba(0,0,0)";
//            return "R";
    }


}
