package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 运行实例
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-07-19 10:50:22
 */
@Data
@TableName("swan_run_entity")
public class SwanRunEntityEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 实例ID
	 */
	@TableId
	private Long id;
	/**
	 * 操作人
	 */
	private Long userId;
	/**
	 * PID
	 */
	private Integer pid;
	/**
	 * 文件路径
	 */
	private String codeUrl;
	/**
	 * 代码
	 */
	private String codeDetail;
	/**
	 * 脚本ID
	 */
	private Long pyControlId;
	/**
	 * 开始时间
	 */
	private Long startTime;
	/**
	 * 停止时间
	 */
	private Long endTime;
	/**
	 * 停止方式
	 */
	private Integer endType;
	/**
	 * 脚本输出
	 */
	private String pyOutput;

	private String outputPath;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getCodeUrl() {
		return codeUrl;
	}

	public void setCodeUrl(String codeUrl) {
		this.codeUrl = codeUrl;
	}

	public String getCodeDetail() {
		return codeDetail;
	}

	public void setCodeDetail(String codeDetail) {
		this.codeDetail = codeDetail;
	}

	public Long getPyControlId() {
		return pyControlId;
	}

	public void setPyControlId(Long pyControlId) {
		this.pyControlId = pyControlId;
	}

	public Long getStartTime() {
		return startTime;
	}

	public void setStartTime(Long startTime) {
		this.startTime = startTime;
	}

	public Long getEndTime() {
		return endTime;
	}

	public void setEndTime(Long endTime) {
		this.endTime = endTime;
	}

	public Integer getEndType() {
		return endType;
	}

	public void setEndType(Integer endType) {
		this.endType = endType;
	}

	public String getPyOutput() {
		return pyOutput;
	}

	public void setPyOutput(String pyOutput) {
		this.pyOutput = pyOutput;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOutputPath() {
		return outputPath;
	}

	public void setOutputPath(String outputPath) {
		this.outputPath = outputPath;
	}
}
