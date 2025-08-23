import CardAdmin from "../components/CardAdmin"
import Sidebar from "../components/SidebarAdmin"
import TableNotSale from "../components/TableNotSale"
import './Styles/Admin.css'

const NotSaleAdmin = () => {
  return (
    <div className="d-flex div-admin-dashboard-main">
    <Sidebar/>
<div className="d-flex flex-column div-admin-dashboard-main-child">
    <CardAdmin/>
    {/* <NewTable/> */}
    <TableNotSale/>
    </div>
  </div>
  )
}

export default NotSaleAdmin







