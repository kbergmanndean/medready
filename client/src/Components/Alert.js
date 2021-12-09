import React, {useState} from 'react'

function Alert({pre, refillDate, today, onOkay}){
    return(
        <div className="alert">
            {(+refillDate <= +today)?
            <div>
                <p>Alert! You are out of {pre.medication.generic_name}</p>
            </div>
            :
            <div>
                <p>Alert! In one week, you will be out of {pre.medication.generic_name}!</p>
            </div>}
            <button onClick={onOkay}>Ok</button>
        </div>
    )
}

export default Alert