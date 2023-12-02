from flask import Flask
from flask_cors import CORS
from flask import Flask, jsonify, redirect, render_template, request
import mysql.connector
import requests
import pandas as pd
import matplotlib.pyplot as plt

api = Flask(__name__)
CORS(api)

def sqlquery(query, params=None):

    mydb = mysql.connector.connect(
        host="104.198.145.57",
        user="root",
        password="team82",
        database="US_youtube"
    )

    mycursor = mydb.cursor()
    mycursor.execute(query, params)
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

    df_sorted = df.sort_values(by=[1,5,6])

    channel_id = 'UCvtRTOMP2TqYqu51xNrqAzg'
    trending_videos = df_sorted[df_sorted.iloc[:, 1] == channel_id]

    print(trending_videos)
    response = [{
        "title": row[1],
        "likes": row[5],
        "date_published": pd.to_datetime(row[6])
    } for row in trending_videos.itertuples()]
    return jsonify(response)

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
    search_input = request.args.get('input')
    if not search_input:
        return jsonify([])
    print(search_input)
    query = "SELECT title, likes, view_count, published_at FROM Videos WHERE title = %s"
    # AND channel_id LIKE 'UCvtRTOMP2TqYqu51xNrqAzg' (add later)
    data = sqlquery(query, (search_input,))
    print(data)
    
    response = [{"title": row[0], "likes":row[1], "view_count":row[2], "date_published": pd.to_datetime(row[3])} for row in data]
    return jsonify(response)

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user = data.get('Channel')
    passwd = data.get('password')
    #print(user)
    #print(passwd)
    '''check_query = "SELECT EXISTS FROM information_schema.tables WHERE table_schema = 'US_youtube' AND table_name = 'Login';"
    try:
        exists = sqlquery(check_query)
        print(exists)
    except Exception :
        sqlquery("CREATE TABLE Login (user VARCHAR(255), password VARCHAR(20));")
    '''
    query = "SELECT * FROM Login WHERE user = '{}';".format(user)
    check = sqlquery(query, None)
    print (check)
    if len(check) == 0:
        return "no"
    if check[0][1] == passwd:
        return "yes"
    return "no"