package io.renren.modules.sys.dao;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.renren.modules.sys.entity.CustomFieldEntity;
import io.renren.modules.sys.entity.CustomTableEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 动态表单
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-12 14:17:30
 */
@Mapper
public interface CustomTableDao extends BaseMapper<CustomTableEntity> {


}
