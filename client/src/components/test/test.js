import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Patients from "../patients/patients";
import TestEdit from "../test-edit";
import { authentication } from "../../actions";
import "./test.css";

const Test = ({ isType, fio, unauthentication }) => {
  if (isType !== "t") return <Redirect to="/authentication" />;

  const defaultHiddenColumnNames = [
    "hbs",
    "hcv",
    "hiv",
    "date_created",
    "date_edit",
  ];
  const onLogOutBtn = () => {
    unauthentication([], "");
  };

  return (
    <div>
      <div id="div1" className="div-for-label">
        <h2>{fio}</h2>
        <button onClick={onLogOutBtn}>Выход</button>
      </div>
      <Patients
        isControl={false}
        colWidth={100}
        defaultHiddenColumnNames={defaultHiddenColumnNames}
      />
      <TestEdit />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.authentication.id,
    fio: state.authentication.fio,
    isType: state.authentication.isType,
  };
};
const mapDispatchToProps = {
  unauthentication: authentication,
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
