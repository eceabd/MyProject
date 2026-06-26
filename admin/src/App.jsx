import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import AdminLogin from './components/AdminLogin'
import List from './components/List'
import Add from './components/Add'
import { Route, Routes } from 'react-router-dom'
import Orders from './components/Orders'
import Users from './components/Users'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {

  return (
    <>
    <Sidebar/>
    <Routes>
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/admin/add' element={<ProtectedRoute><Add/></ProtectedRoute>}/>
      <Route path='/admin/list' element={<ProtectedRoute><List/></ProtectedRoute>}/>
      <Route path='/admin/orders' element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
      <Route path='/admin/users' element={<ProtectedRoute><Users/></ProtectedRoute>}/>

    </Routes>

    </>
  )
}

export default App