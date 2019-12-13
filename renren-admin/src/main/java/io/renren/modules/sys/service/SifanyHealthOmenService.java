package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyHealthOmenEntity;

import java.util.Map;

/**
 * 故障征兆
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:08
 */
public interface SifanyHealthOmenService extends IService<SifanyHealthOmenEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

