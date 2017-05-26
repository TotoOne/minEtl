from flask import Flask
import flask_cors
from topicModule import topicModule
from transformModule import transformModule

import json
from flask import request
from dbModule import dbao

app = Flask(__name__)

flask_cors.CORS(app, supports_credentials=True)

app.register_blueprint(topicModule, url_prefix='/topicModule')
app.register_blueprint(transformModule, url_prefix='/transformModule')


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
