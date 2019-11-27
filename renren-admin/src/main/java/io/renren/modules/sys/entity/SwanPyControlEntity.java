package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 脚本控制; InnoDB free: 88064 kB
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-07-05 16:29:02
 */
@Data
@TableName("swan_py_control")
public class SwanPyControlEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 脚本编号
	 */
	@TableId
	private Long id;
	/**
	 * 脚本名
	 */
	private String name;
	/**
	 * 脚本路径
	 */
	private String path;
	/**
	 * 进程id
	 */
	private Integer pid;
	/**
	 * 脚本运行状态
	 */
	private Integer states;

	private String beginTime;

	private String endTime;


	private String txtt;

	private Long entityId;

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public Integer getStates() {
		return states;
	}

	public void setStates(Integer states) {
		this.states = states;
	}

	public String getTxtt() {
		return txtt;
	}

	public void setTxtt(String txtt) {
		this.txtt = txtt;
	}

	public String getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public Long getEntityId() {
		return entityId;
	}

	public void setEntityId(Long entityId) {
		this.entityId = entityId;
	}
}