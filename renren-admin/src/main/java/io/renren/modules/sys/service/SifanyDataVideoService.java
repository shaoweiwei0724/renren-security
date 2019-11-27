package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyDataVideoEntity;

import java.util.Map;

/**
 * 视频数据
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-30 20:15:26
 */
public interface SifanyDataVideoService extends IService<SifanyDataVideoEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

