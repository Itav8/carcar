import { React, useState, useEffect } from 'react'
import Alert from './Alert';
import Modal from './Modal';
import ManufacturerFormEdit from './ManufacturerFormEdit';

const ManufacturerList = () => {
    const API_URL = "http://localhost:8100/api/manufacturers"
    const [manufacturers, setManufacturers] = useState([]);
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

    const handleDelete = async (id) => {
        const deleteOptions = { method: 'DELETE' };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) {
            setAlert(true);
            setAlertMessage("Problem with delete, try again later.");
        } else {
            setAlert(true);
            setAlertMessage("Successfully Deleted!");
            const newmanufacturers = manufacturers.filter((manufacturer) => manufacturer.id !== id);
            setManufacturers(newmanufacturers);
        }
    }

    const fetchData = async () => {
        const manufacturersResponse = await fetch (API_URL);
        if(manufacturersResponse.ok) {
            const data = await manufacturersResponse.json();
            setManufacturers(data.manufacturers);
        } else {
            throw new Error('manufacturers Response not ok!');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


    return (
    <>
      <h1>Manufacturers</h1>
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
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1rem'}}>Name</th>
                    <th className="align-middle text-center">Edit</th>
                    <th className="align-middle text-center">Delete?</th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.map(manufacturer => {
                    return (
                        <tr key={manufacturer.id}>
                            <td className="align-middle fw-normal px-3" style={{fontSize: '1.2rem'}}>{ manufacturer.name }</td>
                            <td>
                                <button
                                className="btn btn-outline-dark"
                                data-bs-toggle="modal"
                                data-bs-target={`#manufacturerModal-${manufacturer.id}`}
                                >
                                Edit
                                </button>
                            </td>
                            <td className="align-middle px-3 text-center">
                                <button className="btn btn-outline-dark" role="button" onClick={() => handleDelete(manufacturer.id)}>
                                    Delete
                                </button>
                            </td>
                  <Modal id={`manufacturerModal-${manufacturer.id}`} title="Edit Manufacturer">
                    <ManufacturerFormEdit manufacturer={manufacturer} />
                  </Modal>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    </>
    );
}

export default ManufacturerList
