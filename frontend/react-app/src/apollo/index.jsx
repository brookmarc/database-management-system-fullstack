import {
  ApolloClient,
  InMemoryCache,
  //concat,
  from,
  HttpLink,
  //ApolloLink,
} from '@apollo/client'
import { authMiddleware } from './authMiddleware'

const baseFlaskUrl = process.env.REACT_APP_FLASK_BASE_URL

const cache = new InMemoryCache({
  typePolicies: {
    //users: {
    //  keyFields: ["username"]
    //},
    users: {
      keyFields: ["username"],
      merge(existing, incoming) {
        return [...existing, ...incoming]
      }
    },
  }
})

const httpLink = new HttpLink({uri: `${baseFlaskUrl}/graphql/user-admin` })

//const addDateLink = new ApolloLink((operation, forward) => {
//  return forward(operation).map(res => {
//    res.data.date = new Date();
//    return res
//  })
//})

export const apolloClient = new ApolloClient({
  cache,
  //link: concat(authMiddleware, httpLink),
  //link: addDateLink.concat(httpLink),
  link: from([authMiddleware, httpLink]),
});


//console.log(apolloClient)

