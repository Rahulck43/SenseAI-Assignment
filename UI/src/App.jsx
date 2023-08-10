import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from './utils/store/store';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./user/components/Login";
import AdminLogin from "./admin/components/Login";
import DashBoard from "./admin/components/DashBoard";
import ProfilePage from "./user/pages/ProfilePage";
import EditProfilePage from "./user/pages/EditProfilePage";
import SignupRequest from "./user/components/SignupRequest";
import RequestPage from "./admin/components/RequestPage";

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
    element: <SignupRequest />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path:"/edit-profile",
    element:<EditProfilePage/>
  },
  {
    path:"/admin/requests",
    element:<RequestPage/>
  }
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
