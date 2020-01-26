import React from 'react'

const MilkTeeth = () => {   
        const createDiv = (firstSybol) => {
            let btns = []
            for (let index = 1; index < 7; index++) {
                btns.push(
                    <button
                    style={{padding:'3px', width:'40px'}}
                        key={index}
                        className="my-btn">
                        {firstSybol}({index})
                    </button>);
            }
            return btns
        }
    
        return (
            <div>
                <div>
                    {createDiv('I')}
                </div>
                <div>
                    {createDiv('II')}
                </div>
                <div>
                    {createDiv('III')}
                </div>
                <div>
                    {createDiv('IV')}
                </div>
               
    
    
            </div>
        )
    
   

}
export default MilkTeeth;