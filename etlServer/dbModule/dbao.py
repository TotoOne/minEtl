from dbModule import dbconn


def findAllTopic():
    sql = 'select topicname, topicdescribe, topicstate from topiccontrol'
    rs = dbconn.select(sql, ())
    print(rs)
    return rs


def addTopic(args):
    sql = 'insert into topicinform(topicname,linktype,sourcelink,targetlink) values(?,?,?,?)'
    try:
        count = dbconn.execute(sql, args)
        print(count)
    except:
        print("db error")
    return count

def addTopicState(args):
    sql = 'insert into topicControl(topicname,topicdescribe,topicstate,starttime) values(?,?,?,now())'
    try:
        count = dbconn.execute(sql, args)
        print(count)
    except:
        print("db error")
    return count

def findTopicExist(args):
    sql = 'select count(*) from topicinform where topicname = ?'
    rs = dbconn.select(sql, args)
    print(rs)
    return rs

def findTransByTopic(args):
    sql = 'select ti.transname, ti.transdescribe, tc.transstate from transinform ti, transcontrol tc '
    sql = sql + 'where ti.transid = tc.transid and ti.topicname = ?'
    rs = dbconn.select(sql, args)
    return rs



# if __name__ == "__main__":
# 	loop = asyncio.get_event_loop()
# 	loop.run_until_complete(dbconn.create_pool(loop,host='127.0.0.1',port=3306,user='root',
# 										password='python',db='etlproject'))
# 	loop.run_until_complete(findAllTopic())
# 	loop.run_until_complete(dbconn.destroy_pool())
# 	loop.close()

# if __name__ == "__main__":
# 	loop = asyncio.get_event_loop()
# 	loop.run_until_complete(dbconn.create_pool(loop,host='127.0.0.1',port=3306,user='root',
# 										password='python',db='etlproject'))
# 	args = ("test01","1","1225","542")
# 	loop.run_until_complete(addTopic(["test01","1","1225","542"]))
# 	loop.run_until_complete(dbconn.destroy_pool())
# 	loop.close()
