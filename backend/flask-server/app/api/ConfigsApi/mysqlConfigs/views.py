import yaml
import time
from flask import Blueprint, jsonify, json, request
from flask_restx import Api, Resource
from .mysqlconfig import createMysqlConfig
import configparser
from .showDatabases import show_databases
from .createDatabases import create_database
from flask_cors import cross_origin
from app.api._models.userModel import ACCESS
from app.api.auth.access_manager import accessRestrict
from app.helpers.optionDB import optDB_instance
from app.api._utils.errorMessage import errorRemark
from app.api._utils.succMessage import succMessage

bp_mysqlConfig = Blueprint('mysqlConfigs', __name__, )
mysqlConfig_api = Api(bp_mysqlConfig)



class ShowDatabases(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['user'])
    def get(self):
        try:
            databases_list = show_databases()
            #print(databases_list)
            return jsonify(databases_list)
        except Exception as e:
            print(e)
            print(type(e))
            return jsonify(errorRemark(code=400, message=e.args))

    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['user'])
    def post(self, *args, **kwargs):
        try:
            _json = request.json
            print(_json)
            optionDB = _json['optionDatabase']

            optDB_instance.set_opt_db(optionDB)
            return succMessage()

        except Exception as e:
            print(e)
            print(type(e))
            return jsonify(errorRemark(code=400, message=e.args))

mysqlConfig_api.add_resource(ShowDatabases, '/mysql/show-db')


class MysqlConfig(Resource):
    def __init__(self, *args, **kwargs):
        self.configfile = "instance/db_configs/mysqlConfig.ini"
        #self.configfile = "instance/db_configs/testconfig.ini"

    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['superuser'])
    def get(self, *args, **kwargs):
        try:
            mysqlconfigObj = {}
            cfg = configparser.ConfigParser()
            cfg.read(self.configfile)

            mysqlconfigObj['host'] = cfg['Mysql']['host']
            mysqlconfigObj['port'] = cfg['Mysql']['port']
            mysqlconfigObj['user'] = cfg['Mysql']['user']
            mysqlconfigObj['password'] = cfg['Mysql']['password']
            mysqlconfigObj['database'] = cfg['Mysql']['database']

            return mysqlconfigObj
        except Exception as e:
            print(e)
            print(type(e))
            return jsonify(errorRemark(code=400, message=e.args))


    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['superuser'])
    def post(self, *args, **kwargs):
        try:
            _json = request.json
            print(_json)
            host = _json['host']
            port = _json['port']
            user = _json['user']
            password = _json['password']
            database = _json['database']
            createMysqlConfig(host, port, user, password, database, self.configfile)
            return succMessage()
        except Exception as e:
            print (e)
            print(type(e))
            return jsonify(errorRemark(code=400, message=e.args))


mysqlConfig_api.add_resource(MysqlConfig, '/mysql')


class CreateDatabase(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['superuser'])
    def post(self, *args, **kwargs):
        try:
            _json = request.json
            print(_json)
            res = create_database(_json)
            print(res)
            return jsonify(res)
        except Exception as e:
            print(e)
            print(type(e))
            return jsonify(errorRemark(code=400, message=e.args))

mysqlConfig_api.add_resource(CreateDatabase, '/mysql/create-db')


class TableFieldEnCH(Resource):
    def __init__(self, *args, **kwargs):
        self.filename = "app/configs/mysql/en-ch.yaml"
        self.dbconfig = "instance/db_configs/mysqlConfig.ini"

    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['user'])
    def get(self, database=""):
        try:
            cfg = configparser.ConfigParser()
            cfg.read(self.dbconfig)
            default_db = cfg['Mysql']['database']
            if database != "":
                db_name = database
            else:
                db_name = default_db
            #print(db_name)

            with open(self.filename) as f:
                data = yaml.load(f, Loader=yaml.FullLoader)
                #print(data)
                res = data[db_name]
                print(jsonify(res))
                return jsonify(res)
        except Exception as e:
            print(e)
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))
            
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['admin'])
    def post(self):
        try:
            cfg = configparser.ConfigParser()
            cfg.read(self.dbconfig)
            default_db = cfg['Mysql']['database']

            _json = request.json

            if _json:
              database = _json["database"]
              tablename = _json["tablename"]
              data = _json["data"]
              #print(_json)

              if database != "":
                  db_name = database
              else:
                  db_name = default_db
              #print(db_name)

              def read_yaml():
                  with open(self.filename) as f:
                      doc = yaml.load(f, Loader=yaml.SafeLoader)
                      return doc

              def write_yaml(data):
                  with open(self.filename, "w") as f:
                      yaml.dump(data, f, default_flow_style=False, explicit_start=True)
              
              doc = read_yaml()
              if doc is not None:
                  if db_name in doc:
                      #print(doc[db_name])
                      if doc[db_name] is not None:
                          doc = read_yaml()
                          doc[db_name][tablename] = data
                          write_yaml(doc)
                          return succMessage()
                      else: 
                          print('The doc[db_name] is none!')
                          tbname = """'%s': """ % tablename
                          doc = read_yaml()
                          doc[db_name] = yaml.full_load(tbname)
                          write_yaml(doc)

                          doc = read_yaml()
                          doc[db_name][tablename] = data
                          write_yaml(doc)
                          return succMessage()
                  else:
                      print('current database not exist')
                      dbname = """ '%s': """ % db_name
                      currData = read_yaml()
                      currData.update({db_name: None})
                      doc = currData
                      write_yaml(doc)

                      tbname = """ '%s': """ % tablename
                      doc = read_yaml()
                      doc[db_name] = yaml.full_load(tbname)
                      write_yaml(doc)

                      doc = read_yaml()
                      doc[db_name][tablename] = data
                      write_yaml(doc)
                      return succMessage()
              else:
                  print('Empty file')
                  dbname = """ '%s': """ % db_name
                  doc = read_yaml()
                  doc = yaml.full_load(dbname)
                  write_yaml(doc)

                  tbname = """ '%s': """ % tablename
                  doc = read_yaml()
                  doc[db_name] = yaml.full_load(tbname)
                  write_yaml(doc)

                  doc = read_yaml()
                  doc[db_name][tablename] = data
                  write_yaml(doc)
                  return succMessage()


        except Exception as e:
            print(str(e))
            print(e.args)
            return jsonify(errorRemark(code=400, message=e.args))

mysqlConfig_api.add_resource(TableFieldEnCH, '/mysql/table/en-ch')
mysqlConfig_api.add_resource(TableFieldEnCH, '/mysql/table/en-ch/')
mysqlConfig_api.add_resource(TableFieldEnCH, '/mysql/table/en-ch/<database>')



