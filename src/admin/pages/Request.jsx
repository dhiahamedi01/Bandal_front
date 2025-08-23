import React from 'react'
import CardAdmin from "../components/CardAdmin"
import Sidebar from "../components/SidebarAdmin"
import TableCollection from "../components/TableRequest"
import './Styles/Admin.css'

function Request() {
  return (
    <div className="d-flex div-admin-dashboard-main">
    <Sidebar/>
<div className="d-flex flex-column div-admin-dashboard-main-child">
    <CardAdmin/>
    {/* <NewTable/> */}
    <TableCollection/>
    </div>
  </div>
  )
}

export default Request