package io.renren.modules.sys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.modules.sys.dao.SwanRunEntityDao;
import io.renren.modules.sys.entity.SwanRunEntityEntity;
import io.renren.modules.sys.service.SwanRunEntityService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.utils.PyUntil;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;


@Service("swanRunEntityService")
public class SwanRunEntityServiceImpl extends ServiceImpl<SwanRunEntityDao, SwanRunEntityEntity> implements SwanRunEntityService {

    @Resource
    DataSource dataSource;

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String key = (String)params.get("key");
        IPage<SwanRunEntityEntity> page;
        if(key != null) {
            page = this.page(
                    new Query<SwanRunEntityEntity>().getPage(params),
                    new QueryWrapper<SwanRunEntityEntity>().like(StringUtils.isNotBlank(key), "py_control_id", key.trim())
            );

        }else{
            page = this.page(
                    new Query<SwanRunEntityEntity>().getPage(params)
            );
        }


        return new PageUtils(page);
    }

    @Override
    public List<SwanRunEntityEntity> getByPyControlId(long pyControlId) throws SQLException {

        return null;
    }

    @Override
    public List<SwanRunEntityEntity> getCodes(Long[] ids) {
        List<SwanRunEntityEntity> swanRunEntityEntityList=this.list(new QueryWrapper<SwanRunEntityEntity>().in("id",ids));
        for(SwanRunEntityEntity swanRunEntityEntity:swanRunEntityEntityList){
            if(swanRunEntityEntity.getEndType()==null){
                swanRunEntityEntity.setPyOutput(PyUntil.readTxtFile(swanRunEntityEntity.getOutputPath()));
            }
        }
        return swanRunEntityEntityList;

    }
}
