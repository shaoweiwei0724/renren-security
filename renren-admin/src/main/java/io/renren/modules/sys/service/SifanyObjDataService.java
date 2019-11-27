package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyObjDataEntity;

import java.util.Map;

/**
 * 模型实例数据
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
public interface SifanyObjDataService extends IService<SifanyObjDataEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

