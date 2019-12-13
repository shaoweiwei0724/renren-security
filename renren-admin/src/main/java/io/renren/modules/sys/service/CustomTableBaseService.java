package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.CustomTableBaseEntity;

import java.util.Map;

/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-12 14:17:31
 */
public interface CustomTableBaseService extends IService<CustomTableBaseEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

