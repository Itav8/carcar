import { React, useState, useEffect } from 'react'

const ServiceHistory = () => {
    const APPOINTMENTS_URL = "http://localhost:8080/api/appointments"      // for Cancel, Finish
    const AUTOMOBILEVOS_URL = "http://localhost:8080/api/automobileVOs"

    const [appointments, setAppointments] = useState([]);
    const [vins, setVins] = useState([]);
    const [search, setSearch] = useState('');
    const [searchTrigger, setSearchTrigger] = useState('');
    // const [isVIP, setIsVIP] = useState([]);

    const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
        try {
            const response = await fetch(url, optionsObj);
            if (!response.ok) throw Error('Please reload the app');
        } catch (err) {
            errMsg = err.message;
        } finally {         // will always execute whether error or not
            return errMsg;
        }
    }



    const fetchData = async () => {
        const appointmentsResponse = await fetch (APPOINTMENTS_URL);
        const automobileVOsResponse = await fetch (AUTOMOBILEVOS_URL);
        if(appointmentsResponse.ok) {
            const data = await appointmentsResponse.json();
            setAppointments(data.appointments.filter(appointment => appointment.status === 'created'));
        } else {
            throw new Error('Appointments Response not ok!');
        }
        if(automobileVOsResponse.ok) {      // CREATE ARRAY OF ALL VINS FROM INVENTORY
            const data = await automobileVOsResponse.json();
            console.log(data);

            const newVins = [];
            for (let car of data) {
                newVins.push(car.vin);
            }
            setVins(newVins);

        } else {
            throw new Error('Appointments Response not ok!');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // console.log("searched", event.target.value, search);
        // const value = event.target.value;
        setSearchTrigger(search);
    }


    return (
        <div>

    <div className="row">
    <div className="offset-3 col-6">
    <div className="shadow p-4 mt-4">
    <form className='searchForm' onSubmit={handleSearchSubmit}>
        <input
        onChange={e => setSearch(e.target.value)}
        type="text"
        role="searchbox"
        placeholder='Search by VIN...'
        value={search}
        />
        <button type="submit">Search</button>
    </form>

    </div>
    </div>
    </div>
    <div className="table-responsive">
        <table className='table table-striped table-bordered table-hover'>
            <thead>
                <tr>
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1.2rem'}}>VIN</th>
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1.2rem'}}>Is VIP?</th>
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1.2rem'}}>Customer</th>
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1.2rem'}}>Date</th>
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1.2rem'}}>Time</th>
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1.2rem'}}>Technician</th>
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1.2rem'}}>Reason</th>
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1.2rem'}}>Status</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => {
                    return ( appointment.vin.includes(searchTrigger) &&
                        <tr key={appointment.id}>
                            <td className="align-middle fw-bold px-3" style={{fontSize: '1.2rem'}}>{ appointment.vin }</td>
                            <td className="align-middle px-3" style={{fontSize: '2rem'}}>
                                { (vins.indexOf(appointment.vin) > -1) && `YES` }
                                { !(vins.indexOf(appointment.vin) > -1) && `NO` }
                                </td>
                            <td className="align-middle px-3" style={{fontSize: '2rem'}}>{ appointment.customer }</td>
                            <td className="align-middle px-3" style={{fontSize: '2rem'}}>{new Date(appointment.date_time).toLocaleDateString()}</td>
                            <td className="align-middle px-3" style={{fontSize: '2rem'}}>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                            <td className="align-middle px-3" style={{fontSize: '2rem'}}>{ appointment.technician }</td>
                            <td className="align-middle px-3" style={{fontSize: '2rem'}}>{ appointment.reason }</td>
                            <td className="align-middle px-3" style={{fontSize: '2rem'}}>{ appointment.status }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    </div>
    )
}

export default ServiceHistory
