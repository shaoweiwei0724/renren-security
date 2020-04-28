package io.renren.modules.sys.service.impl;

import io.renren.common.annotation.DataFilter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.SifanyOrganizationDao;
import io.renren.modules.sys.entity.SifanyOrganizationEntity;
import io.renren.modules.sys.service.SifanyOrganizationService;


@Service("sifanyOrganizationService")
public class SifanyOrganizationServiceImpl extends ServiceImpl<SifanyOrganizationDao, SifanyOrganizationEntity> implements SifanyOrganizationService {



    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SifanyOrganizationEntity> page = this.page(
                new Query<SifanyOrganizationEntity>().getPage(params),
                new QueryWrapper<SifanyOrganizationEntity>()
        );

        return new PageUtils(page);
    }

    @Override
    @DataFilter(subDept = true, user = false, tableAlias = "t1")
    public List<SifanyOrganizationEntity> queryList(Map<String, Object> params) {
        List<SifanyOrganizationEntity> list = baseMapper.queryList(params);
        return list;
    }

    @Override
    public List<Long> queryDetpIdList(Long parentId) {
        return baseMapper.queryDetpIdList(parentId);
    }

    @Override
    public List<Long> getSubDeptIdList(Long deptId){
        //部门及子部门ID列表
        List<Long> deptIdList = new ArrayList<>();

        //获取子部门ID
        List<Long> subIdList = queryDetpIdList(deptId);
        getDeptTreeList(subIdList, deptIdList);

        return deptIdList;
    }

    /**
     * 递归
     */
    private void getDeptTreeList(List<Long> subIdList, List<Long> deptIdList){
        for(Long deptId : subIdList){
            List<Long> list = queryDetpIdList(deptId);
            if(list.size() > 0){
                getDeptTreeList(list, deptIdList);
            }

            deptIdList.add(deptId);
        }
    }
}
