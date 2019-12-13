package io.renren.modules.sys.dao;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.renren.modules.sys.entity.CustomFieldEntity;
import io.renren.modules.sys.entity.CustomTableBaseEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-12 14:17:31
 */
@Mapper
public interface CustomTableBaseDao extends BaseMapper<CustomTableBaseEntity> {

    IPage<List<Map<String, Object>>> selectCustomFieldPage(IPage<CustomTableBaseEntity> page, @Param("extendFields") List<CustomFieldEntity> listext);
}
