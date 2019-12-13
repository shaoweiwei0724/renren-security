package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 故障模式
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:07
 */
@Data
@TableName("sifany_health_mode")
public class SifanyHealthModeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Long id;
	/**
	 * 设备类
	 */
	private Long classId;
	/**
	 * 编码
	 */
	private String code;
	/**
	 * 模式
	 */
	private String name;
	/**
	 * 局部影响
	 */
	private String localInfluence;
	/**
	 * 上级影响
	 */
	private String superiorInfluence;
	/**
	 * 最终影响
	 */
	private String ultimateInfluence;
	/**
	 * 阶段
	 */
	private Long stageId;
	/**
	 * 备注
	 */
	private String mark;
	/**
	 * 公式
	 */
	private String formula;
	/**
	 * 创建时间
	 */
	private Long createTime;
	/**
	 * 更新时间
	 */
	private Long updateTime;
	/**
	 * 故障树
	 */
	private String trees;

}
