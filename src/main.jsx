import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Shop/Shop';
import Home from './components/Layout/Home';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductsLoader from './loaders/cartProductsLoader';
import Checkout from './components/Checkout/Checkout';
import Registration from './components/Login/Registration';
import Authprovider from './Provider/Authprovider';
import Privateroute from './Router/Privateroute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Shop></Shop>,
        loader:()=>{return fetch('http://localhost:5000/totalproduct')}
      },
      {
        path: '/orders',
        element: <Privateroute><Orders></Orders></Privateroute>,
        loader: cartProductsLoader
      },
      {
        path: '/inventory',
        element: <Privateroute><Inventory></Inventory></Privateroute>
      },
      {
        path:'/checkout',
        element: <Checkout></Checkout>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/registration',
        element: <Registration></Registration>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authprovider>
    <RouterProvider router={router} />
    </Authprovider>
  </React.StrictMode>,
)
