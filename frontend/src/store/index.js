import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import sessionReducer from "./session";

const rootReducer = combineReducers({
    session: sessionReducer
});

const thunk = store => next => action => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    } else {
        return next(action);
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