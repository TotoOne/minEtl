from flask import Blueprint, request, Flask
import json
from dbModule import dbao

topicModule = Blueprint('topicModule', __name__)

@topicModule.route('/addtopicname', methods=['POST', 'GET'])
def addtopicname():
    result = json.dumps("")
    jsdic = {"status": 300}
    if request.method == 'POST':
        topicname = request.form.get("topicname")
        topictype = request.form.get("topictype")
        print(topicname)
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
