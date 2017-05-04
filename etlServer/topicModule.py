from flask import Blueprint, request, Flask
import json
from dbModule import dbao
from dbModule import dbconn

topicModule = Blueprint('topicModule', __name__)

@topicModule.route('/addtopicname', methods=['POST', 'GET'])
def addtopicname():
    jsdic = {"status": 300}
    if request.method == 'POST':
        # data = request.get_data()
        # print(data)
        topictype = request.form["topictype"]
        topicname = request.form["topicname"]
        print(topicname)
        print(topictype)
        try:
            rs = dbao.findTopicExist(topicname)
            if rs[0][0] > 0:
                jsdic = {"status": 310}
            else:
                jsdic = {"status": 200}
        except:
            print("wrong")
            jsdic = {"status": 300}
    result = json.dumps(jsdic)
    print(result)
    return result

@topicModule.route('/connectionPing', methods=['POST','GET'])
def ConnectionPing():
    jsdic = {"status":300}
    if request.method == 'POST':
        addr = request.form.get("address")
        listen = request.form.get("listen")
        dbname = request.form.get("dbname")
        pwd = request.form.get("pwd")
        port = request.form.get("port")

        dbinfo = {}
        dbinfo['host'] = addr
        dbinfo['port'] = int(port)
        dbinfo['db'] = listen
        dbinfo['user'] = dbname
        dbinfo['password'] = pwd

        print(dbinfo)
        i = dbconn.dbPing(dbinfo)
        print(i)
        if i == 1:
            jsdic = {"status":200}
        else:
            jsdic = {"status":310}

    result = json.dumps(jsdic)
    print(result)
    return result

@topicModule.route('/addtopicsetting',methods=['POST','GET'])
def addtopicsetting():
    jsdic = {"status": 300}
    if request.method == 'POST':
        addr = request.form.get("address")
        listen = request.form.get("listen")
        dbname = request.form.get("dbname")
        pwd = request.form.get("pwd")
        port = request.form.get("port")

    result = json.dumps(jsdic)
    print(result)
    return result