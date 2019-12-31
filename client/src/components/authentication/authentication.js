import React from 'react'
import './authentication.css'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


import { withServerService } from '../hoc';
import { authentication, fetchDoctors } from '../../actions';
import { compose } from '../../utils'
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator'
import { Redirect } from 'react-router-dom';



class Authentication extends React.Component {


    componentDidMount() {
        this.props.fetchDoctors();
    }


    render() {
        const { doctors, loading, error, authent, id_doctor, fio, isType } = this.props;

        if (id_doctor !== '') {
            switch (isType) {
                case "a":
                    return <Redirect to='/' />
                case "d":
                    return <Redirect to='/' />
                case "r":
                    return <Redirect to='/registry' />
                default:
                    break;
            }
        }

        if (loading) { return <Spinner /> };
        if (error) { return <ErrorIndicator /> };

        let inputText = '';
        const onInputChange = (event) => inputText = event.target.value;
        const onCodeSubmit = () => authent(doctors, inputText.trim());
        const enterPress = (e) => {
            if (e.keyCode === 13) {
                document.getElementById("forEnter").click();

            }
        }
        return (
            <div className="div-center">
                <div className="form-parent" >
                    <div
                        className="alert alert-success">
                        <h2 className="alert-heading">Вход в систему</h2>
                        <hr />

                        <div className="input-group mb-3">
                            <input
                                onKeyUp={enterPress}
                                onChange={onInputChange}
                                type="password"
                                className="form-control"
                                placeholder="введите свой код . . ." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button
                                    id="forEnter" onClick={onCodeSubmit} type="submit" className="btn btn-primary mybtn">вход</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.doctors.loading,
        doctors: state.doctors.doctors,
        error: state.doctors.error,
        authent: authentication,
        id_doctor: state.authentication.id_doctor,
        fio: state.authentication.fio,
        isType: state.authentication.isType,
    }

};
const mapDispatchToProps = (dispatch, ownProps) => {
    const { serverService } = ownProps;
    return bindActionCreators({
        fetchDoctors: fetchDoctors(serverService),
        authent: authentication
    }, dispatch);
}

export default compose(
    withServerService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Authentication);
