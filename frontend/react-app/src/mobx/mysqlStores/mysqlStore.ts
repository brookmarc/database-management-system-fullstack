import { observable, action} from 'mobx'
import { queriesApi, mutationsApi } from '../../services/api.service'

const baseFlaskUrl = process.env.REACT_APP_FLASK_BASE_URL

class MysqlStore {

  constructor(){
    this.baseFlaskUrl = baseFlaskUrl
    this.createNewDatabase = this.createNewDatabase.bind(this)
    this.fetchMysqlEnChPair = this.fetchMysqlEnChPair.bind(this)
    this.mutateMysqlEnChPair = this.mutateMysqlEnChPair.bind(this)
    this.fetchMysqlDB = this.fetchMysqlDB.bind(this)
    this.showMysqlConfig = this.showMysqlConfig.bind(this)
    this.updateMysqlConfig = this.updateMysqlConfig.bind(this)
  }

  @observable error = []
  @observable databaseList = []
  @observable tableName = []
  @observable fieldlist = []
  @observable submitStatus = []
  @observable mysqlConfigs = []
  @observable mysqlFieldEnCh = []


  @action
  async fetchMysqlDB() {
    try{
      this.databaseList = []
      this.error = []
      const data = await queriesApi(this.baseFlaskUrl + '/api/configs/mysql/show-db')
      for (let item of data) {
	if (item !== "info" && item !== "sys" && item !== "mysql" && item !== "information_schema" && item !== "performance_schema") {
          this.databaseList.push(item)
	}
      }
    } catch (error) {
      this.error = error.message
      console.error("Failed to fetch database!", error)
    }
  }

  @action
  async setOptionMysqlDB(data) {
    try {
      this.error = []
      mutationsApi(
        `${this.baseFlaskUrl}/api/configs/mysql/show-db`, 'post', data
      )
       .then(
         value => {
	   this.submitStatus = value
	 }
       )
    } catch (error) {
      this.error = error.message
      console.error("Failed to set option database!", error)
    }
  }

  @action
  async fetchTableName() {
    try {
      this.tableName = []
      this.error = []
      const data = await queriesApi(this.baseFlaskUrl + "/api/db/mysql/checktables")
      if (data && data.length !== 0) {
        this.tableName.push(data)
      }
    } catch (error) {
      this.error = error.message
      console.error("Failed to fetch table name!", error)
    }
  }

  @action
  async fetchFieldname(selectedTbname) {
    try {
      this.fieldlist = []
      this.error = []
      const data = await queriesApi(this.baseFlaskUrl + `/api/operations/mysql/tablefields/${selectedTbname}`)
      if (data && data.length !== 0) {
        for (let field of data) {
	  this.fieldlist.push(field)
	}
      }
    } catch (error) {
      this.error = error.message
      console.error("Failed to fetch field name!", error)
    }
  }

  // Table fields En-CH pair
  @action
  async fetchMysqlEnChPair(optDatabase = "") {
    try {
      this.mysqlFieldEnCh = []
      this.error = []
      const data = await queriesApi(`${this.baseFlaskUrl}/api/configs/mysql/table/en-ch/${optDatabase}`)
      if (data && data.length !== 0) {
	this.mysqlFieldEnCh.push(data)
      }
    } catch (error) {
      this.error = error.message
      console.error("Failed to fetch En-ch pair!", error)
    }
  }

  @action
  async mutateMysqlEnChPair(data) {
    try {
      this.error = []
      mutationsApi(`${this.baseFlaskUrl}/api/configs/mysql/table/en-ch`, 'post', data)
       .then(value => {
	 this.submitStatus = value
       })
    } catch (error) {
      this.error = error.message
      console.error("Failed to mutate mysql En-Ch pair!", error)
    }
  }

  // database configuration
  @action 
  async showMysqlConfig() {
    try {
      this.mysqlConfigs = []
      this.error = []
      const data = await queriesApi(`${this.baseFlaskUrl}/api/configs/mysql`)
      if (data && data.length !== 0) {
        this.mysqlConfigs.push(data)
      }
    } catch (error) {
      this.error = error.message
      console.error("Failed to fetch mysql configs!", error)
    }
  }

  @action
  async updateMysqlConfig(data) {
    try {
      this.error = []
      mutationsApi(
        `${this.baseFlaskUrl}/api/configs/mysql`, 'post', data
      )
       .then(value => {
         this.submitStatus = value
       })
    } catch (error) {
      this.error = error.message
      console.error("Failed to update mysql configs!", error)
    } 
  }

  @action
  async createNewDatabase(data) {
    try {
      console.log(data)
      const res = mutationsApi(
        `${this.baseFlaskUrl}/api/configs/mysql/create-db`, 'post', data
      )
      this.submitStatus.push(res)
    } catch (error) {
      this.error = error.message
      console.error("Failed to create database!", error)
    }
  }
}


const mysqlStore = new MysqlStore()

export default mysqlStore





