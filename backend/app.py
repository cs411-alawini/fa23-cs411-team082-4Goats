from flask import Flask
from flask_cors import CORS
import mysql.connector

api = Flask(__name__)
CORS(api)
def sqlquery(query):

    mydb = mysql.connector.connect(
        host="104.198.145.57",
        user="root",
        password="team82",
        database="US_youtube"
    )

    mycursor = mydb.cursor()
    mycursor.execute(query)
    myresult = mycursor.fetchall()

    return myresult


@api.route('/test')
def my_profile():
    response_body = {
        "name": "hello",
        "about" :"Hello! I'm a full stack developer that loves python and javascript and CS411"
    }

    return response_body