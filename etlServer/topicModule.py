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
