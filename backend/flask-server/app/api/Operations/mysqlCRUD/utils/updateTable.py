import pymysql
from app.helpers.db_resource import MyResource
from app.api._utils.errorMessage import errorRemark
from app.api._utils.succMessage import succMessage

def updateItem(tb_name, updateObj, whereSql):
    try:
        _tbname = tb_name
        _whereSql = whereSql
        
        _tupA = tuple(updateObj.keys())
        _tupB = tuple(updateObj.values())
        _values = ', '.join(tuple(a+" = "+"'"+b+"'" for a, b in zip(_tupA, _tupB))) 

        _sql = "UPDATE %s SET %s WHERE %s" % (_tbname, _values, _whereSql)
        #print(_sql)

        with MyResource() as cur:
            try:
                cur.execute(_sql)
                cur.close()
                return succMessage()
                #return {'isSuccess': True, 'status': 200}
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



