import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ApolloProvider } from "@apollo/client"
import { apolloClient } from "../apollo"
import { Provider } from 'mobx-react'
import stores from '../mobx/stores'
import Homepage from './homepage.component'


function Home(){

  return (
    <React.Fragment>
      <section className='container'>
	<ApolloProvider client={apolloClient} >
	  <Provider {...stores} >
            <Router>
              <Routes>
                <Route path="/*" element={ <Homepage /> } />*/}
	      </Routes>
	    </Router>
	  </Provider>
	</ApolloProvider>
      </section>
    </React.Fragment>
  )
}

export default React.memo(Home)
