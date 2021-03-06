/**
 * Copyright (c) 2016-2019 SWAN开源 All rights reserved.
 *
 * http://www.gaoxiaoit.com/
 *
 * 版权所有，侵权必究！
 */

package io.renren.modules.sys.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 系统页面视图
 *
 * @author Mark sunlightcs@gmail.com
 */
@Controller
public class SysPageController {
	
	@RequestMapping("modules/{module}/{url}.html")
	public String module(@PathVariable("module") String module, @PathVariable("url") String url){
		return "modules/" + module + "/" + url;
	}

	@RequestMapping(value = {"/", "index.html"})
	public String index(){
		return "index";
	}
	@RequestMapping(value = {"/", "manager.html"})
	public String manager(){
		return "manager";
	}
	@RequestMapping(value = {"/", "sifanyclass.html"})
	public String sifanyclass(){
		return "sifanyclass";
	}
	@RequestMapping(value = {"/", "sifanyobj.html"})
	public String sifanyobj(){
		return "sifanyobj";
	}
	@RequestMapping(value = {"/", "sifanyhealth.html"})
	public String sifanyhealth(){
		return "sifanyhealth";
	}
	@RequestMapping(value = {"/", "sifanydatashow.html"})
	public String sifanydatashow(){
		return "sifanydatashow";
	}
	@RequestMapping(value = {"/", "swansimsetting.html"})
	public String swansimsetting(){
		return "swansimsetting";
	}



	@RequestMapping(value = {"/", "swanauthority.html"})
	public String swanauthority(){
		return "swanauthority";
	}
	@RequestMapping(value = {"/", "swanrunmanager.html"})
	public String swanrunmanager(){
		return "swanrunmanager";
	}
	@RequestMapping(value = {"/", "swansystemsetting.html"})
	public String swansystemsetting(){
		return "swansystemsetting";
	}






	@RequestMapping(value = {"/", "authority.html"})
	public String authority(){
		return "swanauthority";
	}

	@RequestMapping(value = {"/", "uphold.html"})
	public String uphold(){
		return "uphold";
	}
	@RequestMapping(value = {"/", "sifanyproject.html"})
	public String sifanyproject(){
		return "sifanyproject";
	}
	@RequestMapping(value = {"/", "sifanycharts.html"})
	public String sifanycharts(){
		return "sifanycharts";
	}


	@RequestMapping(value = {"/", "sifanyhistory.html"})
	public String sifanyhistory(){
		return "sifanyhistory";
	}

	@RequestMapping(value = {"/", "sifanycockpit.html"})
	public String sifanycockpit(){
		return "sifanycockpit";
	}

	@RequestMapping("index1.html")
	public String index1(){
		return "index1";
	}

	@RequestMapping("login.html")
	public String login(){
		return "login";
	}

	@RequestMapping("main.html")
	public String main(){
		return "main";
	}

	@RequestMapping("404.html")
	public String notFound(){
		return "404";
	}

}
