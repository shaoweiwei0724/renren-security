package io.renren.modules.sys.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.renren.modules.sys.entity.SifanyObjAttrEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 模型类属性
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@Mapper
public interface SifanyObjAttrDao extends BaseMapper<SifanyObjAttrEntity> {
    List<SifanyObjAttrEntity> queryList(Map<String, Object> params);
}
