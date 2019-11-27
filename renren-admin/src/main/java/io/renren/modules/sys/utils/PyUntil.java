package io.renren.modules.sys.utils;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.io.*;

public class PyUntil {
    public static boolean scan(String name){
        String url = "http://127.0.0.1:5000/scan";
        JSONObject json = new JSONObject();
        json.put("name",name);
        String result = HttpStringPostRequest(url, json.toString());
        int status = Integer.parseInt(result);
        if(status==1){
            return true;
        }
        return false;

    }
    public static String start(String name,String superPath){
        String url="http://127.0.0.1:5000/start";
        JSONObject json=new JSONObject();
        json.put("name",name);
        json.put("filepath",superPath);
        return HttpStringPostRequest(url,json.toString());
    }
    public static String stop(String name){
        String url = "http://127.0.0.1:5000/stop";
        JSONObject json = new JSONObject();
        json.put("name", name);

        return HttpStringPostRequest(url,json.toString());
    }

    public static String secrete(String name){
        String url = "http://127.0.0.1:5000/secrete";
        JSONObject json = new JSONObject();
        json.put("name", name);

        return HttpStringPostRequest(url,json.toString()).replace("\"","").replace("\"","");
    }

//    public static String delete_all_orders(String name){
//        String url = "http://127.0.0.1:5000/delete_all_orders";
//        JSONObject json = new JSONObject();
//        json.put("name", name);
//
//        return HttpStringPostRequest(url,json.toString()).replace("\"","").replace("\"","");
//    }

    public static String readTxtFile(String filePath) {
        String py_output = "";
        try {
            String encoding = "GBK";
            File file = new File(filePath);
            if (file.isFile() && file.exists()) { // 判断文件是否存在
                InputStreamReader read = new InputStreamReader(new FileInputStream(file), encoding);// 考虑到编码格式
                BufferedReader bufferedReader = new BufferedReader(read);

                String lineTxt = null;
                while ((lineTxt = bufferedReader.readLine()) != null) {
                    py_output = py_output + lineTxt + "\n";
                }
                read.close();
            }
        } catch (Exception e) {
            System.out.println("读取文件内容出错");
            e.printStackTrace();
        }
        return py_output;
    }
    public static  String HttpStringPostRequest(String url, String json) {

//        System.out.println("HttpStringPostRequest - result - url:" + url);
//        System.out.println("HttpStringPostRequest - result - json:" + json);
        String returnValue = "这是默认返回值，接口调用失败";
        CloseableHttpClient httpClient = HttpClients.createDefault();
        ResponseHandler<String> responseHandler = new BasicResponseHandler();
        try{
            //第一步：创建HttpClient对象
            httpClient = HttpClients.createDefault();

            //第二步：创建httpPost对象
            HttpPost httpPost = new HttpPost(url);

            //第三步：给httpPost设置JSON格式的参数
            StringEntity requestEntity = new StringEntity(json,"utf-8");
            requestEntity.setContentEncoding("UTF-8");

//            System.out.println("requestEntity:" + requestEntity);
            httpPost.setHeader("Content-type", "application/json");

            httpPost.setEntity(requestEntity);

            //第四步：发送HttpPost请求，获取返回值
            returnValue = httpClient.execute(httpPost,responseHandler); //调接口获取返回值时，必须用此方法
        }
        catch(Exception e)
        {
            e.printStackTrace();
        } finally {
            try {
                httpClient.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        //第五步：处理返回值
        return returnValue;
    }
}
