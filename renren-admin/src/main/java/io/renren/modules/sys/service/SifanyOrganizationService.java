package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SifanyOrganizationEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 组织机构管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-04-26 16:06:52
 */
public interface SifanyOrganizationService extends IService<SifanyOrganizationEntity> {

    PageUtils queryPage(Map<String, Object> params);

    List<SifanyOrganizationEntity> queryList(Map<String, Object> map);

    List<Long> queryDetpIdList(Long parentId);
    /**
     * 获取子部门ID，用于数据过滤
     */
    List<Long> getSubDeptIdList(Long deptId);
}

