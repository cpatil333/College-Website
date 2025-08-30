import { useLoaderData, useNavigate } from "react-router-dom";
import { USER_DELETE } from "../apollo/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { getUserPagination } from "../API/getUserPagination";
import { GET_USER_PAGINATION } from "../apollo/Query";

export const Home = () => {
  const navigate = useNavigate();
  const userList = useLoaderData();
  const [userDelete] = useMutation(USER_DELETE);
  const [page, setPage] = useState(1);
  const limit = 4; //how many rows par pages

  // GraphQL query with pagination
  const {
    data: paginateData,
    loading,
    error,
  } = useQuery(GET_USER_PAGINATION, {
    variables: { options: { page, limit } },
  });
  // build a source list fallback (filtered if present else loader)
  const sourceList = userList?.users ?? [];

  // totalPages fallback: prefer server-provided, otherwise compute from local source
  const totalPages =
    paginateData?.userPagination?.totalPages ??
    Math.max(1, Math.ceil((sourceList.length || 0) / limit));

  // clamp page if totalPages changed (prevents page > totalPages)
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [totalPages, page]);

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

  const displayUsers = paginateData?.userPagination.items || userList.users;

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
          {displayUsers.map((user) => (
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

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>

        {Array.from(
          { length: paginateData?.userPagination?.totalPages || 1 },
          (_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          disabled={page === paginateData?.userPagination?.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
