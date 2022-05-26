import { createStore, applyMiddleware } from 'redux'
//import { persistStore, persistReducer } from 'redux-persist'
import { persistReducer } from 'redux-persist'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
//import { composeWithDevTools } from 'redux-devtools-extension'
//import {compose} from 'redux'
//import { createLogger } from 'redux-logger'
import thunk from "redux-thunk"
import createSagaMiddleware from 'redux-saga'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from './reducers'
import rootSaga from './sagas'
import rootEpic from './epics'
//>>>>>> Import custom middlewares <<<<<<
import checkTokenExpiration from '../_auth/redux/middlewares/checkTokenExpiration'
import createMiddleware from '../_Operations/_mysqlCRUD/redux/middlewares/create.middlewares'
import updateMiddleware from '../_Operations/_mysqlCRUD/redux/middlewares/update.middlewares'
import deleteMiddleware from '../_Operations/_mysqlCRUD/redux/middlewares/delete.middlewares'

const persistConfig = {
  key: 'root',
  storage,
}

const middlewares = []
const sagaMiddleware = createSagaMiddleware()
const epicMiddleware = createEpicMiddleware()
middlewares.push(
  thunk,
  sagaMiddleware, 
  epicMiddleware, 
  //createLogger(), 
  checkTokenExpiration,
  createMiddleware,
  updateMiddleware,
  deleteMiddleware
)

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => {
  return {
    ...createStore(
      //rootReducer,
      persistReducer(persistConfig, rootReducer),
      applyMiddleware(...middlewares)
      //composeWithDevTools(applyMiddleware(...middlewares))
      //composeEnhancers(applyMiddleware(...middlewares))
    ),
    runSaga: sagaMiddleware.run(rootSaga),
    runEpic: epicMiddleware.run(rootEpic),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
	serializableCheck: {
	  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  }
}

export default configureStore




