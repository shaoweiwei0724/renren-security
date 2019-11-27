package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;
import io.renren.modules.sys.entity.SifanyClassEntity;

import java.util.List;
import java.util.Map;

/**
 * 模型类
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */


public interface SifanyClassService extends IService<SifanyClassEntity> {

    PageUtils queryPage(Map<String, Object> params);

    PageUtils queryPageTree(Map<String, Object> params);
    List<SifanyClassEntity> swanList(QueryWrapper queryWrapper);

    List<SifanyClassEntity> queryList(Map<String, Object> map);

    R toObj(Long[] ids);

    R getMap(Long id);

    List<SifanyClassEntity> scadalist();
}



