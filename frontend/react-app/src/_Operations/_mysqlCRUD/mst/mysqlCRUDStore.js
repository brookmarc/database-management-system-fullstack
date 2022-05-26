import { types, flow } from "mobx-state-tree"
import { queriesApi } from '../../../services/api.service'

const baseFlaskUrl = process.env.REACT_APP_FLASK_BASE_URL


export const TableKeys = types.model("TableKeys", {
  Field: types.string,
  Key: types.string,
})

export const SearchInputObj = types.model("searchInputObj", {
  OptField: types.string,
  InputValue: types.string,
})

export const TableFeatures = types.model("TableFeatures", {
  Field: types.string,
  Type: types.string,
  Null: types.string,
  Extra: types.string,
})

export const MySqlCRUDStore = types
  .model("TableStore", {
    tableList: types.optional(types.array(types.string), []),
    tableKeyList: types.optional(types.array(TableKeys), []),
    searchInput: types.optional(types.array(SearchInputObj), []),
    tableFeatures: types.optional(types.array(TableFeatures), []),
  })
  .actions(self => ({
    fetchTablesFn: flow(function* fetchTablesFn(){
      try {
        self.tableList = []
	const data = yield queriesApi(baseFlaskUrl + "/api/operations/mysql/checktables")
        const arrLen = self.tableList.length

        if (arrLen !== 0) {
          self.tableList = []
        }
	if (Array.isArray(data) && data !== null && data !== undefined) {
          self.tableList = data.map(i => i)
	}
      } catch (error) {
        console.error("Failed to fetch tables", error)
      }
    })
  }))
  .actions(self => ({
    fetchModelFields: flow(function* fetchModelFields(tbname){
      try {
	const data = yield queriesApi(baseFlaskUrl + `/api/db/mysql/tablemodel/${tbname}`)
	if (Array.isArray(data) && data !== null && data !== undefined) {
	  self.tableFeatures = data.map(obj => (
	    {
              Field: obj.Field,
	      Type: obj.Type,
	      Null: obj.Null,
	      Extra: obj.Extra,
	    }
	  ))

	  let keyList = []
	  for (let item of data){
            if (item.Key !== undefined || item.Key !== null) {
              if (item.Key === 'PRI' || item.Key === 'UNI') {
                keyList.push(item)
	      }
	    }
	  }
	  self.tableKeyList = keyList.map(obj => (
            {
              Field: obj.Field,
              Key: obj.Key,
	    }
	  ))
	}

      } catch (error) {
        console.error("Failed to fetch table models", error)
      }
    })
  }))
  .actions(self => ({
    setSearchInputFn: flow(function setSearchInputFn(searchObj) {
      try {
	 let inputValue = []
	 inputValue.push(searchObj)
	 self.searchInput = inputValue.map(obj => ({
	   OptField: obj.optionField,
	   InputValue: obj.searchInput,
	 }))
      } catch (error) {
	console.error("Failed to set search input", error)
      }
    })
  }))


export const mysqlCRUDStore = MySqlCRUDStore.create({})

