package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.SifanyOrganizationEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 组织机构管理
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-04-26 16:06:52
 */
@Mapper
public interface SifanyOrganizationDao extends BaseMapper<SifanyOrganizationEntity> {

    List<SifanyOrganizationEntity> queryList(Map<String, Object> params);


    /**
     * 查询子部门ID列表
     * @param parentId  上级部门ID
     */
    List<Long> queryDetpIdList(Long parentId);
}
