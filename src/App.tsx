import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";

const Register = lazy(() => import("./pages/registerPage/register.component"));
const Login = lazy(() => import("./pages/loginPage/login.component"));
const CreateBlog = lazy(
  () => import("./pages/createBlogPage/createBlog.component")
);
const Home = lazy(() => import("./pages/homePage/home.component"));
const Navbar = lazy(() => import("./components/navbar/navbar.component"));
const Footer = lazy(() => import("./components/footer/footer.component"));
const BlogDetail = lazy(() => import("./pages/blogPage/blogDetail.component"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
