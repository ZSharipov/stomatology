import React from 'react'

const RootTeeth = () => {
    const createDiv = (firstSybol) => {
        let btns = []
        for (let index = 1; index < 9; index++) {
            btns.push(
                <button
                style={{padding:'4px', width:'32px'}}
                    key={index}
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

export default RootTeeth;