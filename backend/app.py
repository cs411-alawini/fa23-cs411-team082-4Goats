from flask import Flask

api = Flask(__name__)

@api.route('/test')
def my_profile():
    response_body = {
        "name": "hello",
        "about" :"Hello! I'm a full stack developer that loves python and javascript and CS411"
    }

    return response_body