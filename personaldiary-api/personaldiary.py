from flask_cors import CORS
from flask_smorest import Api
from resources.RouteBluePrint import blp as RouteBluePrint;
from flask import Flask

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": ["http://localhost:5173","http://127.0.0.1/5173", "localhost","127.0.0.1"],"allow-headers":["GET","POST","OPTIONS"]}})

app.config["API_TITLE"] = "Personal Diary"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"]="3.0.3"
app.config["OPENAPI_URL_PREFIX"]="/"
app.config["OPENAPI_SWAGGER_UI_PATH"]="/swagger"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"


api = Api(app)
api.register_blueprint(RouteBluePrint)


     
