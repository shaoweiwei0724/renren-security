package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SwanPyControlEntity;


import java.util.Map;

/**
 * 脚本控制; InnoDB free: 88064 kB
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-07-05 16:29:02
 */
public interface SwanPyControlService extends IService<SwanPyControlEntity> {


    PageUtils queryPage(Map<String, Object> params);
    String getSuperPath();
}

