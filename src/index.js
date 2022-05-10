import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let context = window || {};

context.AiWorkshop = (function() {
    function boostrapApplication(config, boostrapElement) {
        ReactDOM.render(<App />, boostrapElement);
    }

    serviceWorker.register();
    return boostrapApplication;
})();
