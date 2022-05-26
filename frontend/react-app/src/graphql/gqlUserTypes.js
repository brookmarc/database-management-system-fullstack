import { gql } from '@apollo/client'

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword (
    $username: String!,
    $currPassword: String!,
    $newPassword: String!,
    $confirmedPwd: String!,
  ) {
    updateUserPassword(
      username: $username,
      currPassword: $currPassword,
      newPassword: $newPassword,
      confirmedPwd: $confirmedPwd
    ) {
      user {
        fullname
	username
	password
	accesslevel
      }
      ok
      error
    }
  }
`


export const UPDATE_USER_FULLNAME = gql`
  mutation UpdateUserFullname (
    $username: String!,
    $newFullname: String!
  ) {
    updateUserFullname(
      username: $username,
      newFullname: $newFullname
    ) {
      ok
      error
    }
  }
`



