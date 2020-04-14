package io.renren.modules.sys.service;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyDataTextEntity;
import org.dom4j.DocumentException;

import java.util.Map;

/**
 * 文本数据
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-30 20:15:26
 */
public interface SifanyDataTextService extends IService<SifanyDataTextEntity> {

    PageUtils queryPage(Map<String, Object> params);
    JSONObject getGJson(String content) throws DocumentException;
}

