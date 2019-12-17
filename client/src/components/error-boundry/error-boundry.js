import React from 'react';
import ErrorIndicator from '../error-indicator';

export default class ErrorBoundry extends React.Component{
    state = {
        hasError: false
    }
    componentDidCatch(){
        this.setState({hasError: true})
    }
    
    render(){
        if (this.state.hasError) {
            return <ErrorIndicator/> ;           
        }

        return this.props.children;

    }
}