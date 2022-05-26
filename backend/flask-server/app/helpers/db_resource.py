import pymysql
import configparser
from .optionDB import optDB_instance


class MyResource:
    def __init__(self):
        self.optionDB = ""
        self.configfile = "instance/db_configs/mysqlConfig.ini"
        self.currentDB = ""
        self.cursor = ""
        self.cfg = configparser.ConfigParser()
        self.cfg.read(self.configfile)
        self.db_host = self.cfg['Mysql']['host']
        self.db_port = self.cfg['Mysql']['port']
        self.db_user = self.cfg['Mysql']['user']
        self.db_pwd = self.cfg['Mysql']['password']
        self.my_db = self.cfg['Mysql']['database']
    
    def __enter__(self):
        try:
            print('Option prev len: ', len(self.optionDB))
            self.optionDB = optDB_instance.get_opt_db()

            if len(self.optionDB) == 0:
                self.currentDB = self.my_db
            else:
                self.currentDB = self.optionDB
            print('Option db: ', self.optionDB)
            print('Option current len: ', len(self.optionDB))
            print("The current database: ", self.currentDB)

            self.conn = pymysql.connect(
              host = self.db_host,
              port = self.db_port,
              user = self.db_user,
              password = self.db_pwd,
              #database=self.cfg['Mysql']['database'],
              database=self.currentDB,
              #database=self.database,
              charset='utf8'
            )
            print(self.conn)
            self.cursor = self.conn.cursor()
            return self.cursor
        except Exception as e:
            print(e)
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.commit()
        self.cursor.close()
        self.conn.close()

mysql_cur = MyResource() 

