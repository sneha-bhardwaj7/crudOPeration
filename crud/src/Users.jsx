import React, { useState } from "react";

function Users() {
  const [users, setUsers] = useState({
    Name: "yousaf",
    Email: "ysfg@mail.com",
    Age: 20,
  });

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
             <tbody>
                    {
                        users.map((user) => (
                        <tr key={user.Email}>
                            <td>{user.Name}</td>
                            <td>{user.Email}</td>
                            <td>{user.Age}</td>
                            <td><button>Edit</button></td>
                        </tr>
                        ))
                    }
                    </tbody>
        </table>
      </div>
    </div>
  );
}
export default Users