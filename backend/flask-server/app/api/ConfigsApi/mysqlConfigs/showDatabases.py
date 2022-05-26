from flask import jsonify
import pymysql
from app.helpers.db_connect import MyResource

db_temp = []

def show_databases():
    try:
        db_temp = []
        with MyResource() as cur:
            try:
                cur.execute("SHOW DATABASES")
                db_temp.clear()
                for item in cur.fetchall():
                    db_temp.append(item[0])
                return db_temp
            except (pymysql.Error, pymysql.Warning) as e:
                code, message = e.args
                print(type(e))
                print("Error code: ", code)
                print("Error message: ", message)
    except Exception as e:
        print(type(e))
        print('Error exception: ')
        print(e)





