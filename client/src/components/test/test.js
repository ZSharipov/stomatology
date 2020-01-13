
import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './test.css'
import Patients from '../patients/patients';
import TestEdit from '../test-edit';




class Test extends React.Component {
    
    render() {
        const {isType } = this.props;
        if (isType !== 't')
        return <Redirect to='/authentication' />
        const defaultHiddenColumnNames = ["hbs", "hcv", "hiv", "date_created", "date_edit"]


        return (
            <div>
                <Patients
                    isControl={false}   
                    colWidth={100}        
                    defaultHiddenColumnNames={defaultHiddenColumnNames} />
                    <TestEdit/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.authentication.id,
        fio: state.authentication.fio,
        isType: state.authentication.isType,
    }
}

export default connect(mapStateToProps)(Test);