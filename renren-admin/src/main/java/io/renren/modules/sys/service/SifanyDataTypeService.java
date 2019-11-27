package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyDataTypeEntity;

import java.util.Map;

/**
 * 数据类型
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
public interface SifanyDataTypeService extends IService<SifanyDataTypeEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

