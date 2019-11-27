package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.SifanyClassAttrTypeEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 模型类属性类型
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@Mapper
public interface SifanyClassAttrTypeDao extends BaseMapper<SifanyClassAttrTypeEntity> {
    List<SifanyClassAttrTypeEntity> queryList(Map<String, Object> params);
}
