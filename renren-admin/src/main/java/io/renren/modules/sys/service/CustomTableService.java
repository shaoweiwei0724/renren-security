package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.CustomTableEntity;

import java.util.Map;

/**
 * 动态表单
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-12 14:17:30
 */
public interface CustomTableService extends IService<CustomTableEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

