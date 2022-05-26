from flask import jsonify
import pymysql
from app.helpers.db_resource import MyResource
from app.api._utils.errorMessage import errorRemark


db_list = []
def check_table():
    try:
        db_list = []
        with MyResource() as cur:
            try:
                cur.execute("SHOW TABLES")
                db_list.clear()
                for db in cur.fetchall():
                    db_list.append(db[0])
                cur.close()
                return db_list
            except (pymysql.Error, pymysql.Warning) as e:
                code, message = e.args
                errorMessage = errorRemark(code, message)
                return errorMessage

    except Exception as e:
        print('Error exception: ')
        print(e)
        print(type(e))



