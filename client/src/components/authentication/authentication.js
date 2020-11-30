import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authentication, fetchDoctors } from "../../actions";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";
import "./authentication.css";

const Authentication = ({
  fetchDoctors,
  doctors,
  loading,
  error,
  authent,
  isType,
}) => {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  if (isType !== "") {
    switch (isType) {
      case "a":
        return <Redirect to="/admin" />;
      case "t":
        return <Redirect to="/test" />;
      case "d":
        return <Redirect to="/operation" />;
      case "r":
        return <Redirect to="/registry" />;
      default:
        break;
    }
  }
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorIndicator />;
  }

  const onInputChange = (event) => setInputText(event.target.value);
  const onCodeSubmit = () => {
    authent(doctors, inputText.trim());
  };
  const enterPress = (e) => {
    if (e.keyCode === 13) {
      document.getElementById("forEnter").click();
    }
  };

  return (
    <div className="div-center">
      <div className="form-parent">
        <div className="alert">
          <h2 className="alert-heading text-center mt-5">Вход в систему</h2>
          <hr />
          <div className="input-group mb-3">
            <input
              value={inputText}
              autoFocus
              onKeyUp={enterPress}
              onChange={onInputChange}
              type="password"
              className="form-control"
              placeholder="введите свой код . . ."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                id="forEnter"
                onClick={onCodeSubmit}
                className="btn btn-primary mybtn"
              >
                вход
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.doctors.loading,
    doctors: state.doctors.doctors,
    error: state.doctors.error,
    isType: state.authentication.isType,
  };
};

const mapDispatchToProps = {
  fetchDoctors: fetchDoctors,
  authent: authentication,
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
