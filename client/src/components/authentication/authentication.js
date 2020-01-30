import React from 'react'
import './authentication.css'

import { connect } from 'react-redux';


import { authentication, fetchDoctors } from '../../actions';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator'
import { Redirect } from 'react-router-dom';



class Authentication extends React.Component {


    componentDidMount() {
        this.props.fetchDoctors();
    }


    render() {
        const { doctors, loading, error, authent, isType } = this.props;

        if (isType !== '') {
            switch (isType) {
                case "a":
                    return <Redirect to='/admin' />
                case "t":
                    return <Redirect to='/test' />
                case "d":
                    return <Redirect to='/operation' />
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
                        className="alert">
                        <h2 className="alert-heading text-center mt-5">Вход в систему</h2>
                        <hr />

                        <div className="input-group mb-3">
                            <input
                                autoFocus
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
        isType: state.authentication.isType,
        authent: authentication,
    }
};
const mapDispatchToProps = {
    fetchDoctors: fetchDoctors,
    authent: authentication,
};


export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
