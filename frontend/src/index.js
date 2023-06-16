import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store";
import csrfFetch from './store/csrf';
import * as sessionActions from "./store/session";
import ModalProvider from './context/Modal';
import Board from './shogiGame/board';
const store = configureStore();
const board = new Board();
console.log(board.allMoves("white"));

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

const Root = () => {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  )
};

const renderApplication = ()=> {
  ReactDOM.render(
    <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
  );
};

// if (sessionStorage.getItem('X-CSRF-Token') === null) {
//   restoreCSRF().then(renderApplication);
// } else {
//   renderApplication();
// }
if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}