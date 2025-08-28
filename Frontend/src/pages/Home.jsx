import { useLoaderData, useNavigate } from "react-router-dom";
import { USER_DELETE } from "../apollo/Mutation";
import { useMutation } from "@apollo/client";

export const Home = () => {
  const navigate = useNavigate();
  const userList = useLoaderData();
  const [userDelete] = useMutation(USER_DELETE);

  const handleDelete = async (userId) => {
    try {
      const { data } = await userDelete({
        variables: {
          deleteUserId: userId,
        },
      });

      if (data?.deleteUser) {
        alert("User Deleted successfully!");
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("User Deleted Error ", error.message);
      alert("Error user deleted failed");
    }
  };

  return (
    <div className="main-container">
      <h2>User List</h2>
      <div>
        <button className="" onClick={() => navigate(`/register`)}>
          New User
        </button>
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
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => navigate(`/edit-user/` + user.id)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
