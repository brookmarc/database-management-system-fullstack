import pymysql
import configparser
from flask import Flask, request
#from flask_migrate import Migrate
from flask_cors import CORS
#from flask_restx import Api
from flask_restful import Api
from werkzeug.middleware.proxy_fix import ProxyFix
#from flaskext.mysql import MySQL
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__, instance_relative_config=False)
#cors = CORS(app, cors_allowed_orgins="*", support_credentials=True)
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
api = Api(app)
db = SQLAlchemy(app)


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_pyfile('config.py') # From instance
    app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

    app.wsgi_app = ProxyFix(app.wsgi_app)
    db.init_app(app)
    #migrate = Migrate(app, db)


    with app.app_context():
        # ---------- AUTH API ----------->
        from .api.auth.views import bp_auth
        app.register_blueprint(bp_auth, url_prefix='/auth')

        # ---------- USER ADMIN API ----------->
        from .api.UserAdmin.views import bp_userAdmin
        app.register_blueprint(bp_userAdmin, url_prefix='/graphql')

        # ---------- DATABASE MODEL API ----------->
        from .api.Databases.mysqlDBModel import bp_mysqlModel
        app.register_blueprint(bp_mysqlModel, url_prefix='/api/db/mysql')

        # ---------- CORE CONTENTS API ----------->
        from .api.Operations.mysqlCRUD.views import bp_mysqlCRUD
        app.register_blueprint(bp_mysqlCRUD, url_prefix='/api/operations/mysql')

        # ---------- CONFIG API ----------->
        from .api.ConfigsApi.mysqlConfigs.views import bp_mysqlConfig
        app.register_blueprint(bp_mysqlConfig, url_prefix="/api/configs")


        db.create_all()

        return app

# ---------- END ---------



