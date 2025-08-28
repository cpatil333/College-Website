import { useLoaderData, useNavigate } from "react-router-dom";

export const Courses = () => {
  const navigate = useNavigate();
  const coursesList = useLoaderData();
  console.log(coursesList);
  return (
    <div className="main-container">
      <h2>Course List</h2>
      <div>
        <button className="" onClick={() => navigate(`/add-course`)}>
          New Course
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Title</th>
            <th>Description</th>
            <th>Program Name</th>
            <th>Teacher Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {coursesList?.eduCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.code}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.program?.[0]?.name}</td>
              <td>{course.teacher?.[0]?.fullName}</td>
              <td>
                <button onClick={() => navigate(`/edit-course/` + course.id)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
