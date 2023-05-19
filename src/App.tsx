import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./pages/registerPage/register.component";
import Login from "./pages/loginPage/login.component";
import CreateBlog from "./pages/createBlogPage/createBlog.component";
import Home from "./pages/homePage/home.component";
import Blog from "./pages/blogPage/blog.component";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import "./App.css";

const Layout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog/:id",
        element: <Blog />,
      },
      {
        path: "/create",
        element: <CreateBlog />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
