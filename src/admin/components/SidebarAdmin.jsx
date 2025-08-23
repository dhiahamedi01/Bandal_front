import React from "react";
import logo from "../../assets/log.png";

import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
} from "cdbreact";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../redux/apiCall/authAdminCall";

const divStyle = {
  fontSize: "22px",
  marginTop: "100px",
};
const Sidebar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    toast.success("Logout Successfuly  !");
    navigate("/admin/login");
  };

  return (
    <div
      className="sidebar-component-main"
      style={{ display: "flex", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#1A1C1E">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <Link exact="true" to={"/admin"}>
            {" "}
            <img alt="" style={{ width: "180px" }} src={logo} />
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink exact="true" to="/admin" activeclassname="activeClicked" end>
              <CDBSidebarMenuItem icon="home" iconSize="lg">
                <span style={divStyle}>Main</span>
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact="true" to="/adminorder" activeclassname="activeClicked" end>
              <CDBSidebarMenuItem icon="list-alt" iconSize="lg">
                <span style={divStyle}>Orders</span>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/admin/category" activeclassname="activeClicked" end>
              <CDBSidebarMenuItem
                icon="th"
                iconType="solid"
                textFontSize="16px"
                iconSize="lg"
              >
                <span style={divStyle}>Category</span>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact="true"
              to="/admin/admincollections"
              activeclassname="activeClicked"
              end
            >
              <CDBSidebarMenuItem
                icon="boxes"
                iconType="solid"
                textFontSize="16px"
                iconSize="lg"
              >
                <span style={divStyle}>Collection</span>
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact="true" to="/admin/notsale" activeclassname="activeClicked" end>
              <CDBSidebarMenuItem
                icon="boxes"
                iconType="solid"
                textFontSize="16px"
                iconSize="lg"
              >
                <span style={divStyle}>Not For Sale</span>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/admin/request" activeclassname="activeClicked" end>
                <CDBSidebarMenuItem
                  icon="file-alt"   
                  iconType="solid"
                  textFontSize="16px"
                  iconSize="lg"
                >
                  <span style={divStyle}>Request</span>
                </CDBSidebarMenuItem>
              </NavLink>

            <NavLink exact="true" to="/admin/user" activeclassname="activeClicked" end>
              <CDBSidebarMenuItem
                icon="fa fa-users"
                iconType="solid"
                textFontSize="16px"
                iconSize="lg"
              >
                <span style={divStyle}>User</span>
              </CDBSidebarMenuItem>
            </NavLink>

            <CDBSidebarMenuItem
              icon="sign-out-alt"
              iconType="solid"
              textFontSize="16px"
              iconSize="lg"
              onClick={handleLogout}
            >
              <span style={divStyle}>Logout</span>
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            crafted by CODEX
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
