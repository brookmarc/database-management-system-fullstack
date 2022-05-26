import axios from 'axios'
import { authHeader } from './authHeader'
import { setToken } from './token.service'

const baseUrl = process.env.REACT_APP_FLASK_BASE_URL

export const loginService = async (username, password) => {
  let loggedInData = {}
  let loggedInToken = {}
  await axios
    .post(baseUrl + "/auth/login", {
      username,
      password
    })
    .then((res) => {
      if (res.status === 200 && res.data.accessToken !== "" && 
	      res.data.success === true) {
	loggedInToken["accessToken"] = res.data.accessToken
	const isSetToken = setToken(loggedInToken)
	if (isSetToken) {
	  loggedInData['success'] = res.data.success
	  loggedInData['message'] = res.data.message
	} else {
          loggedInData['success'] = false
	  loggedInData['message'] = "Unsuccessful! please login again!"
	}
      } else {
        loggedInData['success'] = res.data.success
        loggedInData['message'] = res.data.message
      }
    })
    return loggedInData
}

export const refetchToken = async (data) => {
  let refetchResult = {}
  let refetchToken = {}
  const header = await authHeader()

  await axios({
    method: 'post',
    mode: 'cors',
    url: `${baseUrl}/auth/refetch-token`,
    data,
    headers: header.headers
  })
   .then((res) => {
     if (res.status === 200 && res.data.accessToken !== "" &&
         res.data.success === true) {
       refetchToken["accessToken"] = res.data.accessToken
       const isSetToken = setToken(refetchToken)

       if (isSetToken) {
         refetchResult["success"] = res.data.success
       } else {
         refetchResult["success"] = false
	 refetchResult["message"] = "Refetch unsuccessful!"
       }
     } else {
       refetchResult["success"] = res.data.success
       refetchResult["message"] = res.data.message
     }
   })
   return refetchResult
}

export const logoutService = async () => {
  await localStorage.removeItem("persist:root")
  await localStorage.removeItem("user")
  await setTimeout(() => {localStorage.clear()}, 100)
}


