import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import LayoutMain from "./components/Layout/LayoutMain";
import { ConfigProvider } from "antd";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayoutMain>
          <Dashboard />
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
    },
  ]);
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 8,
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
