import { React, useState, useEffect } from 'react'

const TechnicianList = () => {
    const API_URL = "http://localhost:8080/api/technicians"      // for DELETE
    const [technicians, setTechnicians] = useState([]);

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

    const handleDelete = async (employee_id) => {
        const newTechnicians = technicians.filter((technician) => technician.employee_id !== employee_id);
        setTechnicians(newTechnicians);

        const deleteOptions = { method: 'DELETE' };
        const reqUrl = `${API_URL}/${employee_id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) {
            console.log(result);
        } else {
            console.log(`else! ${result}`)
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
    <div className="table-responsive">
        <table className='table table-striped table-bordered table-hover'>
            <thead>
                <tr>
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1.2rem'}}>Employee ID</th>
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1.2rem'}}>First Name</th>
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1.2rem'}}>Last Name</th>
                    <th className="align-middle text-center">Delete?</th>
                </tr>
            </thead>
            <tbody>
                {technicians.map(technician => {
                    return (
                        <tr key={technician.employee_id}>
                            <td className="align-middle fw-bold px-3" style={{fontSize: '1.2rem'}}>{ technician.employee_id }</td>
                            <td className="align-middle px-3" style={{fontSize: '2rem'}}>{ technician.first_name }</td>
                            <td className="align-middle px-3" style={{fontSize: '2rem'}}>{ technician.last_name }</td>
                            <td className="align-middle px-3 text-center">
                                <button className="btn btn-danger" role="button" onClick={() => handleDelete(technician.employee_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}

export default TechnicianList
