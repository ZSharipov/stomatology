import React from 'react'

const MilkTeeth = () => {
    const createDiv = (firstSybol) => {
        let btns = []
        const arr = ['I', 'II', 'III', 'IV', 'V'];
        for (let index = 0; index < 5; index++) {
            btns.push(
                <button
                    style={{ padding: '4px', width: '50px' }}
                    key={index}
                    className="my-btn">
                    {firstSybol}({arr[index]})
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
export default MilkTeeth;