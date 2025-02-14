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

    def __init__(self):
        self.imageHandler = ImageHandler()

    def get(self):
        date = request.args.get('date')
        print('get date',date)
        try:
            row = pageCollection.find({"title.date":{"$eq":date}})
            result = list(row)
            print('result',result)
            if result:
                result = result[0]
                result['_id'] = str(result['_id'])
                result['images'] = self.imageHandler.getAllImages(result['title']['date'])
            print('get result',result)
            return jsonify(result),200
        except Exception as ex:
            print('ex',ex)
            abort(404,message="Something went wrong")
            return {}
    
    def post(self):
        try:
            data = request.form
            files = request.files.getlist('images')
           
            textData = json.loads(data.get('text'))
            pageExists = self._isPageWithDateExists(textData['title']['date'])
            if pageExists:
                return {"message":"Page on this date already exists."},202
            
            if files:
                for file in files:
                    self.imageHandler.saveImage(file,textData['title']['date'])

            textData['images'] = [file.filename if file else None for file in files] 
            
            print('textdate after images',textData)


            dbResponse = pageCollection.insert_one(textData)
            inserted_id = dbResponse.inserted_id
        
            result = pageCollection.find_one({"_id": ObjectId(inserted_id)})
            if result:
                result["_id"] = str(result["_id"])

            result['images'] = self.imageHandler.getAllImages(result['title']['date'])
            print('result after image fetch',result)
       
            return jsonify(result),200
        
          
        except Exception as e:
            print("error......", e)
            return abort(500,message="Something went wrong with the server")
    
    def _isPageWithDateExists(self, date):
        try:
            page = pageCollection.find({"title.date":{"$eq":date}})
            
            page = list(page)
            print('page',page)
            if page:
                return True
            print('return False')
            return False
        except Exception as ex:
            print('Something went wrong while fetch the page at date',date)

        

