from http.client import HTTPResponse
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)

# Enable CORS for the entire app, allowing only the React app's origin
CORS(app,resources={r"/*":{
    "origins":"http://localhost:5173"
    }})

client = MongoClient("mongodb://127.0.0.1:27017")
db = client["personaldiarydb"]
pageCollection = db['pages']

@app.route('/',methods=['GET'])
def getLastWrittenPage():
    try:
        row = pageCollection.find()
        result = str(row[0])
        print('res',result)
        return jsonify(result)
    except:
        return HTTPResponse(400)

@app.route('/',methods=["POST"])
def writeNewPage():
    return 'written'

@app.route('/page',methods=['GET'])
def getPageAtDate():
    date = request.args.get('date');

    return 'page on date'+date

if __name__=='__main__':
    app.run(debug=False)