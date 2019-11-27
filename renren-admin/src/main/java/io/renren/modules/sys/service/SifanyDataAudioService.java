package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyDataAudioEntity;

import java.util.Map;

/**
 * 音频数据
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-30 20:15:26
 */
public interface SifanyDataAudioService extends IService<SifanyDataAudioEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

