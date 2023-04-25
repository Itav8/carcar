import { React, useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

const TechnicianForm = () => {
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
        } else {
            const formAlert = document.getElementById("employeeIdAlert");
            const wrapper = document.createElement('div')
            wrapper.innerHTML = [
                `<div class="alert alert-danger alert-dismissible" role="alert">`,
                `   <div>Bad Form!</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>'
            ].join('')

            formAlert.append(wrapper);

        }
        // navigate("/technicians");
    }



  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <p>Please Create a Technician</p>

            <div className="mb-3">
                <input value={firstName} onChange={handleFirstNameChange} required placeholder="firstName" type="text" id="firstName" name="firstName" className="form-control" />
                <label htmlFor="firstName">The First Name</label>
            </div>
            <div className="mb-3">
                <input value={lastName} onChange={handleLastNameChange} required placeholder="Last Name" type="text" id="last_name" name="last_name" className="form-control" />
                <label htmlFor="last_name">The Last Name</label>
            </div>
            <div id="employeeIdAlert" className="mb-3">
                <input value={employeeID} onChange={handleEmployeeIDChange} required placeholder="employeeID of Technician" type="text" id="employeeID" name="employeeID" className="form-control" />
                <label htmlFor="employeeID">The Technician employeeID</label>
            </div>
            <button className='btn btn-lg btn-primary'>Create!</button>
        </form>
    </div>
  )
}

export default TechnicianForm
