from flask import Blueprint, request, Flask
import json
from dbModule import dbao
from dbModule import dbconn

transformModule = Blueprint('transformModule', __name__)


@transformModule.route('/showTrans', methods=['POST', 'GET'])
def showTrans():
    jsdic = {"status": 300}
    if request.method == 'POST':
        topicname = request.form.get("topicname")
        try:
            name = (topicname,)
            rs = dbao.findTransByTopic(name)
            jsdic["result"] = rs
            jsdic["status"] = 200
            print(rs)
        except:
            jsdic["status"] = 310
            jsdic["result"] = ()
    result = json.dumps(jsdic)
    print(result)
    return result


@transformModule.route('/showColumns', methods=['POST', 'GET'])
def showColumns():
    jsdic = {"status": 300}
    if request.method == 'POST':
        tablename = request.form.get("tablename")
        topicname = request.form.get("topicname")
        tabletype = request.form.get("tabletype")
        args = (topicname, tablename)
        rs = []
        try:
            if (tabletype == '0'):
                rs = dbao.findSourceTableColumns(args)
            elif (tabletype == '1'):
                rs = dbao.findTargetTableColumns(args)
            jsdic["status"] = 200
        except Exception as e:
            jsdic["status"] = 310 #表名不存在
        jsdic["result"] = rs
        result = json.dumps(jsdic)
        print(result)
        return result