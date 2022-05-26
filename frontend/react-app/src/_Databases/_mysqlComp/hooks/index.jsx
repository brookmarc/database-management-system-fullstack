import { useState, useCallback } from 'react'
import { tableStore } from '../mst/tablemodelStore'


function isEmpty(obj) {
  return JSON.stringify(obj) === '{}'
}

export const useInputForm = async (initialState={}) => {
  const [inputs, setInputs] = useState(initialState)

  const handleChange = useCallback(e => {
    const newValues = {...inputs, [e.target.name]: e.target.value}
    setInputs(newValues)
  }, [inputs])

  //const handleChange = useCallback(name => {
  //  return ({ target: {value}}) => {
  //    setInputs(newValues => ({...newValues, [name]: value}))
  //  }
  //}, [inputs])

  return {inputs, setInputs, handleChange}
}

export const useForm = (initialState = {}) => {
  const [inputs, setInputs] = useState(initialState)

  const handleChange = useCallback(e => {
    const newValues = {...inputs, [e.target.name]: e.target.value}
    setInputs(newValues)
  }, [inputs])

  const onSubmitData = (input_obj, initialState, tablename, actionType, setTbname, mysqlStore) => {
    if (window.confirm("您是否确认提交...?")){
      if (isEmpty(input_obj)) {
        alert('请选择一张MySQL表格!')
      } else {
        async function execMySql(input_obj){
          try {
            await tableStore.execTableSql(input_obj)
          } catch (error) {
            console.error("Failed to execute the sql sentence!")
          }
        } 
        execMySql(input_obj)
          .then(async () => {
	    const submitStatus = tableStore.submitStatus
	    if (submitStatus && submitStatus !== undefined) {
	      let submitStatusObj = {}
	      submitStatus.forEach(item => {
                submitStatusObj['isSuccess'] = item.isSuccess
                submitStatusObj['code'] = item.code
                submitStatusObj['message'] = item.message
	      })
	      if (submitStatusObj.isSuccess === false) {
                alert(`Error code ${submitStatusObj.code}: ${submitStatusObj.message}`)
	      } else {
                try {
                  if (actionType !== 'RENAME TO' && actionType !== 'DROP TABLE') {
                    await setTimeout(() => {
                      tableStore.fetchModel(tablename)
                      tableStore.fetchTableInfo(tablename)
                    }, 100)
                  } else if (actionType === 'RENAME TO' || actionType === 'DROP TABLE') {
                    await setTimeout(() => {
                      setTbname({value: ""})
                      tableStore.fetchTablesFn()
                      mysqlStore.fetchTableName()
                    }, 100)
                  }
                } catch (error) {
                  console.error("Failed to fetch again!" + error)
                }
                await setTimeout(() => {
                  setInputs(initialState)
                }, 300)
	      }
	    }
          })
          .catch((error) => {
            console.error('Failed to submit!')
	    console.error(error)
          })
      }
    }
  }

  return {inputs, setInputs, handleChange, onSubmitData}
}


export const useNestedForm = (initialState = {}) => {
  const [nestedInputs, setNestedInputs] = useState(initialState)

  const onhandleChange = useCallback((i, e) => {
    let newValues = [...nestedInputs]
    newValues[i][e.target.name] = e.target.value
    setNestedInputs(newValues)
  }, [nestedInputs])

  const handleSubmitData = (input_obj, initialState, setInputs, closeModal, mysqlStore) => {
    if (window.confirm("您是否确认提交...?")) {
      if (!isEmpty(input_obj)) {
        async function createtableFn(input_obj) {
          try {
            await tableStore.createTableFn(input_obj)
          } catch (error) {
            console.error("Failed to create a table!")
          }
        }
        createtableFn(input_obj)
	  .then(async () => {
            const submitStatus = tableStore.submitStatus
	    if (submitStatus && submitStatus !== undefined) {
	      let submitStatusObj = {}
	      submitStatus.forEach(item => {
                submitStatusObj["isSuccess"] = item.isSuccess
	        submitStatusObj["code"] = item.code
	        submitStatusObj["message"] = item.message
	      })
	      if (submitStatusObj.isSuccess !== false) {
                try {
                  await setTimeout(() => {
                    setInputs({})
	            setNestedInputs(initialState)
	          }, 100)
	          await setTimeout(() => {
                    tableStore.fetchTablesFn()
	            mysqlStore.fetchTableName()
	            closeModal()
	          }, 200)
	        } catch (error) {
                  console.error("Failed to fetch again!" +  error)
	        }
	      } else {
                alert(`Error code ${submitStatusObj.code}: ${submitStatusObj.message}`)
	      }
	    }
	  })
          .catch((error) => { 
	    console.log("Failed to submit!!") 
	    console.error(error)
	  })
      }
    }
  } 

  return {nestedInputs, setNestedInputs, onhandleChange, handleSubmitData}
}




