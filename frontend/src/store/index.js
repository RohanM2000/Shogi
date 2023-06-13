import { createStore, applyMiddleware, combineReducers, compose } from "redux";

const rootReducer = combineReducers({

});

const thunk = store => next => action => {
    if (typeof action === 'function') {
        action(store.dispatch, store.getState);
    } else {
        next(action);
    }
};

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (prevState = {}) => {
    return createStore(rootReducer, prevState, enhancer);
};

export default configureStore;