import React from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { UPDATE_USERACCESS } from '../graphql/gqlTypes'
import {UpdateAccessForm} from '../utils/updateForm'
import useForm from '../hooks/useForm'

const UpdateUserAccess = ({unameList, setUpdateAction}) => {
  const updateForm = UpdateAccessForm(unameList)
  
  //const [updateUserAccessFn, {loading, error}] = useMutation(
  const [updateUserAccessFn ] = useMutation(
    UPDATE_USERACCESS, 
    //{
    //  refetchQueries: [
    //    FETCH_USERS,
    //    'users'
    //  ],
    //}
  )

  const {data, renderFormInputs, isFormValid} = useForm(updateForm)

  const handleSubmit = async e => {
    e.preventDefault()
	  
    try {
      await setTimeout(() => {
        updateUserAccessFn({variables: {
          username: data.username,
	  newAccessLevel: data.accesslevel,
	},
	update: (cache) => {
          try {
            if (cache) {
              cache.modify({
                fields: {
                  users() {}
		}
	      })
	    }
	  } catch (error) {
            console.error("Failed to update the access level")
	  }
	}
	});
      }, 100)
      await setTimeout(() => {
	setUpdateAction({value: "", label: "设置选择..."})
      }, 500)
    } catch(error) {
      console.error('Failed to update the user access level')
    }
  }

  return (
    <React.StrictMode>
    <Styles>
      <form onSubmit={handleSubmit}>
	{renderFormInputs()}
	<div className="form-btn">
	  <input type="submit" value="提交" disabled={!isFormValid()} />
	</div>
      </form>
    </Styles>
    </React.StrictMode>
  )
}

export default React.memo(UpdateUserAccess)

const Styles = styled.section``


