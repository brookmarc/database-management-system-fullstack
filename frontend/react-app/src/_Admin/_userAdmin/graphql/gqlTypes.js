import { gql } from '@apollo/client'

export const FETCH_USERS = gql`
  query {
    users {
      fullname
      username
      password
      accesslevel
    }
  }
`

export const ADD_USER = gql`
  mutation MutateAddUser (
    $fullname: String!, 
    $username: String!,
    $password: String!,
    $confirmPwd: String!,
    $accesslevel: String!
  ) {
    mutateAddUser(
      fullname: $fullname,
      username: $username,
      password: $password,
      confirmPwd: $confirmPwd,
      accesslevel: $accesslevel
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

export const UPDATE_USERNAME = gql`
  mutation UpdateUsername (
    $username: String!,
    $newUsername: String!
  ) {
    updateUsername(
      username: $username,
      newUsername: $newUsername,
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

export const UPDATE_USERACCESS = gql`
  mutation UpdateUserAccess (
    $username: String!,
    $newAccessLevel: String!
  ) {
    updateUserAccess(
      username: $username,
      newAccessLevel: $newAccessLevel,
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



export const RESET_USER_PASSWORD = gql`
  mutation ResetUserPassword (
    $username: String!,
    $initPassword: String!,
  ) {
    resetUserPassword(
      username: $username,
      initPassword: $initPassword
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

export const DELETE_USER = gql`
  mutation DeleteUser (
    $username: String!,
  ) { 
    deleteUser(
      username: $username,
    ) {
      user {
        fullname
	username
	password
	accesslevel
      }
      ok
    }
  }
`



