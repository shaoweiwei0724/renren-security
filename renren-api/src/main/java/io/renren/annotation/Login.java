/**
 * Copyright (c) 2016-2019 SWAN开源 All rights reserved.
 *
 * http://www.gaoxiaoit.com/
 *
 * 版权所有，侵权必究！
 */

package io.renren.annotation;

import java.lang.annotation.*;

/**
 * 登录效验
 *
 * @author Mark sunlightcs@gmail.com
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Login {
}
