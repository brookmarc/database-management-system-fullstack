from flask import jsonify
import pymysql
from app.helpers.db_connect import MyResource
from app.api._utils.errorMessage import errorRemark
from app.api._utils.succMessage import succMessage

def create_database(_json):
    try:
        _dbname = _json["newDatabase"]
        if _dbname == "":
            return errorRemark(code=400, message="There are no input data!")
        else:
            _sql = "CREATE DATABASE %s" % (_dbname)
            with MyResource() as cur:
                try:
                    cur.execute(_sql)
                    cur.close()
                    return succMessage()
                except (pymysql.Error, pymysql.Warning) as e:
                    code, message = e.args
                    print(type(e))
                    return errorRemark(code, message)
    except Exception as e:
        print(type(e))
        print('Error exception: ')
        print(e)




