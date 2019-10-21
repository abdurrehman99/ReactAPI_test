import React, { Component } from 'react';
import axois from 'axios';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } 
from "react-router-dom";

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = { 
            isVerified : '' , 
            LeadId : '' , 
            PinCode : '' ,
            responseMessage : ''
            }
        }
    
    
    componentDidMount(){
        console.log("componentDidMount is called");
        axois.get('https://salesfoo-config-api.azurewebsites.net/api/v1/IsConfigured/5F93931-BFD6-4FB7-92BE-882F6A94DFE7')
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
    console.log(obj)
        axois.post('https://salesfoo-config-api.azurewebsites.net/api/v1/VerifyPin/',obj)
        .then ( response => {
            console.log(response.data.Data);
            this.setState({ responseMessage : response.data.Data });
        })
        .catch( error => {
            console.log(error);
        })
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
                
                {
                    this.state.responseMessage ? 
                    <div></div> : alert("You have entered a wrong pin")
                }
            </div>
            
        )
            
    }
}
