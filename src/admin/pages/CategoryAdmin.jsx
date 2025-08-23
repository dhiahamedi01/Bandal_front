import React from 'react'
import CardAdmin from '../components/CardAdmin'
import Sidebar from '../components/SidebarAdmin'
import TableCategory from '../components/TableCategory'

const CategoryAdmin = () => {
  return (
    <div className="d-flex div-admin-dashboard-main">
    <Sidebar/>
<div className="d-flex flex-column div-admin-dashboard-main-child">
    <CardAdmin/>
    <TableCategory/>
    
    </div>
  </div>
  )
}

export default CategoryAdmin