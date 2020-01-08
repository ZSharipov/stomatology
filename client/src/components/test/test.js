
import React from 'react'

import './test.css'
import Patients from '../patients/patients';



class Test extends React.Component {

    render() {
        const defaultHiddenColumnNames = ["date_created", "date_edit"]

        return (
            <div>
                <Patients
                    isControl={false}   
                    colWidth={200}        
                    isAdmin={false}
                    defaultHiddenColumnNames={defaultHiddenColumnNames} />
            </div>
        )
    }
}

export default Test;