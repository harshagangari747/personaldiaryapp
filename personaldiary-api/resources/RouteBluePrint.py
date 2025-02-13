from flask_smorest import Blueprint,abort;
from flask.views import MethodView;
from pymongo import MongoClient
from resources.FileHandler import ImageHandler
from bson import ObjectId
from flask import jsonify, request,json

blp = Blueprint(name='pages',import_name=__name__,description="Route to get and post pages")


client = MongoClient("mongodb://localhost:27017")
db = client["personaldiarydb"]
pageCollection = db['pages']



@blp.route("/page")
class RouteBluePrint(MethodView):
    def get(self):
        date = request.args.get('date')
        
        try:
            row = pageCollection.find({"title.date":{"$eq":date}})
            result = list(row)
            if result:
                result = result[0]
                result['_id'] = str(result['_id'])
            
            return jsonify(result),200
        except:
            abort(404,message="Something went wrong")
    
    def post(self):
        try:
            data = request.form
            files = request.files.getlist('images')
           
        
            textData = json.loads(data.get('text'))

          
            imageHandler = ImageHandler()

            for file in files:
                imageHandler.saveImage(file,textData['title']['date'])

            textData['images'] = [file.filename for file in files]
            
            print('textdate after images',textData)


            dbResponse = pageCollection.insert_one(textData)
            inserted_id = dbResponse.inserted_id
        
            result = pageCollection.find_one({"_id": ObjectId(inserted_id)})
            if result:
                result["_id"] = str(result["_id"])

            result['images'] = imageHandler.getAllImages(result['title']['date'])

       
            return jsonify(result),200
        
          
        except Exception as e:
            print("error......", e)
            return abort(500,message="Something went wrong with the server")
        

