package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;
import io.renren.modules.sys.entity.SifanyObjEntity;

import java.util.List;
import java.util.Map;

/**
 * 模型实例
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
public interface SifanyObjService extends IService<SifanyObjEntity> {

    PageUtils queryPageTree(Map<String, Object> params);
    PageUtils queryPage(Map<String, Object> params);
    PageUtils queryOrg(Map<String, Object> params);
    List<SifanyObjEntity> swanList(QueryWrapper queryWrapper);

    List<SifanyObjEntity> queryList(Map<String, Object> map);

    List<SifanyObjEntity> scadalist();
    void toObj(SifanyObjEntity sifanyObjEntity);
    void GtoObj(SifanyObjEntity sifanyObjEntity);
}

