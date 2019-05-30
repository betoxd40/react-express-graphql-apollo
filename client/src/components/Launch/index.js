import React from 'react'

const Launch = ({data}) => {
    const {
        flight_number,
        mission_name,
        launch_date_local,
        launch_success,
    } = data;
    return (
        <div className={'card card-body mb-3'}>
            <div className={'row'}>
                <div className={'col-md-9'}>
                    <h5>Mission: { mission_name }</h5>
                    <p>Date: { launch_date_local }</p>
                </div>
                <div className={'col-md-3'}>
                    <button className={'btn btn-secondary'}>Launch Details</button>
                </div>
            </div>
        </div>
    )
}

export default Launch;
