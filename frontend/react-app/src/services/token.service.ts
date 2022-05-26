
export function getToken() {
  const _user = localStorage.getItem("user")
  const token = _user ? JSON.parse(_user).accessToken : ""

  return token
}


export function setToken(data) {
  localStorage.setItem("user", JSON.stringify(data))

  const currToken = getToken()

  if (currToken !== "") {
    return true
  }
  return false
}


