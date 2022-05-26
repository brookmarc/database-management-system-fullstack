
class OptionDatabase:
    def __init__(self, opt_database = ""):
        self.opt_database = opt_database

    #getter method
    def get_opt_db(self):
        return self.opt_database

    # setter method
    def set_opt_db(self, sel_database):
        self.opt_database = sel_database


optDB_instance = OptionDatabase()


