import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { EditUser } from "./pages/EditUser";
import { getUsers } from "./API/getUsers";
import { getUser } from "./API/getUser";
import { AppLayout } from "./components/AppLayout";
import { Register, registerData } from "./pages/Register";
import { Login, loginData } from "./components/Login";
import { Programs } from "./pages/Programs";
import { getPrograms } from "./API/getPrograms";
import { CreateProgram, programData } from "./pages/CreateProgram";
import { EditProgram } from "./pages/EditProgram";
import { getProgram } from "./API/getProgram";
import { Courses } from "./pages/Courses";
import { getCourses } from "./API/getCourses";
import { StudentCourse } from "./pages/student/StudentCourse";
import { StudentProgram } from "./pages/student/StudentProgram";
import { StudentEnrollment } from "./pages/student/StudentEnrollment";
import { courseData, CreateCourse } from "./pages/CreateCourse";
import { EditCourse } from "./pages/EditCourse";
import { getCourse } from "./API/getCourse";
import { FacultyNotices } from "./pages/faculty/FacultyNotices";
import { getNotices } from "./API/getNotices";
import { FacultyCourses } from "./pages/faculty/FacultyCourses";
import { getFacultyCourses } from "./API/getFacultyCourses";
import { Events } from "./pages/faculty/Events";
import { getEvents } from "./API/getEvents";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: getUsers,
        },
        {
          path: "/edit-user/:id",
          element: <EditUser />,
          loader: getUser,
        },
        {
          path: "/register",
          element: <Register />,
          action: registerData,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginData,
        },
        {
          path: "/programs",
          element: <Programs />,
          loader: getPrograms,
        },
        {
          path: "/add-program",
          element: <CreateProgram />,
          action: programData,
        },
        {
          path: "/edit-program/:id",
          element: <EditProgram />,
          loader: getProgram,
        },
        {
          path: "/courses",
          element: <Courses />,
          loader: getCourses,
        },
        {
          path: "/add-course",
          element: <CreateCourse />,
          action: courseData,
        },
        {
          path: "/edit-course/:id",
          element: <EditCourse />,
          loader: getCourse,
        },
        {
          path: "/faculty-courses",
          element: <FacultyCourses />,
          loader: getFacultyCourses,
        },
        {
          path: "/faculty-notices",
          element: <FacultyNotices />,
          loader: getNotices,
        },
        {
          path: "/event",
          element: <Events />,
          loader: getEvents,
        },
        {
          path: "/edit-course/:id",
          element: <EditProgram />,
          loader: getProgram,
        },
        {
          path: "/student-program",
          element: <StudentProgram />,
        },
        {
          path: "/student-course",
          element: <StudentCourse />,
        },
        {
          path: "/student-enrollment",
          element: <StudentEnrollment />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
