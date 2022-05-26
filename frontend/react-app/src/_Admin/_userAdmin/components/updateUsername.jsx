import React from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { UPDATE_USERNAME } from '../graphql/gqlTypes'
import {UpdateUsernameForm} from '../utils/updateForm'
import useForm from '../hooks/useForm'

const UpdateUsername = ({unameList, setUpdateAction}) => {
  const updateUsernameForm = UpdateUsernameForm(unameList) // function

  //const [updateUnameFn, {loading, error}] = useMutation(
  const [updateUnameFn ] = useMutation(
    UPDATE_USERNAME, 
    //{
    //  refetchQueries: [
    //    FETCH_USERS,
    //    //'users'
    //  ],
    //},
  )

  const {data, renderFormInputs, isFormValid} = useForm(updateUsernameForm)
  const formInput = renderFormInputs()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await setTimeout(() => {
        updateUnameFn({
	 variables: {
            username: data.username,
	    newUsername: data.newusername,
	  },
	  update: (cache) => {
            try {
              if (cache !== undefined) {
	        cache.modify({
                  fields: {
                    users(){
		    }
		  }
		})
              }
            } catch (error){
              console.error('Failed to update username cache')
            }
          }
	});
      }, 100)
      await setTimeout(() => {
	setUpdateAction({value: "", label: "设置选择..."})
      }, 500)
    } catch(error) {
      console.error('Failed to update the username')
    }
  }

  return (
    <React.StrictMode>
    <Styles>
      <form onSubmit={handleSubmit}>
	{formInput}
	<div className="form-btn">
	  <input type="submit" value="提交" disabled={!isFormValid()} />
	</div>
      </form>
    </Styles>
    </React.StrictMode>
  )
}

export default React.memo(UpdateUsername)

const Styles = styled.section``


