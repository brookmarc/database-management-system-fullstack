import { types, flow } from "mobx-state-tree"
import { queriesApi, mutationsApi } from '../../../services/api.service'

const baseFlaskUrl = process.env.REACT_APP_FLASK_BASE_URL

export const Table = types.model("Table", {
  Field: types.string,
  Type: types.string,
  Null: types.string,
  Key: '',
  Default: types.maybeNull(types.string),
  Extra: types.string
})

export const TableInfo = types.model("TableInfo", {
  createTable: types.string,
})

export const SubmitStatus = types.model("SubmitStatus", {
  code: types.number || null,
  message: types.string || "",
  isSuccess: true
})

export const TableStore = types
  .model("TableStore", {
    tableList: types.optional(types.array(types.string), []),
    tableModel: types.optional(types.array(Table), []),
    tableInfo: types.optional(types.array(TableInfo), []),
    submitStatus: types.optional(types.array(SubmitStatus), []),
  })
  .actions(self => ({
    fetchTablesFn: flow(function* fetchTablesFn(){
      try {
        self.tableList = []
	const data = yield queriesApi(baseFlaskUrl + '/api/db/mysql/checktables')
        const arrLen = self.tableList.length

        if (arrLen !== 0) {
          self.tableList = []
        }
        self.tableList = data.map(i => i)
      } catch (error) {
        console.error("Failed to fetch tables", error)
      }
    })
  }))
  .actions(self => ({
    fetchModel: flow(function* fetchModel(tbname){
      try {
	const data = yield queriesApi(baseFlaskUrl + `/api/db/mysql/tablemodel/${tbname}`)
	self.tableModel = data.map(obj => (
	  {
            Field: obj.Field,
	    Type: obj.Type,
	    Null: obj.Null,
	    Key: obj.Key,
	    Default: obj.Default,
	    Extra: obj.Extra
	  }
	))
      } catch (error) {
        console.error("Failed to fetch table models", error)
      }
    })
  }))
  .actions(self => ({
    fetchTableInfo: flow(function* fetchTableInfo(tbname){
      try {
	const data = yield queriesApi(baseFlaskUrl + `/api/db/mysql/altertable/${tbname}`)
	self.tableInfo = data.map(obj => ({
	  createTable: obj['Create Table']
	}))
      } catch (error) {
        console.error("Failed to fetch table info", error)
      }
    })
  }))
  .actions(self => ({
    createTableFn: flow(function* createTableFn(data){
      try {
	self.submitStatus = []
	const res = yield mutationsApi(baseFlaskUrl + '/api/db/mysql/createtable', 'post', data)
	let resArr = []
	resArr.push(res)
	if (resArr.length !== 0) {
          self.submitStatus = createSubmitStatus(resArr)	
	}
      } catch (error) {
        console.error("Failed to create a table!", error)
      }
    })
  }))
  .actions(self => ({
    execTableSql: flow(function* execTableSql(data){
      try {
	self.submitStatus = []
	const res = yield mutationsApi(baseFlaskUrl + '/api/db/mysql/altertable/', 'post', data)
	let resArr = []
	resArr.push(res)
	if (resArr.length !== 0) {
          self.submitStatus = createSubmitStatus(resArr)	
	}
      } catch (error) {
        console.error("Failed to post the request sql sentence", error)
      }
    })
  }))
  .actions(self => ({
    createNewDatabase: flow(function* createNewDatabase(data) {
      try {
	self.submitStatus = []
        const res = yield mutationsApi(`${baseFlaskUrl}/api/configs/mysql/create-db`, 'post', data)
	let resArr = []
        resArr.push(res)
	if (resArr.length !== 0) {
          self.submitStatus = createSubmitStatus(resArr)	
	}
	console.log(self.submitStatus)
      } catch (error) {
        console.error('Failed to create a new db! ', error)
      }
    })
  }))


export const tableStore = TableStore.create({})


function createSubmitStatus(arr) {
  const data = arr.map(obj => ({
    code: obj.code,
    message: obj.message,
    isSuccess: obj.isSuccess
  }))
  return data
}


