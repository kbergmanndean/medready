import React from 'react'

function Alert({pre, onOkay, daysLeft}){

    return(
        <div className="alert">
            {daysLeft<=0?
            <div>
                <h1 className="alert-word">Alert!</h1>
                <p>You are out of {pre.medication.generic_name}</p>
            </div>
            :
            <div>
                <h1 className="alert-word">Alert!</h1>
                <p>In <span className="days-left">{daysLeft}</span> days, you will be out of {pre.medication.generic_name}</p>
            </div>}
            <button className="btn btn-outline-dark" onClick={onOkay}>Ok</button>
        </div>
    )
}

export default Alert