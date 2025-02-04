from http.client import HTTPResponse
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": ["http://localhost:5173","http://localhost:3000","http://127.0.0.1:5173"],"allow-headers":["GET","POST","OPTIONS"]}})


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
        return jsonify(HTTPResponse(400))
    


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
        return jsonify(HTTPResponse(400))
    

@app.route('/post', methods=["POST"])
def postPage():
    try:
        data = request.get_json()
        dbResponse = pageCollection.insert_one(data)
        inserted_id = dbResponse.inserted_id
      
        print('data', data)
        result = pageCollection.find_one({"_id": ObjectId(inserted_id)})
        if result:
            result["_id"] = str(result["_id"])
        print('final res', result)
        return jsonify(result)
    except Exception as e:
        print("error......", e)
        return HTTPResponse(500)


     

if __name__=='__main__':
    app.run(debug=True)
