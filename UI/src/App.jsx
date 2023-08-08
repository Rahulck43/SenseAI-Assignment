import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from './utils/store/store';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./user/components/Login";
import AdminLogin from "./admin/components/Login";
import DashBoard from "./admin/components/DashBoard";
import Register from "./user/components/Register";
import Profile from "./user/components/Profile";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: <DashBoard />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
