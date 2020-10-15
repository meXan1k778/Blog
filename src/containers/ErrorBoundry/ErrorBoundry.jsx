/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Alert } from 'antd';

import 'antd/dist/antd.css';

export default class ErrorBoundry extends React.Component{
    state = {
        hasError: false
    }

    componentDidCatch(){
        this.setState({hasError: true})
    }

    render(){
        if(this.state.hasError) {
            return <Alert />
        }
        return this.props.children
    }
}

