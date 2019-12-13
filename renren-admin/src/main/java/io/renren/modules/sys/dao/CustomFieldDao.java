package io.renren.modules.sys.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import io.renren.modules.sys.entity.CustomFieldEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 模型实例数据
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@Mapper
public interface CustomFieldDao extends BaseMapper<CustomFieldEntity> {

}
