import React from 'react';
import {  HomePage, PatientsPage, AuthenticationPage,RegistryPage } from '../pages';
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
                <Route path="/authentication"
                    component={AuthenticationPage}/>
                <Route path="/registry"
                    component={RegistryPage}/>
                
                <Route path="/patients"
                    component={PatientsPage} />
                  <Redirect to="/"/>  
            </Switch>
        </main>

    )
};

export default App;