import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"
import { store, persistor } from './utils/store/store'


import Login from "./admin/components/Login"
import DashBoard from "./admin/components/DashBoard"
import { RouterProvider, createBrowserRouter } from "react-router-dom"



const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: <DashBoard />,
  },
]);




function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <RouterProvider router={router} />
        </PersistGate>
      </Provider >
    </>
  )
}

export default App
