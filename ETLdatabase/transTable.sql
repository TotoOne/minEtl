create table topicControl(					#转换状态
	topicname varchar(40), 
	topicdescribe varchar(1000),				#topic描述
	topicstate varchar(1), 					#0:没做 1:正在做 2:报错
	starttime datetime						#做完了更新时间为endTime，做之前更新为startTime
) charset = utf8;

create table topicInform(					#连接源库、目标库
	topicname varchar(40) not null primary key,
	linktype varchar(1),					#连接类型，默认为oracle to oracle 1; oracle to mysql 2; 
	sourcelink varchar(120),				#json数据:port addr listen name pwd
	targetlink varchar(120)					#json数据:port addr listen name pwd
) charset = utf8;

create table transControl(
	transid int not null primary key,
	transstate varchar(1),					#0:没做 1:正在做 2:报错
	starttime datetime
)charset = utf8;

create table transInform(					#转换具体信息
	transid int not null primary key auto_increment,
	transname varchar(40),
	topicname varchar(40),
	transdescribe varchar(200),
	beforetranssourcedeal varchar(1000),
	beforetranstargetdeal varchar(1000),
	sourcetable varchar(40),
	targettable varchar(40),
	sourcewords varchar(7500),
	targetwords varchar(7500),
	aftertranssourcedeal varchar(1000),
	aftertranstargetdeal varchar(1000)
) charset = utf8 auto_increment=1;

-- create table link(							#连接类型 不需要了
-- 	linktype varchar(2),
-- 	linkdiscribe varchar(40)
-- ) charset = utf8;

