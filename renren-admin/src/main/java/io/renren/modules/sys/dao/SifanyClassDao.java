package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.SifanyClassEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 模型类
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@Mapper
public interface SifanyClassDao extends BaseMapper<SifanyClassEntity> {
    List<SifanyClassEntity> queryList(Map<String, Object> params);
}
