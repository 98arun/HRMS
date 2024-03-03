import React, { useEffect, useState } from "react";
import { fetchEmployeeData } from '../firebaseService'

const Hr = () => {
  const [data, setData] = useState(null);

  // Fetch user data from database
  useEffect(() => {
    fetchEmployeeData()
      .then(dataArray => setData(dataArray))
      .catch(error => console.error("Error fetching user data:", error));
  }, []);


  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Email</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Leave Type</th>
              <th style={{ width: '30%' }}>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((entry, index) => (
              <tr key={index}>
                <td>{entry.userEmail}</td>
                <td>{entry.startDate}</td>
                <td>{entry.endDate}</td>
                <td>{entry.leaveType}</td>
                <td>{entry.reason}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Hr;

