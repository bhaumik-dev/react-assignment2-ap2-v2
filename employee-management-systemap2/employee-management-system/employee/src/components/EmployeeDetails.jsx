import React, { useState } from "react";

const EmployeeDetails = ({ employee, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Check if employee is undefined or null
  if (!employee) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Call onDelete function with employee ID to delete the employee
    onDelete(employee.id);
  };

  const handleSave = () => {
    // Implement save functionality
    setIsEditing(false);
  };

  return (
    <div>
      <h2>Employee Details</h2>
      <div>
        <strong>ID:</strong> {employee.id}
      </div>
      <div>
        <strong>First Name:</strong> {employee.firstName}
      </div>
      <div>
        <strong>Last Name:</strong> {employee.lastName}
      </div>
      <div>
        <strong>Age:</strong> {employee.age}
      </div>
      <div>
        <strong>Date of Joining:</strong> {employee.dateOfJoining}
      </div>
      <div>
        <strong>Title:</strong> {employee.title}
      </div>
      <div>
        <strong>Department:</strong> {employee.department}
      </div>
      <div>
        <strong>Employee Type:</strong> {employee.employeeType}
      </div>
      <div>
        <strong>Current Status:</strong>{" "}
        {employee.currentStatus ? "Active" : "Inactive"}
      </div>
      {!isEditing ? (
        <div>
          <button onClick={handleEdit}>Edit</button>
          {/* Delete button triggers handleDelete function */}
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
