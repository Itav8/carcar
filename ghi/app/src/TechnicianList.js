import { React, useState, useEffect } from 'react'
import Alert from './Alert';

const TechnicianList = () => {
    const API_URL = "http://localhost:8080/api/technicians";
    const [technicians, setTechnicians] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
        try {
            const response = await fetch(url, optionsObj);
            if (!response.ok) throw Error('Please reload the app');
        } catch (err) {
            errMsg = err.message;
        } finally {
            return errMsg;
        }
    }

    const handleDelete = async (employee_id) => {
        const deleteOptions = { method: 'DELETE' };
        const reqUrl = `${API_URL}/${employee_id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) {
            setAlert(true);
            setAlertMessage("Problem with delete, if technicians are assigned to appointments, please re-assign before delete.");
        } else {
            setAlert(true);
            setAlertMessage("Successfully Deleted!");
            const newTechnicians = technicians.filter((technician) => technician.employee_id !== employee_id);
            setTechnicians(newTechnicians);
        }
    }

    const fetchData = async () => {
        const techniciansResponse = await fetch (API_URL);
        if(techniciansResponse.ok) {
            const data = await techniciansResponse.json();
            setTechnicians(data.technicians);
        } else {
            throw new Error('Technicians Response not ok!');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
          <h1>Technicians</h1>
            <Alert
                alert={alert}
                message={alertMessage}
            >
                <></>
            </Alert>
            <div className="table-responsive">
                <table className='table table-striped table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1rem'}}>Employee ID</th>
                            <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1rem'}}>First Name</th>
                            <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1rem'}}>Last Name</th>
                            <th className="align-middle text-center">Delete?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {technicians.map(technician => {
                            return (
                                <tr key={technician.employee_id}>
                                    <td className="align-middle fw-bold px-3" style={{fontSize: '1rem'}}>{ technician.employee_id }</td>
                                    <td className="align-middle px-3" style={{fontSize: '1rem'}}>{ technician.first_name }</td>
                                    <td className="align-middle px-3" style={{fontSize: '1rem'}}>{ technician.last_name }</td>
                                    <td className="align-middle px-3 text-center">
                                        <button className="btn btn-outline-dark" role="button" onClick={() => handleDelete(technician.employee_id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TechnicianList
