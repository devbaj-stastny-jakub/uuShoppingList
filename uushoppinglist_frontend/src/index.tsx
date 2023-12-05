import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Router} from './components';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store/store"
import {Auth0Provider} from "@auth0/auth0-react";
import "./config/translations"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Auth0Provider
        domain="dev-ducb3de5dqthsoxl.us.auth0.com"
        clientId="Pgc88socOBZw5ZHRoR1OpM51RT3UfDPU"
        authorizationParams={{
            redirect_uri: window.location.origin,
            audience: "http://uushoppinglist.com"
        }}
    >
        <Provider store={store}>
            <Router/>
        </Provider>
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
