import time
import pymysql
from flask_cors import cross_origin
from flask import Blueprint, jsonify, request, json
from flask_restx import Api, Resource, reqparse
# ---------- import utils ------------
from .utils.showTable import showTable
from .utils.checkTables import checkTables
from .utils.createTable import createItem
from .utils.updateTable import updateItem
from .utils.deleteTable import deleteItem
from .utils.utilFunc import descFields
from app.api._utils.errorMessage import errorRemark 
from app.api._models.userModel import ACCESS
from app.api.auth.access_manager import accessRestrict


bp_mysqlCRUD = Blueprint('mysqlCRUD', __name__)
mysqlCRUDApi = Api(bp_mysqlCRUD)



@cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
@bp_mysqlCRUD.route('/mysql/show/')
def NotFound_showdata():
    data = [{'o':'No data'}]
    return jsonify(data)

@cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
@bp_mysqlCRUD.route('/tablefields/')
def NotFound_fields():
    return "o"


# ------------ DEALING WITH TABLE -------------->
class checkTablesApi(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['user'])
    def get(self):
        try:
            res = jsonify(checkTables())
            print(res.data)
            return res
        except Exception as e:
            print(e)
            print(type(e))
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))


class tableFieldsApi(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['user'])
    def get(self, input_tablename):
        try:
            res = jsonify(descFields(input_tablename))
            return res
        except Exception as e:
            print(e)
            print(type(e))
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))


mysqlCRUDApi.add_resource(checkTablesApi, '/checktables')
mysqlCRUDApi.add_resource(tableFieldsApi, '/tablefields')
mysqlCRUDApi.add_resource(tableFieldsApi, '/tablefields/<input_tablename>')



# ----------- MYSQL CRUD ------------------>
class MySqlShowApi(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['user'])
    def get(self, input_tablename):
        try:
            res = jsonify(showTable(input_tablename))
            return res
        except Exception as e:
            print(e)
            print(type(e))
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))


class MySqlEditApi(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['user'])
    def post(self,  *args, **kwargs):
        try:
            _json = request.json
            tb_name = _json['tablename']
            newData = _json['inputData']
            res = jsonify(createItem(tb_name, newData))
            return res
        except Exception as e:
            print(e)
            print(type(e))
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))

    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['user'])
    def put(self, *args, **kwargs):
        try:
            _json = request.json
            tb_name = _json['tablename']
            updateObj = _json['updateRowObj']
            whereSql = _json['whereCondition']
            res = jsonify(updateItem(tb_name, updateObj, whereSql))
            return res
        except Exception as e:
            print(e)
            print(type(e))
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))


class MySqlDeleteApi(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['user'])
    def post(self, *args, **kwargs):
        try:
            _json = request.json
            tb_name = _json['tablename']
            whereSql = _json['whereCondition']
            res = jsonify(deleteItem(tb_name, whereSql))
            print(res.data)
            return res
        except Exception as e:
            print(e)
            print(type(e))
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))


mysqlCRUDApi.add_resource(MySqlShowApi, '/show/<input_tablename>')
mysqlCRUDApi.add_resource(MySqlEditApi, '/edit')
mysqlCRUDApi.add_resource(MySqlDeleteApi, '/delete')






