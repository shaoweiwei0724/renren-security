package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 模型类属性
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@Data
@TableName("sifany_class_attr")
public class SifanyClassAttrEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Long id;
	/**
	 * 所属类id
	 */
	private Long classId;
	/**
	 * 属性名
	 */
	private String name;
	/**
	 * 类型id
	 */
	private Long typeId;
	/**
	 * 数据类型
	 */
	private Integer dataType;
	/**
	 * 创建时间
	 */
	private Long createTime;
	/**
	 * 最后更新时间
	 */
	private Long updateTime;
	/**
	 * 用户id
	 */
	private Long userId;
	private String code;
	private Integer unitId;
	private Integer attrstypeId;
	private String remark;
	private String algorithmName;
	private Boolean onlineMonitor;
	private Boolean onlineSim;
	private Boolean offlineSim;
	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getClassId() {
		return classId;
	}

	public void setClassId(Long classId) {
		this.classId = classId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getTypeId() {
		return typeId;
	}

	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}

	public Integer getDataType() {
		return dataType;
	}

	public void setDataType(Integer dataType) {
		this.dataType = dataType;
	}

	public Long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}

	public Long getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Long updateTime) {
		this.updateTime = updateTime;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getAttrstypeId() {
		return attrstypeId;
	}

	public void setAttrstypeId(Integer attrstypeId) {
		this.attrstypeId = attrstypeId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getAlgorithmName() {
		return algorithmName;
	}

	public void setAlgorithmName(String algorithmName) {
		this.algorithmName = algorithmName;
	}

	public Boolean getOnlineMonitor() {
		return onlineMonitor;
	}

	public void setOnlineMonitor(Boolean onlineMonitor) {
		this.onlineMonitor = onlineMonitor;
	}

	public Boolean getOnlineSim() {
		return onlineSim;
	}

	public void setOnlineSim(Boolean onlineSim) {
		this.onlineSim = onlineSim;
	}

	public Boolean getOfflineSim() {
		return offlineSim;
	}

	public void setOfflineSim(Boolean offlineSim) {
		this.offlineSim = offlineSim;
	}
}
