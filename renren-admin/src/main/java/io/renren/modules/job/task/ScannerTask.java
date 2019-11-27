/**
 * Copyright (c) 2016-2019 SWAN开源 All rights reserved.
 *
 * https://www.swan.io
 *
 * 版权所有，侵权必究！
 */

package io.renren.modules.job.task;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import io.renren.modules.sys.controller.SwanPyControlController;
import io.renren.modules.sys.entity.SwanPyControlEntity;
import io.renren.modules.sys.entity.SwanRunEntityEntity;
import io.renren.modules.sys.service.SwanPyControlService;
import io.renren.modules.sys.service.SwanRunEntityService;
import io.renren.modules.sys.utils.PyUntil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static java.sql.Types.NULL;

@Component("ScannerTask")
public class ScannerTask implements ITask {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private SwanPyControlService swanPyControlService;
	@Autowired
	private SwanRunEntityService swanRunEntityService;


	@Override
	public void run(String params) {

		logger.debug("ScannerTask定时任务正在执行，参数为：{}", params);
		System.out.println("ScannerTask定时任务正在执行");
		try{
			List<SwanRunEntityEntity> swanRunEntityEntityList=swanRunEntityService.list(new QueryWrapper<SwanRunEntityEntity>().isNull("end_type"));

			for(SwanRunEntityEntity swanRunEntityEntity:swanRunEntityEntityList){
				SwanPyControlEntity swanPyControlEntity=swanPyControlService.getById(swanRunEntityEntity.getPyControlId());
//				System.out.println(JSONObject.toJSONString(swanPyControlEntity));
				if(SwanPyControlController.runtype == 1)
					continue;
				if((swanRunEntityEntity.getPid() == null || swanRunEntityEntity.getPid() == 0) && (swanPyControlEntity.getPid() == null || swanPyControlEntity.getPid() == 0))
					continue;
				if(swanRunEntityEntity.getPid() == null){
					swanRunEntityEntity.setPid(swanPyControlEntity.getPid());
				}
				if(!PyUntil.scan(swanPyControlEntity.getName())){

					swanPyControlEntity.setStates(0);
					swanPyControlEntity.setPid(NULL);
					swanPyControlEntity.setEntityId(new Long(NULL));
					swanPyControlService.updateById(swanPyControlEntity);

					swanRunEntityEntity.setEndType(0);
					swanRunEntityEntity.setEndTime(System.currentTimeMillis());
					swanRunEntityEntity.setPyOutput(PyUntil.readTxtFile(swanRunEntityEntity.getOutputPath()));

				}
				swanRunEntityService.updateById(swanRunEntityEntity);
			}

		}catch (Exception e){
			e.printStackTrace();
		}
	}


}