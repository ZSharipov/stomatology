import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


import { withServerService } from '../hoc';
import { fetchPatients, patientsAdedToCard } from '../../actions';
import { compose } from '../../utils'
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator'
import PatientList from './patient-list'


class PatientListContainer extends React.Component {
    componentDidMount() {
        this.props.fetchPatients();
    }

    render() {
        const { patients, loading, error, onAdedToCard } = this.props;
        if (loading) { return <Spinner /> };
        if (error) { return <ErrorIndicator /> };
        return <PatientList
        patients = { patients }
        onAdedToCard = { onAdedToCard }
        />
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.patients.loading,
        patients: state.patients.patients,
        error: state.patients.error,
    }
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//     const { serverService } = ownProps;
//     return {
//         fetchPatients: fetchPatients(serverService, dispatch),
//         onAdedToCard: (id)=>dispatch(patientsAdedToCard(id))
//     }
// };

const mapDispatchToProps = (dispatch, ownProps) => {
    const { serverService } = ownProps;
    return bindActionCreators({
        fetchPatients: fetchPatients(serverService),
        onAdedToCard: patientsAdedToCard
    }, dispatch);
};

export default compose(
    withServerService(),
    connect(mapStateToProps, mapDispatchToProps)
)(PatientListContainer);