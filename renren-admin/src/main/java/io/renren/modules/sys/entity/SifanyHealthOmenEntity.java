package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 故障征兆
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-12-13 14:29:08
 */
@Data
@TableName("sifany_health_omen")
public class SifanyHealthOmenEntity implements Serializable {
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
	 * 征兆
	 */
	private String name;
	/**
	 * 用户
	 */
	private Long userId;
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
