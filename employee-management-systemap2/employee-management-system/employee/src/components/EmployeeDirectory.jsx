// import React, { useState, useEffect } from "react";
// import EmployeeSearch from "./EmployeeSearch";
// import EmployeeTable from "./EmployeeTable";
// // import EmployeeCreate from "./EmployeeCreate";
// import "../styles/styles.css";

// const EmployeeDirectory = () => {
//   const [employeeData, setEmployeeData] = useState([]);

//   const updateEmployeeData = (newEmployee) => {
//     setEmployeeData([...employeeData, newEmployee]);
//   };

//   const handleDelete = async (employeeId) => {
//     try {
//       // Make a DELETE request to your server
//       const response = await fetch(
//         `http://localhost:4000/employees/${employeeId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (response.ok) {
//         // If the request is successful, update the employee data in the state to remove the deleted employee
//         setEmployeeData(
//           employeeData.filter((employee) => employee.id !== employeeId)
//         );
//       } else {
//         console.error("Failed to delete employee");
//       }
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//     }
//   };
//   // Fetch employee data from server
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/graphql", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             query: `
//               query {
//                 employees {
//                   id
//                   firstName
//                   lastName
//                   age
//                   dateOfJoining
//                   title
//                   department
//                   employeeType
//                   currentStatus
//                 }
//               }
//             `,
//           }),
//         });
//         // Error handling
//         if (response.ok) {
//           const data = await response.json();
//           setEmployeeData(data.data.employees);
//         } else {
//           console.error("Failed to fetch employee data");
//         }
//       } catch (error) {
//         console.error("Error fetching employee data:", error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   console.log("Employee data state:", employeeData);

//   return (
//     <div>
//       <h1>Employee Directory</h1>
//       <EmployeeSearch />
//       {employeeData.length > 0 ? (
//         <EmployeeTable employeeData={employeeData} onDelete={handleDelete} />
//       ) : (
//         <p>No employee data available</p>
//       )}
//       {/* <EmployeeCreate updateEmployeeData={updateEmployeeData} /> */}
//     </div>
//   );
// };

// export default EmployeeDirectory;

import React, { useState, useEffect } from "react";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
import EmployeeDetails from "./EmployeeDetails"; // Import EmployeeDetails component
import "../styles/styles.css";

const EmployeeDirectory = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store the selected employee

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                employees {
                  id
                  firstName
                  lastName
                  age
                  dateOfJoining
                  title
                  department
                  employeeType
                  currentStatus
                }
              }
            `,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setEmployeeData(data.data.employees);
        } else {
          console.error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    // Implement delete functionality if needed
  };

  return (
    <div>
      <h1>Employee Directory</h1>
      <EmployeeSearch />
      {employeeData.length > 0 ? (
        <>
          <EmployeeTable
            employeeData={employeeData}
            setSelectedEmployee={setSelectedEmployee} // Pass setSelectedEmployee function to EmployeeTable
          />
          {selectedEmployee && ( // Conditional rendering for EmployeeDetails
            <EmployeeDetails
              employee={selectedEmployee}
              onDelete={handleDelete}
            />
          )}
        </>
      ) : (
        <p>No employee data available</p>
      )}
    </div>
  );
};

export default EmployeeDirectory;
