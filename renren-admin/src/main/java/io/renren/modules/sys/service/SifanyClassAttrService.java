package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyClassAttrEntity;

import java.util.List;
import java.util.Map;

/**
 * 模型类属性
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
public interface SifanyClassAttrService extends IService<SifanyClassAttrEntity> {

    PageUtils queryPage(Map<String, Object> params);

    List<SifanyClassAttrEntity> queryList(Map<String, Object> map);
}

