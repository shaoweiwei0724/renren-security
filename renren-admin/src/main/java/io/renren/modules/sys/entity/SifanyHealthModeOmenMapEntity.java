package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:07
 */
@Data
@TableName("sifany_health_mode_omen_map")
public class SifanyHealthModeOmenMapEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Long id;
	/**
	 * 故障模式
	 */
	private Long modeId;
	/**
	 * 故障征兆
	 */
	private Long omenId;
	/**
	 * 故障原因
	 */
	private String failureCause;
	/**
	 * 决策建议
	 */
	private String solutions;
	/**
	 * 概率
	 */
	private Double possibility;
	/**
	 * 备注
	 */
	private String mark;
	/**
	 * 创建时间
	 */
	private Long createTime;
	/**
	 * 更新时间
	 */
	private Long updateTime;
	/**
	 * 是否监控
	 */
	private Integer use;

}
