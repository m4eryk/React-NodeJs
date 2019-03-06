import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import jwt_decode from 'jwt-decode';

import {setAuthToken, setCurrentUser} from './redux/actions/authActions';

if(localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
}

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();