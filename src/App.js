import React, { Component } from 'react';
import axois from 'axios';
import { BrowserRouter as  Router, Switch,Route ,Link } from "react-router-dom";
import Login from './Login';
import queryString from 'query-string';

//55F93931-BFD6-4FB7-92BE-882F6A94DFE7
//A2BC39FC-63EB-4B61-91E7-FC516B6E5454
//573485

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = { 
            isVerified : '' , 
            LeadId : '1B2C086D-DBE2-4197-9467-93C232AF5921' , 
            PinCode : '' ,
            responseMessage : '',
            login : false,
            id : '',
            }
        }
    componentDidMount(){

        axois.get('https://salesfoo-config-api.azurewebsites.net/api/v1/IsConfigured/1B2C086D-DBE2-4197-9467-93C232AF5921')
        .then ( response => {
            console.log(response.data.Data);
            this.setState({ isVerified : response.data.Data })
        })
        .catch( error =>{
            console.log(error);
        });

        let params = new URLSearchParams(window.location.search);
        let lead = params.get('tenant');

        this.setState({ id : lead });

        const config = {
            LeadId : this.state.LeadId,
            DomainUrl : 'http://localhost:3000',
            TenantId : lead,
            TanentName : 'Ebad',
            DomainUserName : 'Syed',
            UserAzureEmail : 'admin@salfoo.com'
        }
        console.log(config);
        axois.post('https://salesfoo-config-api.azurewebsites.net/api/v1/SaveConfiguration/',config)
        .then( response => {
            console.log(response.data.ResponseMessage);
        })
        .catch( error => {
            console.log(error.Message);
        });
    }

    verifyPin = () => {
        const obj = {
            LeadId : 'A2BC39FC-63EB-4B61-91E7-FC516B6E5454',
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
        this.setState( { PinCode : val });
    }
    saveConfig = () => {
        
    }
    render() {
        return(
           <div>
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
                    this.state.login ? null 
                    : <button><a href='https://login.microsoftonline.com/common/adminconsent?client_id=f0e68c6e-ef76-4e76-ab4d-0b14b71876bd&state=admin_consent&redirect_uri=http://localhost:3000'>Login</a></button> 
                }
                {
                    this.state.id != null 
                }

            </div>
            <h3>{this.state.id}</h3>
            </div>
            
        )
    }
}
