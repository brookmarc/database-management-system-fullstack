import jwt_decode from 'jwt-decode' 
import { 
  REFETCH_TOKEN_FAILURE 
} from '../constants/auth.constants'
import {
  refetchTokenStart,
  refetchTokenSuccess,
  refetchTokenFailure
} from '../actions/auth.actions'
import { refetchToken } from '../../../services/auth.service'
import { getToken } from '../../../services/token.service'


const checkTokenExpiration = store => next => action => {
  const token = getToken()

  if (token !== "") {
    const accessToken = jwt_decode(token)

    if (accessToken.exp-4500 < Date.now()/1000) {
      const credential = {username: ""}
      const currUser = accessToken.user_name ? accessToken.user_name : ""
      if (currUser !== ""){
	credential["username"] = currUser
	next(refetchTokenStart(credential))

	refetchToken(credential)
	  .then(res => {
            if (res && res.success !== null && res.success !== undefined) {
              if (res.success === true) {
		next(refetchTokenSuccess(res))
	      } else {
		console.warn(res.message)
		next(refetchTokenFailure(res))
	      }
	    }
	  })
	 .catch(error => {
           console.error(error)
           next({
	     type: REFETCH_TOKEN_FAILURE,
	     payload: error
	   })
	 })
      }
    }
  }
  next(action)
}

export default checkTokenExpiration

