import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';


import App from './components/app'
import ErrorBoundry from './components/error-boundry'
import ServerService from './services/server-service'
import { ServerSrviceProvider } from './components/server-service-contex'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const serverService = new ServerService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <ServerSrviceProvider value={serverService}>
                <Router>
                    <App />
                </Router>
            </ServerSrviceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
);

