from flask import jsonify
import pymysql
from app.helpers.db_resource import MyResource
from app.api._utils.errorMessage import errorRemark

table_lists = []
def checkTables():
    try:
        table_lists = []
        with MyResource() as cur:
            try:
                cur.execute("show tables")
                table_lists.clear()
                for db in cur.fetchall():
                    table_lists.append(db[0])
                cur.close()
                return table_lists
            except (pymysql.Error, pymysql.Warning) as e:
                code, message = e.args
                return errorRemark(code, message)
    
    except Exception as e:
        print('Error exception: ')
        print(e)
        print(type(e))

