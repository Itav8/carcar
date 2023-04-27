import { React, useState, useEffect } from 'react'

const ManufacturerList = () => {
    const API_URL = "http://localhost:8100/api/manufacturers"      // for DELETE
    const [manufacturers, setManufacturers] = useState([]);

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

    const handleDelete = async (id) => {
        const newmanufacturers = manufacturers.filter((manufacturer) => manufacturer.id !== id);
        setManufacturers(newmanufacturers);

        const deleteOptions = { method: 'DELETE' };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) {
            console.log(result);
        } else {
            console.log(`else! ${result}`)
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
    <div className="table-responsive">
        <table className='table table-striped table-bordered table-hover'>
            <thead>
                <tr>
                    <th className="align-middle text-uppercase fw-bold" style={{fontSize: '1.2rem'}}>Manufacturer Name</th>
                    <th className="align-middle text-center">Delete?</th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.map(manufacturer => {
                    return (
                        <tr key={manufacturer.id}>
                            <td className="align-middle fw-bold px-3" style={{fontSize: '1.2rem'}}>{ manufacturer.name }</td>
                            <td className="align-middle px-3 text-center">
                                <button className="btn btn-outline-dark" role="button" onClick={() => handleDelete(manufacturer.id)}>
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

export default ManufacturerList
