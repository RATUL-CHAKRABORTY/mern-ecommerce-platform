import './App.css'
import { Routes, Route } from 'react-router-dom'
import AuthLayout from './components/auth/Layout'
import AuthLogin from './pages/auth/AuthLogin'
import AuthRegister from './pages/auth/AuthRegister'
import AdminLayout from './components/admin-view/Layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import ShoppingLayout from './components/shopping-view/Layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/Home'
import ShoppingListing from './pages/shopping-view/Listing'
import ShoppingCheckout from './pages/shopping-view/Checkout'
import ShoppingAccount from './pages/shopping-view/Account'
import CheckAuth from './components/common/check-auth'
import { UserCircle2 } from 'lucide-react'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
function App() {

  const {user,isAuthenticated,isLoading}=useSelector(state=> state.auth );
  const dispatch= useDispatch();

  useEffect(()=>{
   dispatch(checkAuth());
  }
   ,[dispatch]
  )
  
  if(isLoading) return <Skeleton className="w-full h-[600px] bg-black" />

  console.log(isLoading,user);
  
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      {/* <h1>Header component</h1> */}

      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
            </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
            </CheckAuth>
        }>
         <Route path="dashboard" element={<AdminDashboard/>}/>
         <Route path="features" element={<AdminFeatures/>}/>
         <Route path="orders" element={<AdminOrders/>}/>
         <Route path="products" element={<AdminProducts/>}/>
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
            </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome/>}/>
          <Route path="listing" element={<ShoppingListing/>}/>
          <Route path="checkout" element={<ShoppingCheckout/>}/>
          <Route path="account" element={<ShoppingAccount/>}></Route>
        </Route>
        <Route path="*" element={<NotFound/>}/>
        <Route path='/unauth-page' element={<UnauthPage/>}/>
      </Routes>
    </div>
  )
}

export default App