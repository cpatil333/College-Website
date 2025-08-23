import { useLoaderData, useNavigate,useRevalidator } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const userList = useLoaderData();
  
  return (
     <div className="main-container">
      <h2>User List</h2>
      <div>
        <button className="" onClick={() => navigate(`/register`)}>New User</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.users.map((user) => (
            <tr>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
