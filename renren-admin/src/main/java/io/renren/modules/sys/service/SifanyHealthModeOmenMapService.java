package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyHealthModeOmenMapEntity;

import java.util.Map;

/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:07
 */
public interface SifanyHealthModeOmenMapService extends IService<SifanyHealthModeOmenMapEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

