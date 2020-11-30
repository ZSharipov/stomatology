import React from "react";
import { connect } from "react-redux";
import { isDeciduous } from "../../actions";
import "./manipulation.css";

const MilkTeeth = ({ title, setIsDeciduous }) => {
  const onClickBtn = (e) => {
    const txt = document.getElementById("txtArea").value;
    document.getElementById("txtArea").value =
      txt + title + e.target.innerText + "\r\n";
    setIsDeciduous(1);
  };

  const createDiv = (firstSybol) => {
    let btns = [];
    const arr = ["I", "II", "III", "IV", "V"];
    for (let index = 0; index < 5; index++) {
      btns.push(
        <button
          style={{ padding: "4px", width: "50px" }}
          key={index}
          onClick={onClickBtn}
          className="my-btn"
        >
          {firstSybol}({arr[index]})
        </button>
      );
    }
    return btns;
  };

  return (
    <div>
      <div>{createDiv(1)}</div>
      <div>{createDiv(2)}</div>
      <div>{createDiv(3)}</div>
      <div>{createDiv(4)}</div>
    </div>
  );
};
const mapDispatchToProps = {
  setIsDeciduous: isDeciduous,
};

export default connect(null, mapDispatchToProps)(MilkTeeth);
