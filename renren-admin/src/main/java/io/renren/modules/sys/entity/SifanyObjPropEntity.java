package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 模型实例属性关系表
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-05-12 16:26:46
 */
@Data
@TableName("sifany_obj_prop")
public class SifanyObjPropEntity implements Serializable {
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
	 * 对应类的属性id
	 */
	private Long propId;

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

	public Long getPropId() {
		return propId;
	}

	public void setPropId(Long propId) {
		this.propId = propId;
	}
}
