package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 视频数据
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-30 20:15:26
 */
@Data
@TableName("sifany_data_video")
public class SifanyDataVideoEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 视频id
	 */
	@TableId
	private Long id;
	/**
	 * 视频内容
	 */
	private byte[] content;
	/**
	 * 创建时间
	 */
	private Long createTime;
	/**
	 * 更新时间
	 */
	private Long updateTime;

}
