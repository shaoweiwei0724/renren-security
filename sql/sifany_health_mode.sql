/*
Navicat MySQL Data Transfer

Source Server         : 本地MYSQL
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : sifany_obj

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-13 14:24:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sifany_health_mode
-- ----------------------------
DROP TABLE IF EXISTS `sifany_health_mode`;
CREATE TABLE `sifany_health_mode` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `class_id` bigint(20) DEFAULT NULL COMMENT '设备类',
  `code` varchar(255) DEFAULT '' COMMENT '编码',
  `name` varchar(255) DEFAULT '' COMMENT '模式',
  `local_influence` varchar(255) DEFAULT '' COMMENT '局部影响',
  `superior_influence` varchar(255) DEFAULT '' COMMENT '上级影响',
  `ultimate_influence` varchar(255) DEFAULT '' COMMENT '最终影响',
  `stage_id` bigint(20) DEFAULT NULL COMMENT '阶段',
  `mark` varchar(255) DEFAULT '' COMMENT '备注',
  `formula` varchar(1000) DEFAULT '' COMMENT '公式',
  `create_time` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint(20) DEFAULT NULL COMMENT '更新时间',
  `trees` varchar(255) DEFAULT '' COMMENT '故障树',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='故障模式';

-- ----------------------------
-- Records of sifany_health_mode
-- ----------------------------

-- ----------------------------
-- Table structure for sifany_health_mode_omen_map
-- ----------------------------
DROP TABLE IF EXISTS `sifany_health_mode_omen_map`;
CREATE TABLE `sifany_health_mode_omen_map` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `mode_id` bigint(20) DEFAULT NULL COMMENT '故障模式',
  `omen_id` bigint(20) DEFAULT NULL COMMENT '故障征兆',
  `failure_cause` varchar(255) DEFAULT NULL COMMENT '故障原因',
  `solutions` varchar(255) DEFAULT '' COMMENT '决策建议',
  `possibility` double DEFAULT NULL COMMENT '概率',
  `mark` varchar(255) DEFAULT '' COMMENT '备注',
  `create_time` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint(20) DEFAULT NULL COMMENT '更新时间',
  `use` smallint(6) DEFAULT NULL COMMENT '是否监控',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sifany_health_mode_omen_map
-- ----------------------------

-- ----------------------------
-- Table structure for sifany_health_omen
-- ----------------------------
DROP TABLE IF EXISTS `sifany_health_omen`;
CREATE TABLE `sifany_health_omen` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `class_id` bigint(20) DEFAULT NULL COMMENT '设备类',
  `code` varchar(255) DEFAULT '' COMMENT '编码',
  `name` varchar(255) DEFAULT '' COMMENT '征兆',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户',
  `mark` varchar(255) DEFAULT '' COMMENT '备注',
  `formula` varchar(1000) DEFAULT '' COMMENT '公式',
  `create_time` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint(20) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='故障征兆';

-- ----------------------------
-- Records of sifany_health_omen
-- ----------------------------

-- ----------------------------
-- Table structure for sifany_health_quota
-- ----------------------------
DROP TABLE IF EXISTS `sifany_health_quota`;
CREATE TABLE `sifany_health_quota` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `code` varchar(255) DEFAULT '' COMMENT '编码',
  `name` varchar(255) DEFAULT '' COMMENT '名称',
  `cycle` int(11) DEFAULT NULL COMMENT '监控周期',
  `priority` int(11) DEFAULT NULL COMMENT '优先级',
  `type` varchar(255) DEFAULT NULL COMMENT '监控类型',
  `mark` varchar(255) DEFAULT '' COMMENT '备注',
  `formula` varchar(1000) DEFAULT '' COMMENT '公式',
  `create_time` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint(20) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sifany_health_quota
-- ----------------------------

-- ----------------------------
-- Table structure for sifany_health_quota_params
-- ----------------------------
DROP TABLE IF EXISTS `sifany_health_quota_params`;
CREATE TABLE `sifany_health_quota_params` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quota_id` bigint(20) DEFAULT NULL,
  `attr_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sifany_health_quota_params
-- ----------------------------
