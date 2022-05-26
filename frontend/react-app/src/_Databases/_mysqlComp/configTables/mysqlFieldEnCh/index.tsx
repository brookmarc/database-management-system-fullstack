import React, {FunctionComponent} from 'react'
import { useState, useEffect } from 'react'


const MysqlFieldEnCh: FunctionComponent<T> = (props) => {

  const {
    tablename, 
    fieldList, 
    currMysqlDB, 
    mysqlStore,
  } = props

  
  useEffect(() => {
    mysqlStore.fetchMysqlEnChPair(currMysqlDB)
  }, [mysqlStore, currMysqlDB])

  const fieldEnChData = mysqlStore.mysqlFieldEnCh

  const [isEdit, setIsEdit] = useState(false)

  let tableEnChData = []
  
  if (fieldEnChData.length !== 0 && tablename !== "") {
    tableEnChData.push(fieldEnChData[0][tablename])
  } 

  const handleEditField = e => {
    e.preventDefault()
    isEdit !== false ? (setIsEdit(false)) : (setIsEdit(true))
  }

  
  let submitObj = {} 
  const onhandleSubmit = e => {
    e.preventDefault()
    let inputValues = {}
    if (window.confirm("Are you sure to submit...?")) {
      Object.entries(e.target.elements).forEach(([name, input]) => {
        if (input.type !== "submit") {
          inputValues[input.name] = input.value
        }
      })
      const data = Object(inputValues)
      submitObj["database"] = currMysqlDB
      submitObj["tablename"] = tablename
      submitObj["data"] = data
      
      try {
        mysqlStore.mutateMysqlEnChPair(submitObj)

        const isSuccess = mysqlStore.submitStatus.isSuccess
        if (isSuccess) {
          setTimeout(() => {
            mysqlStore.fetchMysqlEnChPair(currMysqlDB)
          }, 300)
          setTimeout(() => {
            setIsEdit(false)
          }, 500)
        }
      } catch (e) {
        console.error('Failed to mutate mysql en-ch pair!', e)
      }
    }
  }
  
 
  let renderFieldEnCh = []
  fieldList.forEach((field, i) => {
    renderFieldEnCh.push(
      <div key={i} className="field-box">
        <div className="field-key">{field}:</div>
        {!isEdit ? (
          <div className="field-value">
            {tableEnChData.length !== 0 && tableEnChData[0] !== undefined ? (
              tableEnChData[0][field] !== undefined ? (
                <p>{tableEnChData[0][field]}</p> ) : null
            ) : null}
          </div> 
        ) : (
          <>
            <div className="edit-input-box">
              <input 
                className="edit-input"
                type="text"
                name={field}
                defaultValue={
                  tableEnChData.length !== 0 && tableEnChData[0] !== undefined ? (
                    tableEnChData[0][field] !== undefined ? (
                      tableEnChData[0][field]
                    ) : ""
                  ) : ""
                }
              />
            </div>
          </>
        )}
      </div>
    )
  })

  return (
    <React.Fragment>
      <form
        className="edit-form"
        onSubmit={onhandleSubmit}
      >
        {renderFieldEnCh}
        {!isEdit ? (
          <div
            onClick={handleEditField}
            className="edit-btn-open"
          >
            <p>修改</p>
          </div>
         ) : (
           <div className="edit-btn-container">
             <div
               className="edit-btn-sub"
             >
               <input type="submit" value="提交" />
             </div>
             <div
               className="edit-btn-cancel"
               onClick={handleEditField}
             >
               <p>取消</p>
             </div>
           </div>
         )}
      </form>
    </React.Fragment>
  )
}


export default React.memo(MysqlFieldEnCh)


