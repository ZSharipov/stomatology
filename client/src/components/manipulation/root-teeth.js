import React from 'react'
import {connect} from 'react-redux'
import {isDeciduous} from '../../actions'



const RootTeeth = ({ title, setIsDeciduous }) => {

    const onClickBtn=(e) => {
        const txt = document.getElementById('txtArea').value;
        document.getElementById('txtArea').value =
            (txt + title + e.target.innerText + "\r\n");
        setIsDeciduous(0);    
    }
    
    const createDiv = (firstSybol) => {
        let btns = []
        for (let index = 1; index < 9; index++) {
            btns.push(
                <button
                    style={{ padding: '4px', width: '32px' }}
                    key={index}
                    onClick={onClickBtn}
                    className="my-btn">
                    {firstSybol}{index}
                </button>);
        }
        return btns
    }

    return (
        <div>
            <div>
                {createDiv(1)}
            </div>
            <div>
                {createDiv(2)}
            </div>
            <div>
                {createDiv(3)}
            </div>
            <div>
                {createDiv(4)}
            </div>


        </div>
    )

}
const mapDispatchToProps = {
    setIsDeciduous: isDeciduous,
}
export default connect(null,mapDispatchToProps)(RootTeeth);