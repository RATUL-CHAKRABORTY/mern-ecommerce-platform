
import React,{useState} from 'react'
import {Outlet} from 'react-router-dom';
import AdminHeader from './Header';
import AdminSidebar from './Sidebar';
function AdminLayout() {
  const [openSidebar,setOpenSidebar]=useState(false);

  return (
    <div className='flex min-h-screen w -full'>
        {/*admin sidebar*/}
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
        <div className="flex flex-1 flex-col">
          {/*admin header*/} 
          <AdminHeader open={openSidebar} setOpen={setOpenSidebar}/> 
          <main>
             <Outlet/>
          </main>
        </div>
    </div>
  )
}

export default AdminLayout;