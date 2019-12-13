package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 健康指标
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:07
 */
@Data
@TableName("sifany_health_quota")
public class SifanyHealthQuotaEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * ID
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
	 * 名称
	 */
	private String name;
	/**
	 * 监控周期
	 */
	private Integer cycle;
	/**
	 * 优先级
	 */
	private Integer priority;
	/**
	 * 监控类型
	 */
	private String type;
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

}
