
import CardAdmin from "../components/CardAdmin"
import Sidebar from "../components/SidebarAdmin"
import TableUser from "../components/TableUser"

import './Styles/Admin.css'
const AdminUser = () => {
  return (
    <div className="d-flex div-admin-dashboard-main">
    <Sidebar/>
    
<div className="d-flex flex-column div-admin-dashboard-main-child">
    <CardAdmin/>
    <TableUser/>
    </div>
  </div>
  )
}

export default AdminUser


