package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyObjAttrEntity;

import java.util.List;
import java.util.Map;

/**
 * 模型类属性
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
public interface SifanyObjAttrService extends IService<SifanyObjAttrEntity> {

    PageUtils queryPage(Map<String, Object> params);

    List<SifanyObjAttrEntity> queryList(Map<String, Object> map);
}

