import React from 'react';
import Login from './Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
  

function App() {
    return ( 
        <Router>
            <div className = "App" >
            <button><a href='https://login.microsoftonline.com/common/adminconsent?client_id=e8a3c297-e162-48dc-9105-6a743c998cbe&state=testing&redirect_uri=http://localhost:3000/login'>click me</a></button>
            </div>
            <Route path='/login' component={Login} />
        </Router>
    );
}

export default App;