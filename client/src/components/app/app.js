import React from 'react';
import { HomePage, AuthenticationPage, RegistryPage, TestPage, AdminPage, OperationPage, ManipulationPage } from '../pages';
import { Route, Switch, Redirect } from 'react-router-dom'
import './app.css';


const App = () => {
    return (
        <main role="main"
            className="container" >
            <Switch >
                <Route path="/"
                    component={HomePage}
                    exact />
                <Route path="/admin"
                    component={AdminPage}
                    exact />
                <Route path="/manipulation"
                    component={ManipulationPage}
                    exact />
                <Route path="/operation"
                    component={OperationPage}
                    exact />
                <Route path="/authentication"
                    component={AuthenticationPage} />
                <Route path="/registry"
                    component={RegistryPage} />
                <Route path="/test"
                    component={TestPage} />
                <Redirect to="/authentication" />
            </Switch>
        </main>
    )
};



export default App;