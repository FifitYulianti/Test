import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { logger } from './middlewares/index.js'
import { reducersCombine } from './Reducer/index.js'

const store = createStore(reducersCombine, applyMiddleware(logger, thunk))

export default store