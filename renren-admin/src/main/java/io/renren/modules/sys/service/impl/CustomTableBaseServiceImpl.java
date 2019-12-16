package io.renren.modules.sys.service.impl;

import io.renren.modules.sys.entity.CustomFieldEntity;
import io.renren.modules.sys.entity.CustomTableEntity;
import io.renren.modules.sys.service.CustomFieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.CustomTableBaseDao;
import io.renren.modules.sys.entity.CustomTableBaseEntity;
import io.renren.modules.sys.service.CustomTableBaseService;


@Service("customTableBaseService")
public class CustomTableBaseServiceImpl extends ServiceImpl<CustomTableBaseDao, CustomTableBaseEntity> implements CustomTableBaseService {
    @Autowired
    private CustomFieldService customFieldService;
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
       /* IPage<CustomTableBaseEntity> page = this.page(
                new Query<CustomTableBaseEntity>().getPage(params),
                new QueryWrapper<CustomTableBaseEntity>()
        );*/

        List<CustomFieldEntity> listext = extendFields();
        IPage<List<Map<String, Object>>> page =  this.baseMapper.selectCustomFieldPage(new Query<CustomTableBaseEntity>().getPage(params),Long.valueOf(params.get("selected_id").toString()), listext);
        return new PageUtils(page);
    }

    private List<CustomFieldEntity> extendFields() {
        List<CustomFieldEntity> list =    customFieldService.list(new QueryWrapper<CustomFieldEntity>());
        return list;
    }


}
