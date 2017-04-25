import pymysql
from DBUtils.PooledDB import PooledDB


class PTConnectionPool(object):
    __pool = None

    def __enter__(self):
        self.conn = self.getConn()
        self.cursor = self.conn.cursor()

        return self

    def getConn(self):
        if self.__pool is None:
            self.__pool = PooledDB(creator=pymysql, mincached=10, maxcached=10,
                                   maxshared=20, maxconnections=100,
                                   blocking=True, maxusage=0,
                                   setsession=None,
                                   host="127.0.0.1", port=3306,
                                   user="root", passwd="python",
                                   db="etlproject", use_unicode=False, charset="utf8")
        return self.__pool.connection()

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.cursor.close()
        self.conn.close()


def getPoolConnect():
    return PTConnectionPool()


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
