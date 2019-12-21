/*
Navicat MySQL Data Transfer

Source Server         : GaoXin
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : sifany_tuoguan1.0

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-21 10:29:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `menu_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT NULL COMMENT '父菜单ID，一级菜单为0',
  `name` varchar(50) DEFAULT NULL COMMENT '菜单名称',
  `url` varchar(200) DEFAULT NULL COMMENT '菜单URL',
  `perms` varchar(500) DEFAULT NULL COMMENT '授权(多个用逗号分隔，如：user:list,user:create)',
  `type` int(11) DEFAULT NULL COMMENT '类型   0：目录   1：菜单   2：按钮',
  `icon` varchar(50) DEFAULT NULL COMMENT '菜单图标',
  `order_num` int(11) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='菜单管理';

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('1', '0', '系统管理', '', null, '0', 'fa fa-cog', '0');
INSERT INTO `sys_menu` VALUES ('2', '1', '管理员管理', 'modules/sys/user.html', null, '1', 'fa fa-user', '1');
INSERT INTO `sys_menu` VALUES ('3', '1', '角色管理', 'modules/sys/role.html', null, '1', 'fa fa-user-secret', '2');
INSERT INTO `sys_menu` VALUES ('4', '1', '菜单管理', 'modules/sys/menu.html', null, '1', 'fa fa-th-list', '3');
INSERT INTO `sys_menu` VALUES ('5', '1', 'SQL监控', 'druid/sql.html', null, '1', 'fa fa-bug', '4');
INSERT INTO `sys_menu` VALUES ('6', '1', '定时任务', 'modules/job/schedule.html', null, '1', 'fa fa-tasks', '5');
INSERT INTO `sys_menu` VALUES ('7', '6', '查看', null, 'sys:schedule:list,sys:schedule:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('8', '6', '新增', null, 'sys:schedule:save', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('9', '6', '修改', null, 'sys:schedule:update', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('10', '6', '删除', null, 'sys:schedule:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('11', '6', '暂停', null, 'sys:schedule:pause', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('12', '6', '恢复', null, 'sys:schedule:resume', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('13', '6', '立即执行', null, 'sys:schedule:run', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('14', '6', '日志列表', null, 'sys:schedule:log', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('15', '2', '查看', null, 'sys:user:list,sys:user:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('16', '2', '新增', null, 'sys:user:save,sys:role:select', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('17', '2', '修改', null, 'sys:user:update,sys:role:select', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('18', '2', '删除', null, 'sys:user:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('19', '3', '查看', null, 'sys:role:list,sys:role:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('20', '3', '新增', null, 'sys:role:save,sys:menu:perms', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('21', '3', '修改', null, 'sys:role:update,sys:menu:perms', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('22', '3', '删除', null, 'sys:role:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('23', '4', '查看', null, 'sys:menu:list,sys:menu:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('24', '4', '新增', null, 'sys:menu:save,sys:menu:select', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('25', '4', '修改', null, 'sys:menu:update,sys:menu:select', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('26', '4', '删除', null, 'sys:menu:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('27', '1', '参数管理', 'modules/sys/config.html', 'sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete', '1', 'fa fa-sun-o', '6');
INSERT INTO `sys_menu` VALUES ('29', '1', '系统日志', 'modules/sys/log.html', 'sys:log:list', '1', 'fa fa-file-text-o', '7');
INSERT INTO `sys_menu` VALUES ('30', '1', '文件上传', 'modules/oss/oss.html', 'sys:oss:all', '1', 'fa fa-file-image-o', '6');
INSERT INTO `sys_menu` VALUES ('31', '1', '部门管理', 'modules/sys/dept.html', null, '1', 'fa fa-file-code-o', '1');
INSERT INTO `sys_menu` VALUES ('32', '31', '查看', null, 'sys:dept:list,sys:dept:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('33', '31', '新增', null, 'sys:dept:save,sys:dept:select', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('34', '31', '修改', null, 'sys:dept:update,sys:dept:select', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('35', '31', '删除', null, 'sys:dept:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('36', '1', '字典管理', 'modules/sys/dict.html', null, '1', 'fa fa-bookmark-o', '6');
INSERT INTO `sys_menu` VALUES ('37', '36', '查看', null, 'sys:dict:list,sys:dict:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('38', '36', '新增', null, 'sys:dict:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('39', '36', '修改', null, 'sys:dict:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('40', '36', '删除', null, 'sys:dict:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('41', '128', '模型类', 'modules/sys/sifanyclass.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('42', '41', '查看', null, 'sys:sifanyclass:list,sys:sifanyclass:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('43', '41', '新增', null, 'sys:sifanyclass:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('44', '41', '修改', null, 'sys:sifanyclass:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('45', '41', '删除', null, 'sys:sifanyclass:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('46', '128', '模型类属性', 'modules/sys/sifanyclassattr.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('47', '46', '查看', null, 'sys:sifanyclassattr:list,sys:sifanyclassattr:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('48', '46', '新增', null, 'sys:sifanyclassattr:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('49', '46', '修改', null, 'sys:sifanyclassattr:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('50', '46', '删除', null, 'sys:sifanyclassattr:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('51', '128', '模型类属性类型', 'modules/sys/sifanyclassattrtype.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('52', '51', '查看', null, 'sys:sifanyclassattrtype:list,sys:sifanyclassattrtype:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('53', '51', '新增', null, 'sys:sifanyclassattrtype:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('54', '51', '修改', null, 'sys:sifanyclassattrtype:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('55', '51', '删除', null, 'sys:sifanyclassattrtype:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('56', '128', '数据类型', 'modules/sys/sifanydatatype.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('57', '56', '查看', null, 'sys:sifanydatatype:list,sys:sifanydatatype:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('58', '56', '新增', null, 'sys:sifanydatatype:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('59', '56', '修改', null, 'sys:sifanydatatype:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('60', '56', '删除', null, 'sys:sifanydatatype:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('61', '128', '模型实例', 'modules/sys/sifanyobj.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('62', '61', '查看', null, 'sys:sifanyobj:list,sys:sifanyobj:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('63', '61', '新增', null, 'sys:sifanyobj:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('64', '61', '修改', null, 'sys:sifanyobj:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('65', '61', '删除', null, 'sys:sifanyobj:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('66', '128', '模型实例数据', 'modules/sys/sifanyobjdata.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('67', '66', '查看', null, 'sys:sifanyobjdata:list,sys:sifanyobjdata:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('68', '66', '新增', null, 'sys:sifanyobjdata:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('69', '66', '修改', null, 'sys:sifanyobjdata:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('70', '66', '删除', null, 'sys:sifanyobjdata:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('71', '0', '对象建模', null, null, '0', 'fa fa-th-list', '0');
INSERT INTO `sys_menu` VALUES ('72', '128', '音频数据', 'modules/sys/sifanydataaudio.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('73', '72', '查看', null, 'sys:sifanydataaudio:list,sys:sifanydataaudio:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('74', '72', '新增', null, 'sys:sifanydataaudio:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('75', '72', '修改', null, 'sys:sifanydataaudio:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('76', '72', '删除', null, 'sys:sifanydataaudio:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('77', '128', '图片数据', 'modules/sys/sifanydataimage.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('78', '77', '查看', null, 'sys:sifanydataimage:list,sys:sifanydataimage:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('79', '77', '新增', null, 'sys:sifanydataimage:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('80', '77', '修改', null, 'sys:sifanydataimage:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('81', '77', '删除', null, 'sys:sifanydataimage:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('82', '128', '文本数据', 'modules/sys/sifanydatatext.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('83', '82', '查看', null, 'sys:sifanydatatext:list,sys:sifanydatatext:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('84', '82', '新增', null, 'sys:sifanydatatext:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('85', '82', '修改', null, 'sys:sifanydatatext:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('86', '82', '删除', null, 'sys:sifanydatatext:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('87', '128', '视频数据', 'modules/sys/sifanydatavideo.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('88', '87', '查看', null, 'sys:sifanydatavideo:list,sys:sifanydatavideo:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('89', '87', '新增', null, 'sys:sifanydatavideo:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('90', '87', '修改', null, 'sys:sifanydatavideo:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('91', '87', '删除', null, 'sys:sifanydatavideo:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('102', '112', '脚本控制', 'modules/sys/swanpycontrol.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('103', '102', '查看', null, 'sys:swanpycontrol:list,sys:swanpycontrol:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('104', '102', '新增', null, 'sys:swanpycontrol:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('105', '102', '修改', null, 'sys:swanpycontrol:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('106', '102', '删除', null, 'sys:swanpycontrol:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('107', '112', '运行实例', 'modules/sys/swanrunentity.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('108', '107', '查看', null, 'sys:swanrunentity:list,sys:swanrunentity:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('109', '107', '新增', null, 'sys:swanrunentity:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('110', '107', '修改', null, 'sys:swanrunentity:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('111', '107', '删除', null, 'sys:swanrunentity:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('118', '205', '设备建模', 'modules/sys/modelalgorithms.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('119', '118', '查看', null, 'sys:sifanyclassattr:list,sys:sifanyclassattr:info,sys:sifanyclass:list,sys:sifanyclass:info', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('120', '118', '新增', null, 'sys:sifanyclassattr:save,sys:sifanyclass:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('121', '118', '修改', null, 'sys:sifanyclassattr:update,sys:sifanyclass:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('122', '118', '删除', null, 'sys:sifanyclassattr:delete,sys:sifanyclass:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('123', '205', '业务建模', 'modules/sys/modelbus.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('124', '123', '查看', null, 'sys:sifanyobjattr:list,sys:sifanyobjattr:info,sys:sifanyob:list,sys:sifanyobj:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('125', '123', '新增', null, 'sys:sifanyobjattr:save,sys:sifanyobj:save', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('126', '123', '修改', null, 'sys:sifanyobjattr:update,sys:sifanyobj:update', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('127', '123', '删除', null, 'sys:sifanyobjattr:delete,sys:sifanyobj:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('128', '0', '资源管理', '', null, '0', 'fa fa-th-list', '0');
INSERT INTO `sys_menu` VALUES ('129', '128', '数据服务', 'http://10.0.0.9:10137/', null, '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('130', '128', '算法服务', 'http://172.72.101.162:18189', null, '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('143', '141', '新增', null, 'sys:sifanyhealthomen:save', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('144', '141', '修改', null, 'sys:sifanyhealthomen:update', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('145', '141', '删除', null, 'sys:sifanyhealthomen:delete', '2', null, '6');
INSERT INTO `sys_menu` VALUES ('156', '0', '工程管理', null, null, '0', 'fa fa-th-list', '0');
INSERT INTO `sys_menu` VALUES ('157', '207', '表单管理', 'modules/sys/customtable.html', null, '1', null, '0');
INSERT INTO `sys_menu` VALUES ('158', '157', '查看', null, 'sys:customtable:list,sys:customtable:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('159', '157', '新增', null, 'sys:customtable:save', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('160', '157', '修改', null, 'sys:customtable:update', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('161', '157', '删除', null, 'sys:customtable:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('162', '174', '部件健康管理', 'modules/sys/modelhealth.html', '', '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('163', '208', '使用记录', 'modules/sys/customtablebase.html?id=1', null, '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('164', '163', '查看', null, 'sys:customtablebase:list,sys:customtablebase:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('165', '163', '新增', null, 'sys:customtablebase:save', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('166', '163', '修改', null, 'sys:customtablebase:update', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('167', '163', '删除', null, 'sys:customtablebase:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('174', '0', '健康管理', null, null, '0', 'fa fa-th-list', '0');
INSERT INTO `sys_menu` VALUES ('175', '173', '查看', null, 'sys:customfield:list,sys:customfield:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('176', '173', '新增', null, 'sys:customfield:save', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('177', '173', '修改', null, 'sys:customfield:update', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('178', '173', '删除', null, 'sys:customfield:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('179', '71', '业务建模测试', 'modules/sys/modelbus-test.html', null, '1', 'fa fa-file-code-o', '6');
INSERT INTO `sys_menu` VALUES ('180', '208', '故障记录', 'modules/sys/customtablebase.html?id=5', '', '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('181', '180', '查看', '', 'sys:customtablebase:list,sys:customtablebase:info', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('182', '180', '新增', '', 'sys:customtablebase:save', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('183', '180', '修改', '', 'sys:customtablebase:update', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('184', '180', '删除', '', 'sys:customtablebase:delete', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('185', '208', '修理记录', 'modules/sys/customtablebase.html?id=6', '', '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('186', '185', '查看', '', 'sys:customtablebase:list,sys:customtablebase:info', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('187', '185', '新增', '', 'sys:customtablebase:save', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('188', '185', '修改', '', 'sys:customtablebase:update', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('189', '185', '删除', '', 'sys:customtablebase:delete', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('190', '208', '主要零部件更换', 'modules/sys/customtablebase.html?id=7', '', '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('191', '190', '查看', '', 'sys:customtablebase:list,sys:customtablebase:info', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('192', '190', '新增', '', 'sys:customtablebase:save', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('193', '190', '修改', '', 'sys:customtablebase:update', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('194', '190', '删除', '', 'sys:customtablebase:delete', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('195', '156', '企业管理', 'modules/sys/customtablebase.html?id=8', '', '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('196', '195', '查看', '', 'sys:customtablebase:list,sys:customtablebase:info', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('197', '195', '新增', '', 'sys:customtablebase:save', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('198', '195', '修改', '', 'sys:customtablebase:update', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('199', '195', '删除', '', 'sys:customtablebase:delete', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('200', '156', '项目管理', 'modules/sys/customtablebase.html?id=9', '', '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('201', '200', '查看', '', 'sys:customtablebase:list,sys:customtablebase:info', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('202', '200', '新增', '', 'sys:customtablebase:save', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('203', '200', '修改', '', 'sys:customtablebase:update', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('204', '200', '删除', '', 'sys:customtablebase:delete', '2', '', '0');
INSERT INTO `sys_menu` VALUES ('205', '0', '模型服务', null, null, '0', 'fa fa-th-list', '0');
INSERT INTO `sys_menu` VALUES ('206', '0', '业务建模', null, null, '0', 'fa fa-th-list', '0');
INSERT INTO `sys_menu` VALUES ('207', '0', '表单服务', null, null, '0', 'fa fa-th-list', '0');
INSERT INTO `sys_menu` VALUES ('208', '0', '履历记录', null, null, '0', 'fa fa-th-list', '0');
INSERT INTO `sys_menu` VALUES ('209', '174', '系统健康管理', 'modules/sys/modelhealthsys.html', '', '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('210', '0', '智能诊断', null, null, '0', 'fa fa-th-list', '0');
INSERT INTO `sys_menu` VALUES ('211', '210', '综合分析', 'http://10.0.0.9:10137/superset/dashboard/1/', null, '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('212', '210', '组态面板', 'http://172.72.101.162:18080/swan-admin/statics/gojs/samples/showres.html?id=775&amp;name=市场部', null, '1', null, '0');
INSERT INTO `sys_menu` VALUES ('213', '210', '主页报表', 'http://10.0.0.9:10137/superset/dashboard/1/', '', '1', null, '0');
INSERT INTO `sys_menu` VALUES ('214', '210', '健康报告', 'http://10.0.0.9:10137/superset/dashboard/1/', null, '1', null, '0');
INSERT INTO `sys_menu` VALUES ('215', '0', '能源安全驾驶舱', null, null, '0', 'fa fa-th-list', '0');
INSERT INTO `sys_menu` VALUES ('216', '0', '设备管理', null, null, '0', null, '0');
INSERT INTO `sys_menu` VALUES ('217', '0', '组态设置', null, null, '0', null, '0');
INSERT INTO `sys_menu` VALUES ('218', '0', '个人中心', null, null, '0', null, '0');
INSERT INTO `sys_menu` VALUES ('219', '0', '数据服务', null, null, '0', null, '0');
INSERT INTO `sys_menu` VALUES ('220', '0', '计算服务', null, null, '0', null, '0');
INSERT INTO `sys_menu` VALUES ('221', '215', '在线监测', 'modules/sys/online_monitoring.html', null, '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('222', '215', '在线仿真', 'modules/sys/online_sim.html', null, '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('223', '215', '离线仿真', 'modules/sys/offline_sim.html', null, '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('224', '215', '组态配置', 'modules/sys/modelconfig.html', null, '1', 'fa fa-file-code-o', '0');
INSERT INTO `sys_menu` VALUES ('225', '215', '指标位置', 'modules/sys/attr_change_pos.html', null, '1', null, '0');
INSERT INTO `sys_menu` VALUES ('226', '0', '仿真配置', null, null, '0', '', '0');
