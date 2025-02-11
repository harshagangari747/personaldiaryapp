from flask_smorest import Blueprint,abort;
from flask.views import MethodView;
from pymongo import MongoClient
from bson import ObjectId
from http.client import HTTPResponse
from flask import Flask, jsonify, request

blp = Blueprint(name='pages',import_name=__name__,description="Route to get and post pages")


client = MongoClient("mongodb://localhost:27017")
db = client["personaldiarydb"]
pageCollection = db['pages']


@blp.route("/page")
class RouteBluePrint(MethodView):
    def get(self):
        date = request.args.get('date')
        print('backend',date)
        try:
            row = pageCollection.find({"title.date":{"$eq":date}})
            result = list(row)
            if result:
                result = result[0]
                result['_id'] = str(result['_id'])
            print('res',result)
            return jsonify(result),200
        except:
            abort(404,message="Something went wrong")
    
    def post(self):
        try:
            data = request.get_json()
            dbResponse = pageCollection.insert_one(data)
            inserted_id = dbResponse.inserted_id
        
            print('data', data)
            result = pageCollection.find_one({"_id": ObjectId(inserted_id)})
            if result:
                result["_id"] = str(result["_id"])
            print('final res', result)
            return jsonify(result),200
        except Exception as e:
            print("error......", e)
            return abort(500,message="Something went wrong with the server")
        

