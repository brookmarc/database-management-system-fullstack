import React, {FunctionComponent} from 'react'
import { useForm, Resolver } from "react-hook-form"
import { inject, observer } from 'mobx-react'
import { tableStore } from '../mst/tablemodelStore'

type FormValues = {
  newDatabase: string;
}

function isEmpty(obj) {
  return JSON.stringify(obj) === '{}'
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: !values.newDatabase ? {} : values,
    errors: !values.newDatabase ? {
      newDatabase: {
        type: "required",
        message: "This is required."
      }
    } : {}
  }
}

const AddNewDBForm: FunctionComponent<{mysqlStore}> = ({mysqlStore, onCloseAdd, createNewDB, refetchDB}) => {
  const {
    register,
    handleSubmit,
    reset,
    //formState: { errors }
    //formState
  } = useForm<FormValues>({
    resolver: resolver
  })

  //const { errors } = formState

  const onSubmit = handleSubmit((data) => {
    if (window.confirm("您是否确定提交...?")) {
      if (!isEmpty(data)) {
        async function onHandleSubmit(obj) {
          try {
            await tableStore.createNewDatabase(obj)
          } catch (error) {
            console.error("Failed to create new database")
          }
        }
        onHandleSubmit(data)
          .then(async () => {
            const submitStatus = tableStore.submitStatus
            if (submitStatus && submitStatus.length !== 0) {
              let submitStatusObj = {}
              submitStatus.forEach(item => {
                submitStatusObj['isSuccess'] = item.isSuccess
                submitStatusObj['code'] = item.code
                submitStatusObj['message'] = item.message
              })
              if (submitStatusObj.isSuccess !== false) {
                await setTimeout(() => {
                  reset({})
                  onCloseAdd()
                  refetchDB()
                }, 100)
              } else {
                alert(`Error code ${submitStatusObj.code}: ${submitStatusObj.message}`)
              }
            } else {
              console.error('The submit status is empty!')
            }
          })
      }
    }
  })

  return (
    <React.StrictMode>
      <form className="add-newdb-form" onSubmit={onSubmit}>
        <div className="add-newdb-input">
          <input 
            {...register("newDatabase")} 
            placeholder="请输入一个新数据库..."
          />
        </div>
        <div className="add-newdb-btn">
          <input type="submit" value="提交"/>
        </div>
      </form>
    </React.StrictMode>
  )
}

export default inject((mysqlStore) => ({mysqlStore}))(observer(AddNewDBForm))




