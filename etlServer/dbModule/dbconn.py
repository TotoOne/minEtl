import pymysql
import cx_Oracle
from DBUtils.PooledDB import PooledDB

mysqldbinfo = {
    'host' : "127.0.0.1",
	'port' : 3306,
	'user' : "root",
	'password' : "python",
	'db' : "etlproject"
}
class PTConnectionPool(object):
    __pool = None

    def __enter__(self):
        return self

    def __init__(self, db_info):
        self.conn = self.__getConn(db_info)
        self.cursor = self.conn.cursor()

    def __getConn(self, db_info):
        if self.__pool is None:
            if db_info['port'] == 3306:
                self.__pool = PooledDB(creator=pymysql, mincached=10, maxcached=10,
                                       maxshared=20, maxconnections=100,
                                       blocking=True, maxusage=0,
                                       host=db_info['host'], port=db_info['port'],
                                       user=db_info['user'], passwd=db_info['password'],
                                       db=db_info['db'])
            elif db_info['port'] == 1521:
                self.__pool = PooledDB(creator=cx_Oracle, mincached=10, maxcached=10,
                                       maxshared=20, maxconnections=100,
                                       blocking=True, maxusage=0,
                                       user=db_info['user'], password=db_info['password'],
                                       dsn="%s:%s/%s" % (db_info['host'],
                                                         db_info['port'], db_info['db']))
        return self.__pool.connection()

    def __exit__(self, type, value, trace):
        self.cursor.close()
        self.conn.close()

        return self

def getPoolConnect(db_info=mysqldbinfo):
    return PTConnectionPool(db_info)


def dbPing(db_info):
    try:
        with getPoolConnect(db_info) as db:
            conn = db.conn
            conn.ping()
            return 1
    except:
        return 0

def select(sql, args, size=None):
    with getPoolConnect() as db:
        cur = db.cursor
        cur.execute(sql.replace('?', '%s'), args or ())
        if size:
            rs = cur.fetchmany(size)
        else:
            rs = cur.fetchall()
        return rs


def execute(sql, args):
    with getPoolConnect() as db:
        try:
            cur = db.cursor
            cur.execute(sql.replace('?', '%s'), args)
            affected = cur.rowcount
        except BaseException as e:
            raise
        return affected

# if __name__ == "__main__":
# 	loop = asyncio.get_event_loop()
# 	loop.run_until_complete(create_pool(loop,host='127.0.0.1',port=3306,user='root',
# 										password='python',db='etlproject'))
# 	args = ("test01","1","1225","542")
# 	sql = "insert into topicinform values(?,?,?,?)"
# 	co = loop.run_until_complete(execute(sql,args))
# 	print(co)
# 	loop.run_until_complete(destroy_pool())
# 	loop.close()
