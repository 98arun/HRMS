import React, { useState, useEffect } from "react";
import { getDatabase, ref, push } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchEmployeeData } from "../firebaseService";
import { useProfile } from "../contexts/Profile.Context";

const Employee = () => {
  console.log("Employee");
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    leaveType: "",
    reason: "",
  });
  const [data, setData] = useState([]);
  const { profile } = useProfile();
  const userEmail = profile?.email

  // Fetch user data from database
  useEffect(() => {
    fetchEmployeeData()
      .then((dataArray) => setData(dataArray))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const db = getDatabase();
    const employeeDataRef = ref(db, "employeeData");

    push(employeeDataRef, {
      userEmail: userEmail,
      ...formData,
      status: "Pending",
    })
      .then(() => {
        toast.success("Request submitted successfully!");
        setData([...data, { userEmail, ...formData, status: "Pending" }]);
        // Reset form fields
        setFormData({
          startDate: "",
          endDate: "",
          leaveType: "",
          reason: "",
        });
      })
      .catch((error) => {
        console.error("Failed to post data to Firebase:", error);
        toast.error("Failed to submit request. Please try again.");
      });
  };

  const filteredData = data?.filter((item) => item.userEmail === userEmail);
  console.log("@@data",data)
  console.log("@@filteredData",filteredData)
  console.log("@@userEmail",userEmail)
  return (
    <div className="container mt-5" style={{ width: "50%" }}>
      <h2 className="mb-4">Employee Absence Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Start Date:</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date:</label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Leave Type:</label>
          <select
            className="form-select"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Personnel Leave">Personnel Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Reason:</label>
          <textarea
            className="form-control"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ background: "white", color: "#0d6efd" }}
        >
          Submit
        </button>
      </form>
      {filteredData.length > 0 && (
        <div className="mt-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
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
      )}
    </div>
  );
};

export default Employee;
