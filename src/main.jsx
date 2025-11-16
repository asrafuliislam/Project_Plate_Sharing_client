import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import RootLayout from './RootLayout/RootLayout.jsx'
import Home from './Components/Home/Home.jsx'
import AvailableFoods from './pages/AvailableFoods/AvailableFoods.jsx'
import AuthProvider from './Contexts/AuthProvider.jsx'
import Login from './Components/Authen/Login.jsx'
import Register from './Components/Authen/Register.jsx'
import ManageMyfoods from './pages/ManageMyfoods/ManageMyfoods.jsx'
import FoodDetails from './pages/FoodDetails/FoodDetails.jsx'
import MyRequest from './pages/MyRequest/MyRequest.jsx'
import PrivateRouter from './Contexts/PrivateRouter.jsx'
import LoadingSpinner from './Components/LoadingSpinner.jsx'
import AddFoodPage from './pages/AddFood/AddFoodspage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/availableFoods',
        loader: () => fetch('https://community-food-sharing-server-azure.vercel.app/foods'),
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AvailableFoods />
          </Suspense>
        ),
      },

      {
        path: '/manageMyFoods',
        element: <PrivateRouter><ManageMyfoods></ManageMyfoods></PrivateRouter>
      },
      {
        path: '/foodDetails/:id',
        loader: ({ params }) => fetch(`https://community-food-sharing-server-azure.vercel.app/foodsDetails/${params.id}`),
        element: <PrivateRouter><FoodDetails /></PrivateRouter>,
      },
      {
        path: '/myRequest',
        element: <PrivateRouter><MyRequest></MyRequest></PrivateRouter>
      },
      {
        path: '/addfood',
        element: <PrivateRouter><AddFoodPage></AddFoodPage></PrivateRouter>
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
