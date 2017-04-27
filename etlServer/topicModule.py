from flask import Blueprint, request, Flask
import json
from dbModule import dbao

topicModule = Blueprint('topicModule', __name__)

@topicModule.route('/addtopicname', methods=['POST', 'GET'])
def addtopicname():
    result = json.dumps("")
    jsdic = {"status": 300}
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        # topictype = request.form.get("topictype")
        topicname = json.loads(data)["topicname"]
        topictype = json.loads(data)["topictype"]
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
