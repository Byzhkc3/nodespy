# 煎蛋妹子图爬虫

本地创建mmz数据库

创建mmz表

CREATE TABLE `mmz` (
  `id` int(11) UNSIGNED NOT NULL,
  `url` text,
  `name` char(50) DEFAULT NULL,
  `dateline` bigint(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `mmz`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `mmz`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

创建content表
CREATE TABLE `content` (
  `id` int(11) UNSIGNED NOT NULL,
  `content` text,
  `name` char(50) DEFAULT NULL,
  `email` char(50) DEFAULT NULL,
  `dateline` bigint(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `content`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `content`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

抽取无用数据 
> SELECT * FROM `mmz` WHERE `url` LIKE '%#comment-%'  


