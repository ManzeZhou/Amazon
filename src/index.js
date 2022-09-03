import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from "./Reducer/reducers";
import {createStore} from "redux";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducer)
root.render(
    <Provider store={store}>
        <React.StrictMode>
            {/*every component can get access to the dataLayer*/}
            {/*<StateProvider initialState={initialState} reducer={reducer}>*/}
            <App />
            {/*</StateProvider>*/}



        </React.StrictMode>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
