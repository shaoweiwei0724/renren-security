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

	/**
	 * 在线监测
	 */
	private Integer onlineMonitor;
	/**
	 * 在线仿真
	 */
	private  Integer onlineSim;
	/**
	 * 离线仿真
	 */
	private  Integer offlineSim;

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

	public Integer getOnlineMonitor() {
		return onlineMonitor;
	}

	public void setOnlineMonitor(Integer onlineMonitor) {
		this.onlineMonitor = onlineMonitor;
	}

	public Integer getOnlineSim() {
		return onlineSim;
	}

	public void setOnlineSim(Integer onlineSim) {
		this.onlineSim = onlineSim;
	}

	public Integer getOfflineSim() {
		return offlineSim;
	}

	public void setOfflineSim(Integer offlineSim) {
		this.offlineSim = offlineSim;
	}
}
