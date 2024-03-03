import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off, set } from "firebase/database";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchEmployeeData } from '../firebaseService'

const Manager = () => {
  const [data, setData] = useState(null);

  // Fetch user data from database
  useEffect(() => {
    fetchEmployeeData()
      .then(dataArray => setData(dataArray))
      .catch(error => console.error("Error fetching user data:", error));
  }, []);

  const updateApplicationStatus = (email, status) => {
    const db = getDatabase();
    const updatedData = data?.map((entry) => {
      if (entry.userEmail === email) {
        return { ...entry, status: status };
      }
      return entry;
    });
    setData(updatedData);
    set(ref(db, 'employeeData'), updatedData)
      .then(() => {
        toast.success(`Application for ${email} ${status.toLowerCase()} successfully.`);
        console.log(`Application for ${email} ${status.toLowerCase()} successfully.`);
      })
      .catch((error) => {
        toast.error(`Error ${status.toLowerCase()} application for ${email}: `);
        console.error(`Error ${status.toLowerCase()} application for ${email}: `, error);
      });
  };

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
              <th>Action</th>
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
                <td>
                  <button style={{ marginRight: 10, background: '#b1e0d5' }} onClick={() => updateApplicationStatus(entry.userEmail, 'Approved')}>Approve</button>
                  <button style={{ marginRight: 10, background: '#DB9E9E' }} onClick={() => updateApplicationStatus(entry.userEmail, 'Rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Manager;

