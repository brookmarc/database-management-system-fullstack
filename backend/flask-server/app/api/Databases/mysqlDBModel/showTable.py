from flask import jsonify
import pymysql
from app.helpers.db_dict_resource import MyResource
from app.api._utils.errorMessage import errorRemark

tableInfo = []
def show_table(input_tablename):
    try:
        tableInfo = []
        with MyResource() as cur:
            try:
                cur.execute("show create table %s" % input_tablename)
                tableInfo.clear()
                for item in cur.fetchall():
                    tableInfo.append(item)
                cur.close()
                return tableInfo
            except (pymysql.Error, pymysql.Warning) as e:
                code, message = e.args
                errorMessage = errorRemark(code, message)
                return errorMessage

    except Exception as e:
        print('Error exception: ')
        print(e)
        print(type(e))

