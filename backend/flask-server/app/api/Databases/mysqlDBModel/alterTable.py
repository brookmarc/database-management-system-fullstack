from flask import jsonify
import pymysql
from app.helpers.db_dict_resource import MyResource
from app.api._utils.errorMessage import mutateErrorMessage
from app.api._utils.succMessage import succMessage

def alter_table(input_sql):
    try:
        with MyResource() as cur:
            try:
                cur.execute(input_sql)
                cur.close()
                return succMessage()
                #return jsonify({'isSuccess': True, 'code': 200, 'message': 'Alter successful!'}), 200, {'ContentType': 'application/json'}
            except (pymysql.Error, pymysql.Warning) as e:
                code, message = e.args
                print(type(e))
                print("Error code: ", code)
                print("Error message: ", message)
                errorMessage = mutateErrorMessage(code, message)
                #print(errorMessage)
                return errorMessage

    except Exception as e:
        print('Error exception:')
        print(e)
        print(type(e))

