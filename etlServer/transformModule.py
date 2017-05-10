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
