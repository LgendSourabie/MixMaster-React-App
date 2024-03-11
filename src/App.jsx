import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About, HomeLayout, Newsletter, Landing, Cocktail, Error } from "./Pages";
import { loader as landingloader } from "./Pages/Landing";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: landingloader,
        element: <Landing />,
      },

      {
        path: "/cocktail",
        element: <Cocktail />,
      },

      {
        path: "/newsletter",
        element: <Newsletter />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  ,
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
