import React from 'react'

function Alert({pre, refillDate, today, onOkay}){

    //alert one week out and then each day after.


    return(
        <div className="alert">
            {(+refillDate <= +today)?
            <div>
                <h1 className="alert-word">Alert!</h1>
                <p>You are out of {pre.medication.generic_name}</p>
            </div>
            :
            <div>
                <h1 className="alert-word">Alert!</h1>
                <p>In one week, you will be out of {pre.medication.generic_name}!</p>
            </div>}
            <button className="btn btn-outline-dark" onClick={onOkay}>Ok</button>
        </div>
    )
}

export default Alert