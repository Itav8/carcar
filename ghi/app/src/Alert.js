import React from 'react'

const Alert = (props) => {
    if (props.alert) {
        return (<div className="justify-content-center">
            <div className="row-cols-2 text-center">
            <div className="alert alert-danger alert-dismissible" role="alert">
            <div>{props.message}</div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            </div>
            </div>
        )
    } else {
    return (
        null
    )
    }
}

export default Alert
