from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import praw
import pandas as pd
from datetime import datetime
import warnings
import time

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def scrapHot(subreddit, limit, df2):
    print("inside function")
    reddit = praw.Reddit(client_id='P4-FFLW065bTLnGSqfCnlg', client_secret='-EBrPckd7kwt0b8OaxJ-5cfwYRExQw',
                         user_agent='MyRedditScraper/1.0 (Macintosh; Intel Mac OS X 14.3.1; Apple Silicon) Python/3.12 (fasihrem@gmail.com)')

    subreddit1 = reddit.subreddit(subreddit)

    # print(subreddit1.hot(limit=10))
    for submission in subreddit1.hot(limit=limit):
        print(submission)
        df2 = df2.append({
            "postTitle": submission.title,
            "postDesc": submission.selftext,
            "postTime": datetime.utcfromtimestamp(submission.created_utc).strftime('%Y-%m-%d %H:%M:%S'),
            "authorName": submission.author,
            "noOfUpvotes": submission.score,
            "isNSFW": submission.over_18,
            "comment1": submission.comments[0].body if len(submission.comments) > 0 else None,
            "comment2": submission.comments[1].body if len(submission.comments) > 1 else None,
            "comment3": submission.comments[2].body if len(submission.comments) > 2 else None,
            "noOfComments": submission.num_comments,
            "imageUrl": submission.url,
            "postUrl": "https://www.reddit.com" + submission.permalink
        }, ignore_index=True)
        print("inside loop")

    print(df2.head())
    print(df2['postUrl'])
    df2.to_csv('data.csv', index=False)
    # return jsonify({"message": "Data processed successfully!"}), 200
    print("Data processed successfully!")

def scrapTop(subreddit, limit, df2):
    print("inside function")
    reddit = praw.Reddit(client_id='P4-FFLW065bTLnGSqfCnlg', client_secret='-EBrPckd7kwt0b8OaxJ-5cfwYRExQw',
                         user_agent='MyRedditScraper/1.0 (Macintosh; Intel Mac OS X 14.3.1; Apple Silicon) Python/3.12 (fasihrem@gmail.com)')

    subreddit1 = reddit.subreddit(subreddit)

    # print(subreddit1.hot(limit=10))
    for submission in subreddit1.top(limit=limit):
        print(submission)
        df2 = df2.append({
            "postTitle": submission.title,
            "postDesc": submission.selftext,
            "postTime": datetime.utcfromtimestamp(submission.created_utc).strftime('%Y-%m-%d %H:%M:%S'),
            "authorName": submission.author,
            "noOfUpvotes": submission.score,
            "isNSFW": submission.over_18,
            "comment1": submission.comments[0].body if len(submission.comments) > 0 else None,
            "comment2": submission.comments[1].body if len(submission.comments) > 1 else None,
            "comment3": submission.comments[2].body if len(submission.comments) > 2 else None,
            "noOfComments": submission.num_comments,
            "imageUrl": submission.url,
            "postUrl": submission.permalink
        }, ignore_index=True)
        print("inside loop")

    df2.to_csv('data.csv', index=False)
    # return jsonify({"message": "Data processed successfully!"}), 200
    print("Data processed successfully!")

def scrapNew(subreddit, limit, df2):
    print("inside function")
    reddit = praw.Reddit(client_id='P4-FFLW065bTLnGSqfCnlg', client_secret='-EBrPckd7kwt0b8OaxJ-5cfwYRExQw',
                         user_agent='MyRedditScraper/1.0 (Macintosh; Intel Mac OS X 14.3.1; Apple Silicon) Python/3.12 (fasihrem@gmail.com)')

    subreddit1 = reddit.subreddit(subreddit)

    # print(subreddit1.hot(limit=10))
    for submission in subreddit1.new(limit=limit):
        print(submission)
        df2 = df2.append({
            "postTitle": submission.title,
            "postDesc": submission.selftext,
            "postTime": datetime.utcfromtimestamp(submission.created_utc).strftime('%Y-%m-%d %H:%M:%S'),
            "authorName": submission.author,
            "noOfUpvotes": submission.score,
            "isNSFW": submission.over_18,
            "comment1": submission.comments[0].body if len(submission.comments) > 0 else None,
            "comment2": submission.comments[1].body if len(submission.comments) > 1 else None,
            "comment3": submission.comments[2].body if len(submission.comments) > 2 else None,
            "noOfComments": submission.num_comments,
            "imageUrl": submission.url,
            "postUrl": submission.permalink
        }, ignore_index=True)
        print("inside loop")

    df2.to_csv('data.csv', index=False)
    # return jsonify({"message": "Data processed successfully!"}), 200
    print("Data processed successfully!")

@app.route('/run_code', methods=['POST'])
@cross_origin()
def receive_data():

    try:
        data = request.get_json()
        sort = str(data['sort'])
        limit = int(data['limit'])
        # print(limit, type(limit))
        subreddit = data['subreddit']

        df2 = pd.DataFrame(columns=[
            "postTitle", "postDesc", "postTime", "authorName", "noOfUpvotes",
            "isNSFW", "comment1", "comment2", "comment3", "noOfComments", "imageUrl", "postUrl"
        ])

        print(f"Received data: sort={sort}, limit={limit}, subreddit={subreddit}")
        print(type(sort))

        if sort.startswith("hot"):
            print("hello")
            scrapHot(subreddit, limit, df2)
        elif sort.startswith("top"):
            scrapTop(subreddit, limit, df2)
        elif sort.startswith("new"):
            scrapNew(subreddit, limit, df2)
        else:
            return jsonify({"error": "Invalid sort parameter."}), 400

    # Prepare a response (optional)
        response = {
        "message": "Data received successfully!"
        }

        return jsonify(response), 200  # Return JSON response with status code 200 (OK)

    except Exception as e:
        print(f"Error processing data: {e}")
        return jsonify({"error": "An error occurred."}), 400  # Return JSON with error message and status code 400 (Bad Request)


@app.route('/send_data', methods=['GET'])
@cross_origin()
def sendData():
    try:
        print("Sending data")
        df = pd.read_csv('data.csv')
        # print(df.head())
        print(df.columns)
        return df.to_json(orient='records'), 200
    except Exception as e:
        print(f"Error processing data: {e}")
        return jsonify({"error": "An error occurred."}), 400


if __name__ == '__main__':
    app.run(debug=True)