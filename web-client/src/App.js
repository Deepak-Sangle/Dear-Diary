import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import HomePage from './screens/home';
import Registration from "./screens/Registration";
import Login from "./screens/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Registration />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;