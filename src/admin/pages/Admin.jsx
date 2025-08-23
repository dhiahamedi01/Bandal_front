import CardAdmin from "../components/CardAdmin"
import Sidebar from "../components/SidebarAdmin"
import TableAdmin from "../components/TableAdmin"

import './Styles/Admin.css'
const Admin = () => {
  return (
    <div className="d-flex div-admin-dashboard-main">
      <Sidebar/>
<div className="d-flex flex-column div-admin-dashboard-main-child">
      <CardAdmin/>
      {/* <NewTable/> */}
      <TableAdmin/>
      </div>
    </div>
  )
}

export default Admin