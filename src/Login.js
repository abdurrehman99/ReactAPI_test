import React, { Component } from 'react';
import queryString from 'query-string';

export default class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            id : '',
        }
    }
    componentDidMount()
        {
            let params = queryString.parse(this.props.location.search);
            console.log(params.tenant);
            this.setState({ id: params.tenant })
        }
    render() {
        return (
            <div>
                <h2>You are logged in !</h2>
                <p>{this.state.id}</p>
            </div>
        )
    }
}

