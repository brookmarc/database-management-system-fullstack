import pymysql
import configparser

class MyResource:
    #def __init__(self, database):
    def __init__(self):
        #self.database = database
        self.configfile = "instance/db_configs/mysqlConfig.ini"
    def __enter__(self):
        try:
            self.cfg = configparser.ConfigParser()
            self.cfg.read(self.configfile)
            self.conn = pymysql.connect(
              host=self.cfg['Mysql']['host'],
              port=self.cfg['Mysql']['port'],
              user=self.cfg['Mysql']['user'],
              password=self.cfg['Mysql']['password'],
              #database=self.cfg['Mysql']['database'],
              #database=self.database,
              charset='utf8'
            )
            #print(self.conn)
            self.cursor = self.conn.cursor()
            return self.cursor
        except Exception as e:
            print(e)
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.commit()
        self.cursor.close()
        self.conn.close()


