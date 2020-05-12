package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyObjPropEntity;

import java.util.Map;

/**
 * 模型实例属性关系表
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-05-12 16:26:46
 */
public interface SifanyObjPropService extends IService<SifanyObjPropEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

