import pymysql
from app.helpers.db_resource import MyResource
from app.api._utils.errorMessage import errorRemark
from app.api._utils.succMessage import succMessage

def createItem(tb_name, _json):
    try:
        _tbname = tb_name
        _fieldname = ', '.join(tuple(list(_json.keys())))
        obj_len = len(_json)
        if (obj_len <= 1):
            _list = list(_json.values())
            for i in _list:
                _values = "(" + "'" + i + "'" + ")"
        else:
            _values = tuple(list(_json.values()))

        _sql = "INSERT INTO %s (%s) VALUES %s" % (_tbname, _fieldname, _values)

        with MyResource() as cur:
            try:
                cur.execute(_sql)
                cur.close()
                return succMessage()
            except (pymysql.Error, pymysql.Warning) as e:
                code, message = e.args
                print(type(e))
                return errorRemark(code, message)
    except Exception as e:
        print('Error exception:')
        print(e)
        print(type(e))



