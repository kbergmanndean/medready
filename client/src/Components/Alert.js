import React, {useState} from 'react'

function Alert({pre, refillDate, today, weekNotice}){
    return(
        (+refillDate <= +today)?
        <div>
            <p>Alert! You are out of {pre.medication.generic_name}</p>
        </div>
        :null
        (+weekNotice == +today)?
        <div>
            <p>Alert! In one week, you will be out of {pre.medication.generic_name}!</p>
        </div>
        :null
    )
}

export default Alert