from dbModule import dbconn


def findAllTopic():
    sql = 'select topicname, topicdescribe, topicstate from topiccontrol'
    try:
        rs = dbconn.select(sql, ())
        print(rs)
        return rs
    except:
        raise


def addTopic(args):
    sql = 'insert into topicinform(topicname,linktype,sourcelink,targetlink) values(?,?,?,?)'
    try:
        count = dbconn.execute(sql, args)
        print(count)
        return count
    except:
        print("db error")
        raise


def addTopicState(args):
    sql = 'insert into topicControl(topicname,topicdescribe,topicstate,starttime) values(?,?,?,now())'
    try:
        count = dbconn.execute(sql, args)
        print(count)
        return count
    except:
        print("db error")
        raise


def findTopicExist(args):
    sql = 'select count(*) from topicinform where topicname = ?'
    try:
        rs = dbconn.select(sql, args)
        print(rs)
        return rs
    except:
        raise


def findTransByTopic(args):
    sql = 'select ti.transname, ti.transdescribe, tc.transstate, ti.transid from transinform ti, transcontrol tc '
    sql = sql + 'where ti.transid = tc.transid and ti.topicname = ?'
    try:
        rs = dbconn.select(sql, args)
        return rs
    except:
        raise


def findSourceTableColumns(args):
    topicname = args[0]
    tablename = args[1]
    sql = 'select sourcelink from topicinform where topicname = ?'
    try:
        link = dbconn.select(sql, topicname)[0][0]
    except:
        link = ""
    if link == "":
        rs = []
    else:
        link = eval(link)
        try:
            with dbconn.getPoolConnect(link) as db:
                cur = db.cursor
                cur.execute("select * from %s where 1 != 1" % tablename)
                rs = [row[0] for row in cur.description]
        except Exception as e:
            print(e)
            raise
    return rs


def findTargetTableColumns(args):
    topicname = args[0]
    tablename = args[1]
    sql = 'select targetlink from topicinform where topicname = ?'
    try:
        link = dbconn.select(sql, topicname)[0][0]
    except:
        link = ""
    if link == "":
        rs = []
    else:
        link = eval(link)
        try:
            with dbconn.getPoolConnect(link) as db:
                cur = db.cursor
                cur.execute("select * from %s where 1 != 1" % tablename)
                rs = [row[0] for row in cur.description]
        except Exception as e:
            print(e)
            raise
    return rs


def addTrans(args):
    sqlinform1 = "insert into transinform(transname,topicname,transdescribe,beforetranssourcedeal,"
    sqlinform2 = "beforetranstargetdeal, sourcetable, targettable,sourcewords,targetwords,aftertranssourcedeal,"
    sqlinform = sqlinform1 + sqlinform2 + "aftertranstargetdeal)values(?,?,?,?,?,?,?,?,?,?,?)"
    sqlstate = "insert into transcontrol values(?,?,now())"
    try:
        dbconn.execute(sqlinform, args)
        lastid = dbconn.select("select max(transid) from transinform",())
        dbconn.execute(sqlstate,(lastid,"0"))
        # dbconn.execute(sqlstate, ("0",))
    except:
        raise

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
