import time
from .checkTable import check_table
from .descTable import desc_table
from .createTable import create_table
from .showTable import show_table
from .alterTable import alter_table
from flask import Blueprint, jsonify, request, json
from flask_cors import cross_origin
from flask_restx import Api, Resource
from app.api._models.userModel import ACCESS
from app.api.auth.access_manager import accessRestrict, authorize
from app.api._utils.errorMessage import errorRemark


bp_mysqlModel = Blueprint('mysqlDBModel', __name__)
mysqlmodel = Api(bp_mysqlModel)



class checkTablesApi(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    #@authorize
    @accessRestrict(access_level=ACCESS['admin'])
    def get(self):
        try:
            res = jsonify(check_table())
            return res
        except Exception as e:
            print(e)
            print(type(e))
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))

mysqlmodel.add_resource(checkTablesApi, '/checktables')

# ------------------ Describe table ------------------
@cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
#@authorize
@bp_mysqlModel.route('/tablemodel/')
def NotFound_tbModel():
    data = [{'Field':'test'}]
    return jsonify(data)

@cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
#@authorize
@bp_mysqlModel.route('/tablemodel/undefined')
def NotFound_tbModel1():
    data = [{'Field':'test'}]
    return jsonify(data)


class tableModel(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    #@authorize
    @accessRestrict(access_level=ACCESS['user'])
    def get(self, input_tablename, *args, **kwargs):
        try:
            tableLists = check_table()
            tableModels = desc_table(input_tablename)
            return jsonify(tableModels)
        except Exception as e:
            print(e)
            print(type(e))
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))


mysqlmodel.add_resource(tableModel, '/tablemodel/')
mysqlmodel.add_resource(tableModel, '/tablemodel/<input_tablename>')

# ----------------- Create table -------------------
@cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
#@authorize
#@accessRestrict(access_level=ACCESS['admin'])
@bp_mysqlModel.route('/createtable')
def NotFound_crModel():
    data = [{'Not found': True}]
    return jsonify(data)


class createTableModel(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    #@authorize
    @accessRestrict(access_level=ACCESS['admin'])
    def post(self, *args, **kwargs):
        try:
            _json = request.json
            input_tbname = _json['input_tbname']
            input_field = _json['input_sql']
            res = create_table(input_tbname, input_field)
            return jsonify(res)
        except Exception as e:
            print (e)
            print(type(e))
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))
          

mysqlmodel.add_resource(createTableModel, '/createtable')


# -------------------- Alter table --------------------
@cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
#@authorize
#@accessRestrict(access_level=ACCESS['admin'])
@bp_mysqlModel.route('/altertable/')
def NotFont_showTable():
    data = [{'Create Table': 'No data'}]
    return jsonify(data)


class alterTableModel(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    #@authorize
    @accessRestrict(access_level=ACCESS['admin'])
    def get(self, input_tbname, *args, **kwargs):
        try:
            tableInfo = show_table(input_tbname)
            return jsonify(tableInfo)
        except Exception as e:
            print(e)
            print(type(e))
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))

    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['admin'])
    def post(self, *args, **kwargs):
        try:
            _json = request.json
            input_sql = _json['input_sql']
            res = alter_table(input_sql)
            return res
        except Exception as e:
            print(e)
            print(type(e))
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))


mysqlmodel.add_resource(alterTableModel, '/altertable/')
mysqlmodel.add_resource(alterTableModel, '/altertable/<input_tbname>')



# -------------------- config field name -------------------










