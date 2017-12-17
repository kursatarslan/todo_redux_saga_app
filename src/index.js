import './views/styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import history from './history';
import configureStore from './store';
import App from './views/app';
import { taskActions } from './tasks/actions';
import 'isomorphic-fetch';

const store = configureStore();
const rootElement = document.getElementById('root');

const initAuth = (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(taskActions.signInFulfilled());
    dispatch(taskActions.getAllTask());
    resolve();
  });
}

function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Component/>
        </div>
      </ConnectedRouter>
    </Provider>,
    rootElement
  );
}

if (module.hot) {
  module.hot.accept('./views/app', () => {
    render(require('./views/app').default);
  })
}

initAuth(store.dispatch)
.then(() => render(App))
.catch(error => console.error(error));