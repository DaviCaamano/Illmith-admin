import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

//Module Providers
import {Provider} from 'react-redux';
import { CookiesProvider } from 'react-cookie';

//Redux
import store from './redux'

//Global CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './_app/App';

//<ReduxProvider store={store}>
ReactDOM.render(
    <Provider store={store}>
        <CookiesProvider>
            <Router>
                <App />
            </Router>
        </CookiesProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want your _app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
