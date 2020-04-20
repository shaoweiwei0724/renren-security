package io.renren.modules.sys.vo;

import lombok.Data;

import java.io.Serializable;

/**
 * @Description: 元件属性VO
 * @Author wlq
 * @Date 2020-04-20
 * @Company:gaoxin
 */
@Data
public class AttrVO implements Serializable {

    private String name;

    private String objId="10000005";

    private Long id;

    private String value="0";
}
