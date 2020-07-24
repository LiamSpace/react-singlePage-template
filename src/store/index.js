import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { counter } from './home/index'


const rootReducer = combineReducers({
    counter
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */composeEnhancers(
    applyMiddleware(thunk)
));
export default store;


