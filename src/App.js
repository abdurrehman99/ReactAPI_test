import React, { Component } from 'react';
import axois from 'axios';
import Login from './Login';
import queryString from 'query-string';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
//   55F93931-BFD6-4FB7-92BE-882F6A94DFE7

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = { 
            isVerified : '' , 
            LeadId : '' , 
            PinCode : '' ,
            responseMessage : '',
            login : true,
            id : '',
            }
        }
    
    
    componentDidMount(){
        console.log("componentDidMount is called");
        axois.get('https://salesfoo-config-api.azurewebsites.net/api/v1/IsConfigured/55f93931-bfd6-4fb7-92be-882f6a94dfe7')
        .then ( response => {
            console.log(response.data.Data);
            this.setState({ isVerified : response.data.Data })
        })
        .catch( error =>{
            console.log(error);
        })
        
    }

    verifyPin = () => {
        
        const obj = {
            LeadId : this.state.LeadId,
            PinCode : this.state.PinCode

        }
        axois.post('https://salesfoo-config-api.azurewebsites.net/api/v1/VerifyPin/',obj)
        .then ( response => {
            console.log(response.data);
            this.setState({ 
                responseMessage : response.data.ResponseMessage , 
                login : response.data.Data 
            });
        })
        .catch( error => {
            console.log(error);
        });
        
    }

    getPin = val => {
        this.setState( { LeadId : '5F93931-BFD6-4FB7-92BE-882F6A94DFE7' , PinCode : val });
        
    }


    render() {
        return(
            
            <div>
                {
                    this.state.isVerified ? 
                    <h2>You are verifed</h2> : 
                    <div>
                        <input type='text' onChange= { (event)=> { this.getPin(event.target.value) }} />
                        <button onClick= { this.verifyPin }>Verify Pin</button>
                        
                    </div>
                }

                <p>{this.state.responseMessage}</p>
                {
                    this.state.login ? 
                    null : <button><a href='https://login.microsoftonline.com/common/adminconsent?client_id=e8a3c297-e162-48dc-9105-6a743c998cbe&state=testing&redirect_uri=http://localhost:3000'>Login</a></button>
                }
                <Login />
                
            </div>
            
        )
            
    }
}
