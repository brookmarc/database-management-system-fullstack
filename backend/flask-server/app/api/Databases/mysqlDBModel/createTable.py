from flask import jsonify
import time
import pymysql
from app.helpers.db_resource import MyResource
from .checkTable import check_table
from app.api._utils.errorMessage import errorRemark
from app.api._utils.succMessage import succMessage

sql = '''CREATE TABLE IF NOT EXISTS %s (
  %s
)
'''

#succ_msg = {'isSuccess': True, 'code': 200, 'message': 'Created successful!'}

def create_table(input_tbname, input_field):
    try:
        curr_tablename = check_table()
        #print(curr_tablename)
        if input_tbname not in curr_tablename:
            time.sleep(1)
            sql_execute = sql % (input_tbname, input_field)

            with MyResource() as cur:
                try:
                    cur.execute(sql_execute)
                    cur.close()
                    return succMessage()
                    #return jsonify(succ_msg), 200, {'ContentType': 'application/json'}
                except (pymysql.Error, pymysql.Warning) as e:
                    code, message = e.args
                    print(type(e))
                    errorMessage = errorRemark(code, message)
                    return errorMessage

        else:
            print("The table %s already exist!" % input_tbname)
            code = 400
            message = "This table already exist!"
            return errorRemark(code, message)
            time.sleep(1)

    except Exception as e:
        print('Error exception: ')
        print(e)
        print(type(e))






