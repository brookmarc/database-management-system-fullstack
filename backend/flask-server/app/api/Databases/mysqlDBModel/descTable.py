from flask import jsonify
import pymysql
from app.helpers.db_dict_resource import MyResource
from app.api._utils.errorMessage import errorRemark

tableFields = []
def desc_table(input_tablename):
    try:
        tableFields = []
        with MyResource() as cur:
            try:
                cur.execute("desc %s" % input_tablename)
                tableFields.clear()
                for items in cur.fetchall():
                    tableFields.append(items)
                cur.close()
                #print(tableFields)
                return tableFields
            except (pymysql.Error, pymysql.Warning) as e:
                code, message = e.args
                errorMessage = errorRemark(code, message)
                return errorMessage

    except Exception as e:
        print('Error exception: ')
        print(e)
        print(type(e))

