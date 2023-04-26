import React, { useEffect, useState } from "react";

function SalesList() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const salesList = await fetch("http://localhost:8090/api/sales/");

      if (salesList.ok) {
        const data = await salesList.json();
        setSales(data.sales);
      }
    };
    fetchSales();
  }, []);

  return (
    <>
      <h1>Sales</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, i) => {
            const salespersonName = `${sale.salesperson.first_name} ${sale.salesperson.last_name}`;
            const customerName = `${sale.customer.first_name} ${sale.customer.last_name}`;
            return (
              <tr key={i}>
                <td>{sale.salesperson.employee_id}</td>
                <td>{salespersonName}</td>
                <td>{customerName}</td>
                <td>{sale.automobile.vin}</td>
                <td>${sale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalesList;
