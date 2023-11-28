from flask import Flask
from flask_cors import CORS
from flask import Flask, jsonify, redirect, render_template, request
import mysql.connector
import requests

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


@api.route('/test', methods=['GET'])
def my_profile():
    response_body = {
        "name": "hello",
        "about" :"Hello! I'm a full stack developer that loves python and javascript and CS411"
    }
    print("hello we made it!")

    return response_body

@api.route('/searchBar', methods=['POST'])
def search_bar():
    # Accessing the 'input' parameter from the request
    search_input = request.args.get('input')
    query = "SELECT title FROM Videos WHERE channel_id LIKE 'UCvtRTOMP2TqYqu51xNrqAzg'"
    data = sqlquery(query)
    print(data)
    # Your logic here

    return str(data)