package io.renren.modules.sys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.SwanPyControlDao;
import io.renren.modules.sys.entity.SwanPyControlEntity;
import io.renren.modules.sys.service.SwanPyControlService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service("swanPyControlService")
public class SwanPyControlServiceImpl extends ServiceImpl<SwanPyControlDao, SwanPyControlEntity> implements SwanPyControlService {
    @Autowired
    private SysConfigServiceImpl sysConfigService;

    private String superPath=null;
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String key = (String)params.get("key");
        IPage<SwanPyControlEntity> page;
        if(key != null) {
                    page = this.page(
                    new Query<SwanPyControlEntity>().getPage(params),
                    new QueryWrapper<SwanPyControlEntity>().like(StringUtils.isNotBlank(key), "Name", key.trim())
            );
        }else{
            page = this.page(
                    new Query<SwanPyControlEntity>().getPage(params)
            );
        }
        return new PageUtils(page);
    }

    @Override
    public String getSuperPath() {
        if(this.superPath==null){
            this.superPath=sysConfigService.getValue("python_dir");
        }
        return this.superPath;
    }

}
