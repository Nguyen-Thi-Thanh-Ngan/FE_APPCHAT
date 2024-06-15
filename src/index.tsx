import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        {/*dinh tuyen cac link*/}
        <Router>
            <App/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
