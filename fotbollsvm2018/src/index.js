import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './state/reducers';

const history = createBrowserHistory();

const middleware = [thunk, apiMiddleware, routerMiddleware(history)];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const store =
    createStoreWithMiddleware(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <App history={history} />
        </Provider>,
        document.getElementById('root'),
    );
});
registerServiceWorker();
