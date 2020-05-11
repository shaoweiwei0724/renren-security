package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyClassPropEntity;

import java.util.Map;

/**
 * 模型类属性
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-05-11 11:33:27
 */
public interface SifanyClassPropService extends IService<SifanyClassPropEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

