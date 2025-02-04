from http.client import HTTPResponse
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId


app = Flask(__name__)

CORS(app,resources={r"/*":{
    "origins":"http://localhost:5173/",
    "methods":["GET","POST","OPTIONS"],
    "allow-headers":["Content-Type","Authorization"]
    }})

client = MongoClient("mongodb://localhost:27017")
db = client["personaldiarydb"]
pageCollection = db['pages']

## Retrieve the most recent page written
@app.route('/',methods=['GET'])
def getLastWrittenPage():
    try:
        row = pageCollection.find()
        
        result = list(row)

        if result:
            result = result[0]
            result['_id'] = str(result['_id'])
        print('res',result)

        return jsonify(result)
    except:
        return HTTPResponse(400)
    finally:
        client.close();


## Retrive the page at a given date
@app.route('/page',methods=['GET'])
def getPageAtDate():
    date = request.args.get('date')
    print('backend',date)
    try:
        row = pageCollection.find({"title.date":{"$eq":date}})
        result = list(row)
        if result:
            result = result[0]
            result['_id'] = str(result['_id'])
        print('res',result)
        return jsonify(result)
    except:
        return HTTPResponse(400)
    finally:
        client.close()

@app.route('/post',methods=["POST"])
def postPage():
    try:
        data = request.get_json()
        return None
    except:
        return ConnectionRefusedError()
    finally:
        client.close()
    


if __name__=='__main__':
    app.run(debug=False)
