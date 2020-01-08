import React from 'react';
import {  HomePage,  AuthenticationPage,RegistryPage,TestPage } from '../pages';
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
                <Route path="/test"
                    component={TestPage}/>
                
               
                  <Redirect to="/"/>  
            </Switch>
        </main>

    )
};

export default App;