package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyHealthQuotaEntity;

import java.util.Map;

/**
 * 健康指标
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:07
 */
public interface SifanyHealthQuotaService extends IService<SifanyHealthQuotaEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

