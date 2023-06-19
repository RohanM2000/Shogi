import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import sessionReducer from "./session";
import  messagesReducer from "./messages";
import roomsReducer from "./rooms";
import usersReducer from "./users";
import gamesReducer from "./games";
import modalsReducer from "./modals";
const rootReducer = combineReducers({
    session: sessionReducer,
    messages: messagesReducer,
    rooms: roomsReducer,
    users: usersReducer,
    games: gamesReducer,
    modals: modalsReducer
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