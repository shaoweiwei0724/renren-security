/**
 * Copyright (c) 2016-2019 SWAN开源 All rights reserved.
 *
 * http://www.gaoxiaoit.com/
 *
 * 版权所有，侵权必究！
 */

package io.renren.modules.oss.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.renren.modules.oss.entity.SysOssEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 文件上传
 *
 * @author Mark sunlightcs@gmail.com
 */
@Mapper
public interface SysOssDao extends BaseMapper<SysOssEntity> {
	
}
