import { useLoaderData, useNavigate } from "react-router-dom";

export const FacultyNotices = () => {
  const navigate = useNavigate();
  const noticeList = useLoaderData();
  console.log(noticeList);

  return (
    <div className="main-container">
      <h2>Notice List</h2>
      <div>
        <button className="" onClick={() => navigate(`/add-notice`)}>
          New Notice
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Visible</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {noticeList?.notices.map((notice) =>
            notice.course.enrollments.map((enrollment) => (
              <tr key={enrollment.id}>
                <td>{notice.title}</td>
                <td>{notice.body}</td>
                <td>{enrollment.user.fullName}</td>
                <td>{enrollment.user.email}</td>
                <td>{notice.visible === "true" ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => navigate(`/edit-course/` + course.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(course.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
