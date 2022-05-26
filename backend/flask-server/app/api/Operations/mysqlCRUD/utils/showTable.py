import pymysql
from app.helpers.db_dict_resource import MyResource
from app.api._utils.errorMessage import errorRemark

def showTable(tableName):
    try:
        with MyResource() as cur:
            try:
                cur.execute("SELECT * FROM %s" % tableName)
                rows = cur.fetchall()
                cur.close()
                return rows
            except (pymysql.Error, pymysql.Warning) as e:
                code, message = e.args
                print(type(e))
                return errorRemark(code, message)
                #print("Error code: ", code)
                #print("Error message: ", message)
                #return {'isSuccess': False, 'code': code, 'message': message}

    except Exception as e:
        print('Error exception:')
        print(e)
        print(type(e))



