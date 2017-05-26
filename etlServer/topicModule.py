from flask import Blueprint, request
import json
import threading
from dbModule import dbao
from dbModule import dbconn
from etlModule import transform

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


@topicModule.route('/connectionPing', methods=['POST', 'GET'])
def ConnectionPing():
    jsdic = {"status": 300}
    if request.method == 'POST':
        srcdata = request.form.get("srcdata")

        srcSet = json.loads(srcdata)
        print(srcSet)
        dbinfo = dict(srcSet)

        print(dbinfo)
        i = dbconn.dbPing(dbinfo)
        print(i)
        if i == 1:
            jsdic = {"status": 200}
        else:
            jsdic = {"status": 310}

    result = json.dumps(jsdic)
    print(result)
    return result


@topicModule.route('/addtopicsetting', methods=['POST', 'GET'])
def addtopicsetting():
    jsdic = {"status": 300}
    if request.method == 'POST':
        srcdata = request.form.get("srcdata")
        topicdata = request.form.get("topicdata")
        targetdata = request.form.get("targetdata")

        print("ok")

        topicInfo = json.loads(topicdata)
        targetInfo = json.loads(targetdata)
        type = topicInfo["topictype"]
        name = topicInfo["topicname"]
        desc = topicInfo["topicdesc"]

        dbinfo = dict(targetInfo)
        print(dbinfo)
        i = dbconn.dbPing(dbinfo)
        print(i)
        if i == 1:
            jsdic = {"status": 200}
            topicargs = (name, type, srcdata, targetdata)
            try:
                dbao.addTopic(topicargs)
                stateargs = (name, desc, "0")
                dbao.addTopicState(stateargs)
            except:
                jsdic["status"] = 310
        else:
            jsdic = {"status": 310}

    result = json.dumps(jsdic)
    print(result)
    return result


@topicModule.route('/showTopics', methods=['POST', 'GET'])
def showtopics():
    jsdic = {"status": 300}
    if request.method == 'POST':
        print("ok")
        try:
            rs = dbao.findAllTopic()
            jsdic["status"] = 200
            jsdic["result"] = rs
        except:
            jsdic["status"] = 310
            jsdic["result"] = ()
    result = json.dumps(jsdic)
    print(result)
    return result


@topicModule.route('/topicStart', methods=['POST', 'GET'])
def starttopics():
    jsdic = {"status": 300}
    if request.method == 'POST':
        topicname = request.form.get("name")
        topicstate = request.form.get("state")
        arg = (topicname,)
        try:
            jsdic["status"] = 200
            if (topicstate == "1"):
                dbao.updateTopicStart(arg)
                print("that's will do")
                t = threading.Thread(target=transform.etlprocess, args=arg)
                t.start()
                print("thread in")
            elif (topicstate == "2"):
                dbao.updateTopicTodo(arg)
                dbao.updateTransTodoByTopic(arg)
                jsdic["status"] = 320
        except Exception as e:
            dbao.updateTopicWrong(arg)
            jsdic["status"] = 310
            print(e)
    result = json.dumps(jsdic)
    return result
