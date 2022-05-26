from flask import jsonify
import pymysql
from app.helpers.db_resource import MyResource
from app.api._utils.errorMessage import errorRemark


tableField = []
def descFields(table_name):
    try:
        tableField = []
        with MyResource() as cur:
            try:
                sql = "DESC %s" % table_name
                cur.execute(sql)
                tableField.clear()
                rows = cur.fetchall()
                for item in rows:
                    tableField.append(item[0])
                #print('............table fields..................')
                #print(tableField)
                cur.close()
                return tableField

            except (pymysql.Error, pymysql.Warning) as e:
                code, message = e.args
                print(type(e))
                return errorRemark(code, message)
                #print("Error code: ", code)
                #print("Error message", message)
                #return jsonify({'desc table: ': False}, 404)

    except Exception as e:
        print('Error exception: ')
        print(e)
        print(type(e))



