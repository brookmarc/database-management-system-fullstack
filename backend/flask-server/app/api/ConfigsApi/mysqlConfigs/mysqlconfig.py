import configparser


def createMysqlConfig(host, port, user, password, database, configfile):
    try:
        Config = configparser.ConfigParser()
        Config.add_section("Mysql")
        Config.set("Mysql", "host", host)
        Config.set("Mysql", "port", port)
        Config.set("Mysql", "user", user)
        Config.set("Mysql", "password", password)
        Config.set("Mysql", "database", database)

        with open(configfile, "w") as cfg:
            Config.write(cfg)
            cfg.flush()
            cfg.close()
    except Exception as e:
        print(e)
        print('Error exception: ')
        print(e.args)
        print(type(e))

