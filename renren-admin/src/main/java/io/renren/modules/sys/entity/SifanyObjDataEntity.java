package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 模型实例数据
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@Data
@TableName("sifany_obj_data")
public class SifanyObjDataEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Long id;
	/**
	 * 对象id
	 */
	private Long objId;
	/**
	 * 数据类型
	 */
	private Integer dataType;
	/**
	 * 数据id
	 */
	private Long dataId;
	private Long attrId;

	@TableField(exist=false)
	private String objName;
	private Boolean onlineMonitor;
	private Boolean onlineSim;
	private Boolean offlineSim;

	public Long getAttrId() {
		return attrId;
	}

	public void setAttrId(Long attrId) {
		this.attrId = attrId;
	}

	public String getObjName() {
		return objName;
	}

	public void setObjName(String objName) {
		this.objName = objName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getObjId() {
		return objId;
	}

	public void setObjId(Long objId) {
		this.objId = objId;
	}

	public Integer getDataType() {
		return dataType;
	}

	public void setDataType(Integer dataType) {
		this.dataType = dataType;
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

	public Long getDataId() {
		return dataId;
	}

	public void setDataId(Long dataId) {
		this.dataId = dataId;
	}
}
