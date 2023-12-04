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
    mydb.commit()

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
    global trending_videos
    query = "SELECT * FROM Videos WHERE channel_id LIKE '{}'".format(currentChannelId)
    data = sqlquery(query)
    df = pd.DataFrame(data)

    df_sorted = df.sort_values(by=[1,5,6])

    channel_id = currentChannelId
    trending_videos = df_sorted[df_sorted.iloc[:, 1] == channel_id]

    response = [{
        "title": row[4],
        "view_count": row[5],
        "likes": row[6],
        "date_published": row[7]
    } for row in trending_videos.itertuples()]
    return jsonify(response)

@api.route('/getTrendingViews', methods=['POST'])
def getTrendingViews():
    query = "SELECT * FROM Videos WHERE channel_id LIKE '{}'".format(currentChannelId)   
    data = sqlquery(query)
    df = pd.DataFrame(data)
    channel_id = currentChannelId
    channel_data = df[df['channelId'] == channel_id]

    channel_data_sorted = channel_data.sort_values(by='publishedAt')

    plt.figure(figsize=(10, 5))
    plt.plot(channel_data_sorted['title'], channel_data_sorted['view_count'], marker='o')

    plt.xlabel('Video Title')
    plt.ylabel('View Count')
    plt.xticks(rotation=45) 

    plt.tight_layout() 
    plt.show()

@api.route('/updateTags', methods=['POST'])
def update_tags():
    data = request.json
    video_id = data['video_id']
    updated_tags = data['tags']
    print(updated_tags)
    query = "UPDATE Tags SET tags = '{}' WHERE video_id = '{}'".format(updated_tags, video_id)
    print(query)
    data = sqlquery(query, None)
    print(data)
    return jsonify({"success": True, "message": "Tags updated successfully"})


@api.route('/getVideosByChannelName', methods=['POST'])
def get_videos():
    channel_name = currentChannelId
    query = "SELECT video_id, title FROM Videos WHERE channel_id LIKE %s"
    data = sqlquery(query, (channel_name, ))
    video_ids = [row[0] for row in data]
    format_strings = ','.join(['%s'] * len(video_ids))
    print(format_strings)
    tag_query = f"SELECT video_id, tags FROM Tags WHERE video_id IN ({format_strings})"
    tags_data = sqlquery(tag_query, tuple(video_ids))
    first_row = tags_data[0]
    print(first_row)
    tags_response = {'video_id': first_row[0], 'tags': first_row[1].split('|') if first_row[1] else []}

    return jsonify(tags_response)

@api.route('/searchBar', methods=['POST'])
def search_bar():
    search_input = request.args.get('input')
    if not search_input:
        return jsonify([])
    query = "SELECT title, likes, view_count, published_at FROM Videos WHERE title LIKE %s"

    search_pattern = "%" + search_input + "%"

    data = sqlquery(query, (search_pattern,))

    response = [{"title": row[0], "likes": row[1], "view_count": row[2], "date_published": pd.to_datetime(row[3]).strftime('%Y-%m-%d')} for row in data]
    return jsonify(response)


@api.route('/login', methods=['POST'])
def login():
    global currentChannel, currentChannelId
    data = request.json
    user = data.get('Channel')
    passwd = data.get('password')
    #print(user)
    #print(passwd)
    getChannel = "SELECT channelId, channelTitle FROM Channels"
    channels = sqlquery(getChannel)
    channel_titles = []
    channel_id_title = {}
    for row in channels:
        channel_title = row[1] 
        channel_id_title[row[1]] = row[0]
        channel_titles.append(channel_title)
    if user+"\r" not in channel_titles:
        return "Not a Valid Channel"
    curr_channel_id = channel_id_title[user+"\r"]
    currentChannel = user
    currentChannelId = curr_channel_id
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
        return jsonify("yes",currentChannel, currentChannelId)
    return "no"

@api.route('/register', methods=['POST'])
def register():
    global currentChannel, currentChannelId
    data = request.json
    user = data.get('Channel')
    passwd = data.get('password')

    getChannel = "SELECT channelId, channelTitle FROM Channels"
    channels = sqlquery(getChannel)
    channel_titles = []
    channel_id_title = {}
    for row in channels:
        channel_title = row[1] 
        channel_id_title[row[1]] = row[0]
        channel_titles.append(channel_title)
    if user+"\r" not in channel_titles:
        return "Not a Valid Channel"
    curr_channel_id = channel_id_title[user+"\r"]
    print(curr_channel_id)
    check_query = "SELECT * FROM Login WHERE user = '{}';".format(user)
    resultcheck = sqlquery(check_query)
    if len(resultcheck) != 0:
        return "Already Exists"
    update_query = "INSERT INTO Login (user, password) VALUES ('{}','{}')".format(user, passwd)
    result = sqlquery(update_query)
    print (result)
    currentChannel = user
    currentChannelId = curr_channel_id
    print(currentChannelId)
    print(currentChannel)
    return jsonify([curr_channel_id, user])

@api.route('/topTrending', methods=['GET'])
def trending():
    global trending_videos
    query = "SELECT categoryName, COUNT(categoryName) AS frequency FROM CatNewNew GROUP BY categoryName ORDER BY frequency DESC LIMIT 3;"
    data = sqlquery(query)
    print(data)
    videoids = ""
    for x in trending_videos.itertuples():
        videoids = videoids + x[1] + ','
    second = "SELECT categoryName, COUNT(categoryName) AS frequency FROM CatNewNew WHERE video_id IN ('{}') GROUP BY categoryName ORDER BY frequency DESC LIMIT 1".format(videoids)    
    data2 = sqlquery(second)
    return jsonify(data, data2)

@api.route('/oldVid', methods=['GET'])
def delete():
    global currentChannelId
    query = "SELECT * FROM Videos WHERE channel_id = '{}' ORDER BY published_at ASC LIMIT 3".format(currentChannelId)
    data = sqlquery(query)
    response = [{"video_id": row[0], "title": row[3], "likes": row[5], "view_count": row[4], "date_published": row[6]} for row in data]
    
    return jsonify(response)

@api.route('/deleteVideo', methods=['POST'])
def delete_video():
    data = request.json
    video_id = data.get('video_id')

    if not video_id:
        return jsonify({"error": "No video ID provided"}), 400
    
    delete_child_query = "DELETE FROM CatNewNew WHERE video_id = %s"
    sqlquery(delete_child_query, (video_id,))

    delete_query = "DELETE FROM Videos WHERE video_id = '{}'".format(video_id)
    data = sqlquery(delete_query) 

    return jsonify({"message": "Video deleted successfully"}), 200