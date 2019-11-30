package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 模型实例
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-10-16 09:30:33
 */
@Data
@TableName("sifany_obj")
public class SifanyObjEntity implements Serializable {
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
	 * 对象名
	 */
	private String name;
	/**
	 * 创建时间
	 */
	private Long createTime;
	/**
	 * 最后更新时间
	 */
	private Long updateTime;
	/**
	 * 状态
	 */
	private Integer status;
	/**
	 * 用户id
	 */
	private Long userId;

	private Long parentId;

	private Integer goKey;


	private String modelId;

	private String type;
	private String code;
	private String remark;



	@TableField(exist=false)
	private String irconurl;

	private String icons;



	private List<SifanyObjDataEntity> attrs;

	public Integer getGoKey() {
		return goKey;
	}

	public void setGoKey(Integer goKey) {
		this.goKey = goKey;
	}

	public List<SifanyObjDataEntity> getAttrs() {
		return attrs;
	}

	public void setAttrs(List<SifanyObjDataEntity> attrs) {
		this.attrs = attrs;
	}

	public Long getParentId() {

		return parentId;
	}



	public void setParentId(Long parentId) {
		this.parentId = parentId;
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

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getModelId() {
		return modelId;
	}

	public void setModelId(String modelId) {
		this.modelId = modelId;
	}

	public String getIcons() {
		return icons;
	}

	public void setIcons(String icons) {
		this.icons = icons;
	}

	public String getIrconurl() {
		return irconurl;
	}

	public void setIrconurl(String irconurl) {
		this.irconurl = irconurl;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
