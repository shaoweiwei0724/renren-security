package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 组织机构管理
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-04-26 16:06:52
 */
@Data
@TableName("sifany_organization")
public class SifanyOrganizationEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Long id;
	/**
	 * 上级部门ID，一级部门为0
	 */
	private Long parentId;
	/**
	 * 部门名称
	 */
	private String name;
	private String code;
	/**
	 * 排序
	 */
	private Integer orderNum;
	/**
	 * 是否删除  -1：已删除  0：正常
	 */
	@TableLogic
	private Integer delFlag;
	/**
	 * 上级部门名称
	 */
	@TableField(exist=false)
	private String parentName;


	/**
	 * ztree属性
	 */
	@TableField(exist=false)
	private Boolean open;
	@TableField(exist=false)
	private List<SifanyObjEntity> children;
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(Integer orderNum) {
		this.orderNum = orderNum;
	}

	public Integer getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public Boolean getOpen() {
		return open;
	}

	public void setOpen(Boolean open) {
		this.open = open;
	}

	public List<SifanyObjEntity> getChildren() {
		return children;
	}

	public void setChildren(List<SifanyObjEntity> children) {
		this.children = children;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}
