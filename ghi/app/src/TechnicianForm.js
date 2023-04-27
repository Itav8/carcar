import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const TechnicianForm = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [employeeID, setEmployeeID] = useState([]);

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }
    const handleEmployeeIDChange = (event) => {
        const value = event.target.value;
        setEmployeeID(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeID;

        const technicianURL = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(technicianURL, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();
            console.log(newTechnician);         // DELETE THIS CODE LATER??

            setFirstName('');
            setLastName('');
            setEmployeeID('');
            navigate("/technicians");
        } else {
            const formAlert = document.getElementById("employeeIdAlert");
            const wrapper = document.createElement('div')
            wrapper.innerHTML = [
                `<div class="alert alert-danger alert-dismissible" role="alert">`,
                `   <div>Duplicate Employee ID!</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>'
            ].join('')

            formAlert.append(wrapper);

        }
    }



  return (
    <div className='container'>
    <div className="row">
    <div className="offset-3 col-6">
    <div className="shadow p-4 mt-4">
    <h1 id="technicianAlert">Create a Technician</h1>
        <form onSubmit={handleSubmit} id="create-technician-form">

            <div className="form-floating mb-3">
                <input value={firstName} onChange={handleFirstNameChange} required placeholder="firstName" type="text" id="firstName" name="firstName" className="form-control" />
                <label htmlFor="firstName">First Name...</label>
            </div>
            <div className="form-floating mb-3">
                <input value={lastName} onChange={handleLastNameChange} required placeholder="Last Name" type="text" id="last_name" name="last_name" className="form-control" />
                <label htmlFor="last_name">Last Name...</label>
            </div>
            <div id="employeeIdAlert" className="form-floating mb-3">
                <input value={employeeID} onChange={handleEmployeeIDChange} required placeholder="employeeID of Technician" type="text" id="employeeID" name="employeeID" className="form-control" />
                <label htmlFor="employeeID">EmployeeID...</label>
            </div>
            <button className='btn btn-lg btn-primary'>Create!</button>
        </form>
        </div>
        </div>
        </div>
    </div>
  )
}

export default TechnicianForm
