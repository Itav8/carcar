import React, { useEffect, useState } from "react";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const customersList = await fetch("http://localhost:8090/api/customers/");

      if (customersList.ok) {
        const data = await customersList.json();
        console.log(data.customers);
        setCustomers(data.customers);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <>
      <h1>Customers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, i) => {
            return (
              <tr key={i}>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default CustomerList;
