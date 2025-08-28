import { useLoaderData, useNavigate } from "react-router-dom";

export const FacultyCourses = () => {
  const navigate = useNavigate();
  const facultyCoursesList = useLoaderData();
  console.log(facultyCoursesList);
  return (
    <div className="main-container">
      <h2>Faculty Course List</h2>
      {/* <div>
        <button className="" onClick={() => navigate(`/add-course`)}>
          New Course
        </button>
      </div> */}
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Student Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {facultyCoursesList?.facultyCourses.map((course) =>
            course.enrollments.map((enrollment) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{enrollment.user.fullName}</td>
                <td>{enrollment.user.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
