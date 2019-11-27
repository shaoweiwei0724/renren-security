package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SwanRunEntityEntity;


import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * 运行实例
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-07-19 10:50:22
 */
public interface SwanRunEntityService extends IService<SwanRunEntityEntity> {
    PageUtils queryPage(Map<String, Object> params);
    List<SwanRunEntityEntity> getByPyControlId(long pyControlId) throws SQLException;
    List<SwanRunEntityEntity> getCodes(Long[] ids);
}

