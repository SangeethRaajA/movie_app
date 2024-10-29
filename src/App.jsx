import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import LayoutMain from "./components/Layout/LayoutMain";
import { ConfigProvider } from "antd";
import Home from "./pages/Home/Home";
import SearchPage from "./pages/Search/SearchPage";
import NotFoundPage from "./pages/Error/NotFoundPage";
import ProfilePage from "./pages/Profile/ProfilePage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayoutMain>
          <Home />
        </LayoutMain>
      ),
      errorElement: <NotFoundPage />,
    },
    {
      path: "/search",
      element: (
        <LayoutMain>
          <SearchPage />
        </LayoutMain>
      ),
    },
    {
      path: "/movies",
      element: (
        <LayoutMain>
          <Movies />
        </LayoutMain>
      ),
    },
    {
      path: "/series",
      element: (
        <LayoutMain>
          <Series />
        </LayoutMain>
      ),
    }  ,
    {
      path: "/movies/:profileId",
      element: (
        <LayoutMain>
          <ProfilePage />
        </LayoutMain>
      ),
    }  
  ]);
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            borderradius: 8,
            fontSize: 16,
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
};

export default App;
