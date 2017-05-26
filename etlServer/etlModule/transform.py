import json
from dbModule import dbao, dbconn


def etlprocess(name):
    try:
        print(name)
        linkInfo = dbao.findTopicLinkInfo(name)
        linktype = linkInfo[0][1]
        srclink = json.loads(linkInfo[0][2])
        tarlink = json.loads(linkInfo[0][3])
        transInfo = dbao.findTransInfoByTopic(name)
        with dbconn.getPoolConnect(srclink) as srcdb, dbconn.getPoolConnect(tarlink) as tardb:
            srccon = srcdb.conn
            srccur = srcdb.cursor
            tarcon = tardb.conn
            tarcur = tardb.cursor
            for row in transInfo:
                tranid = (row[0],)
                bfsrcdeal = row[4]
                bftardeal = row[5]
                srctable = row[6]
                tartable = row[7]
                srccols = ",".join(json.loads(row[8]))
                tarcols = ",".join(json.loads(row[9]))
                afsrcdeal = row[10]
                aftardeal = row[11]
                try:
                    dbao.updateTransStart(tranid)
                    if (bfsrcdeal != ""):
                        srccur.execute(bfsrcdeal)
                        srccon.commit()
                    if (bftardeal != ""):
                        tarcur.execute(bftardeal)
                        tarcon.commit()
                    srccur.execute("select max(rownum) from %s" % srctable)
                    num = srccur.fetchone()
                    rownum = int(num[0] / 5000) + 1
                    for i in range(rownum):
                        srcsql = "select %s from (select rownum as rn, %s.* from %s) where rn >= %d and rn < %d" % (
                            srccols, srctable, srctable, i * 5000, (i + 1) * 5000)
                        srccur.execute(srcsql)
                        srcdata = srccur.fetchall()
                        print("tartable is "+tartable)
                        for srcrow in srcdata:
                            tarsql = "insert into %s(%s) values(%s)" % (tartable, tarcols, changeRow(srcrow))
                            print(tarsql)
                            print(srcrow)
                            tarcur.execute(tarsql)
                        tarcon.commit()
                    if (afsrcdeal != ""):
                        srccur.execute(afsrcdeal)
                        srccur.commit()
                    if (aftardeal != ""):
                        tarcur.execute(aftardeal)
                        tarcur.commit()

                    dbao.updateTransDone(tranid)
                    print(str(tranid[0]) + " has done!")
                except Exception as e:
                    dbao.updateTransWrong(tranid)
                    print(tranid)
                    print(e)
                    raise
        dbao.updateTopicTodo(name)
    except Exception as e:
        dbao.updateTopicWrong(name)
        print(e)
        raise

def changeRow(tup):
    string = ""
    for i in tup:
        if type(i) == str:
            string +=  "'" + i + "',"
        else:
            i = str(i)
            i = i + ","
            string += i
    return string[:-1]