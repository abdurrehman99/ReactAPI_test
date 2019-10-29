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
            let params = queryString.parse(this.props.location);
            console.log(params.tenant);
            this.setState({ id: params.tenant })
        }
    render() {
        return (
            <div>
                
                <p>{this.state.id}</p>
            </div>
        )
    }
}

