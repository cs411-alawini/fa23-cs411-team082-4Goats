from flask import Flask
from flask_cors import CORS
from flask import Flask, jsonify, redirect, render_template, request
import mysql.connector
import requests
import pandas as pd
import matplotlib.pyplot as plt

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

@api.route('/getHighestTrendingVideos', methods=['POST'])
def getHighestTrendingVideos():
    query = "SELECT * FROM Videos WHERE channel_id LIKE 'UCvtRTOMP2TqYqu51xNrqAzg'"
    data = sqlquery(query)
    df = pd.DataFrame(data)

    df['publishedAt'] = pd.to_datetime(df['publishedAt'])

    df_sorted = df.sort_values(by=['channelId', 'likes', 'publishedAt'], ascending=[True, False, False])

    channel_id = 'UCvtRTOMP2TqYqu51xNrqAzg'
    trending_videos = df_sorted[df_sorted['channelId'] == channel_id]

    print(trending_videos)

@api.route('/getTrendingViews', methods=['POST'])
def getTrendingViews():
    query = "SELECT * FROM Videos WHERE channel_id LIKE 'UCvtRTOMP2TqYqu51xNrqAzg'"   
    data = sqlquery(query)
    df = pd.DataFrame(data)
    channel_id = 'UCvtRTOMP2TqYqu51xNrqAzg'
    channel_data = df[df['channelId'] == channel_id]

    channel_data_sorted = channel_data.sort_values(by='publishedAt')

    plt.figure(figsize=(10, 5))
    plt.plot(channel_data_sorted['title'], channel_data_sorted['view_count'], marker='o')

    plt.xlabel('Video Title')
    plt.ylabel('View Count')
    plt.xticks(rotation=45) 

    plt.tight_layout() 
    plt.show()

@api.route('/searchBar', methods=['POST'])
def search_bar():
    # Accessing the 'input' parameter from the request
    search_input = request.args.get('input')
    query = "SELECT title FROM Videos WHERE channel_id LIKE 'UCvtRTOMP2TqYqu51xNrqAzg'"
    data = sqlquery(query)
    print(data)
    # Your logic here

    return str(data)