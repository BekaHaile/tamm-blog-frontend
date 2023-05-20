import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/registerPage/register.component";
import Login from "./pages/loginPage/login.component";
import CreateBlog from "./pages/createBlogPage/createBlog.component";
import Home from "./pages/homePage/home.component";
import Navbar from "./components/navbar/navbar.component";
import Footer from "./components/footer/footer.component";
import "./App.css";
import BlogDetail from "./pages/blogPage/blogDetail.component";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
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
        element: <BlogDetail />,
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
