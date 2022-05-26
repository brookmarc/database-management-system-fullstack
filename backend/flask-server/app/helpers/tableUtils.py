from app import cursor

tableField = []
def descTableFields(table_name):
    sql = '''desc %s'''%table_name
    cursor.execute(sql)
    tableFields.clear()
    for item in cursor.fetchall():
        tableFields.append(item[0])
    return tableField


