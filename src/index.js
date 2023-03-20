import React from 'react';
import { render } from "react-dom";
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import * as serviceWorker from './service-worker';
import reportWebVitals from './reportWebVitals';
import * as atatus from 'atatus-spa';

atatus.config('d4bc238129cd4557a7b98980c4fafa1a').install();

const root = document.getElementById("root");
render(<App />, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

