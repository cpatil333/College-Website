import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { getUsers } from "./API/getUsers";
import { AppLayout } from "./components/AppLayout";
import { Register, registerData } from "./pages/Register";
import { Login, loginData } from "./components/Login";

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
          path: "/register",
          element: <Register />,
          action: registerData,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginData,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
