package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyHealthModeEntity;

import java.util.Map;

/**
 * 故障模式
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:07
 */
public interface SifanyHealthModeService extends IService<SifanyHealthModeEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

