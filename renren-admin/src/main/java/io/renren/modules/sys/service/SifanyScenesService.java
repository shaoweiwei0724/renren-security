package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyScenesEntity;

import java.util.Map;

/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-31 15:26:56
 */
public interface SifanyScenesService extends IService<SifanyScenesEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

