package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyDataImageEntity;

import java.util.Map;

/**
 * 图片数据
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-30 20:15:26
 */
public interface SifanyDataImageService extends IService<SifanyDataImageEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

