import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import sagas from '../sagas'
import reducers from '../reducers'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  composeWithDevTools( // adding devtools for redux
    applyMiddleware(sagaMiddleware),
  )
);

sagaMiddleware.run(sagas)

export default store
