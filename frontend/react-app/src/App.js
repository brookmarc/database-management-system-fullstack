import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Home from './_home'
import configureStore from './reduxStores/configureStore'
require('dotenv').config()

const Store = configureStore()
const persist_store = persistStore(Store)

const App = () =>{
  return (
    <React.Fragment>
      <Provider store={Store}>
	<PersistGate loading={null} persistor = {persist_store}>
          <Home />
	</PersistGate>
      </Provider>
    </React.Fragment>
  )
}

export default React.memo(App)
