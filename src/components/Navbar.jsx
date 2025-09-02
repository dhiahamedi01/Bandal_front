import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../assets/1002577587.png";
import { Link, useLocation } from "react-router-dom";
import "./Styles/Navbar.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/apiCall/authCall";
import ShoppingCart from "../components/ShoppingCart.jsx";
import { useSelector } from "react-redux";
import ButtonComponent from "./ButtonComponent";

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartcount, carts } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

const [activePage, setActivePage] = useState("home");

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Get userInfo from localStorage
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedUserInfo) {
      // Parse the stored JSON string to an object
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  useEffect(() => {
    // console.log("useEffect ", cartcount);
  }, [cartcount]);

  const handlePageChange = (page) => {
    setActivePage(page);
    localStorage.setItem("activePage", page);
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const location = useLocation();

  // Conditionally render the Navbar based on the route
  if (location.pathname.includes("/admin")) {
    return null; // Don't render Navbar for admin routes
  }

  return (
    <AppBar position="static" className="class-to-remove-shadow min-vw-100">
      <Container maxWidth="false" className="Navbar-main-Containerr min-vw-100">
        <Toolbar
          disableGutters
          className="d-flex Toolbar-Navbar-main-component"
        >
         <Link to="/" onClick={() => handlePageChange("home")}>
                <img
                  className="Logo-Navbar-main-component"
                  src={Logo}
                  width="220px"
                  alt="Logo"
                  style={{ cursor: "pointer" }}
                />
              </Link>


          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              className="box-navbar-responsive-main"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/"
                  className={`Menu-Navbar-Component-main nav-item ${
                    activePage === "home" ? "active" : ""
                  }`}
                  onClick={() => handlePageChange("home")}
                >
                  <Typography textAlign="center">Home</Typography>
                </Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/about"
                  className={`Menu-Navbar-Component-main nav-item ${
                    activePage === "about" ? "active" : ""
                  }`}
                  onClick={() => handlePageChange("about")}
                >
                  <Typography textAlign="center">About Us</Typography>
                </Link>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/products"
                  className={`Menu-Navbar-Component-main nav-item ${
                    activePage === "product" ? "active" : ""
                  }`}
                  onClick={() => handlePageChange("product")}
                >
                  <Typography textAlign="center">Products</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/Request"
                  className={`Menu-Navbar-Component-main nav-item ${
                    activePage === "product" ? "active" : ""
                  }`}
                  onClick={() => handlePageChange("product")}
                >
                  <Typography textAlign="center"> request a customize</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/contact"
                  className={`Menu-Navbar-Component-main nav-item ${
                    activePage === "contact" ? "active" : ""
                  }`}
                  onClick={() => handlePageChange("contact")}
                >
                  <Typography textAlign="center">Contact Us</Typography>
                </Link>
              </MenuItem>
              {user && user.length > 0 ? (
  <div key="user-menu">
    <MenuItem onClick={handleCloseNavMenu}>
      <Link
        to="/profile"
        className={`Menu-Navbar-Component-main nav-item ${
          activePage === "profile" ? "active" : ""
        }`}
        onClick={() => handlePageChange("profile")}
      >
        <Typography textAlign="center">Profile</Typography>
      </Link>
    </MenuItem>

    <MenuItem onClick={handleCloseNavMenu}>
      <Link
        to="/orders"
        className={`Menu-Navbar-Component-main nav-item ${
          activePage === "orders" ? "active" : ""
        }`}
        onClick={() => handlePageChange("orders")}
      >
        <Typography textAlign="center">My Orders</Typography>
      </Link>
    </MenuItem>

    <MenuItem onClick={handleCloseNavMenu}>
      <Link
        to="/"
        className={`Menu-Navbar-Component-main nav-item ${
          activePage === "logout" ? "active" : ""
        }`}
        onClick={() => dispatch(logoutUser())}
      >
        <Typography textAlign="center">Log Out</Typography>
      </Link>
    </MenuItem>
  </div>
) : (
  // Your other code for the 'else' case goes here


                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="/login"
                    className={`Menu-Navbar-Component-main nav-item ${
                      activePage === "login" ? "active" : ""
                    }`}
                  >
                    <ButtonComponent>Log In</ButtonComponent>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link
              to="/"
              className={`Menu-Navbar-Component-main nav-item ${
                activePage === "home" ? "active" : ""
              }`}
              onClick={() => handlePageChange("home")}
            >
              <Button
                className="Menu-Navbar-Component-main "
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Home
              </Button>
            </Link>
            <Link
              to="/about"
              className={`Menu-Navbar-Component-main nav-item ${
                activePage === "about" ? "active" : ""
              }`}
              onClick={() => handlePageChange("about")}
            >
              <Button
                className="Menu-Navbar-Component-main "
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                About Us
              </Button>
            </Link>
            <Link
              to="/products"
              className={`Menu-Navbar-Component-main nav-item ${
                activePage === "product" ? "active" : ""
              }`}
              onClick={() => handlePageChange("product")}
            >
              <Button
                className="Menu-Navbar-Component-main "
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Products
              </Button>
            </Link>
            <Link
                to="/Request"
                className={`Menu-Navbar-Component-main nav-item ${
                  activePage === "Request" ? "active" : ""
                }`}
                onClick={() => handlePageChange("Request")}
              >
                <Button
                  className="Menu-Navbar-Component-main"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                   request a customize
                </Button>
              </Link>

            <Link
              to="/contact"
              className={`Menu-Navbar-Component-main nav-item ${
                activePage === "contact" ? "active" : ""
              }`}
              onClick={() => handlePageChange("contact")}
            >
              <Button
                className="Menu-Navbar-Component-main "
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Contact Us
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0, paddingLeft: 1 }}>
            <ShoppingCart className="fi-shopping-card-icon" />
            {cartcount > 0 && (
              <div className="small-circle rounded-circle d-flex">
                {cartcount}
              </div>
            )}
            {user && user.length > 0 ? (
              [
                // console.log("image", user[0].data.userImage),
                <React.Fragment key="user-menu1">
                  <Tooltip title="Open settings">
                    {/* change the icon of the user */}
                    <IconButton
                      className="user-account-icon-navbars"
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <Avatar alt="User" src={user[0].data.userImage} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Link
                      to="/profile"
                      className={`Menu-Navbar-Component-main nav-item ${
                        activePage === "profile" ? "active" : ""
                      }`}
                      onClick={() => handlePageChange("profile")}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Profile</Typography>
                      </MenuItem>
                    </Link>

                    <Link
                      to="/myorders"
                      className={`Menu-Navbar-Component-main nav-item ${
                        activePage === "orders" ? "active" : ""
                      }`}
                      onClick={() => handlePageChange("orders")}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">My Orders</Typography>
                      </MenuItem>
                    </Link>

                    <Link
                      to="/"
                      className={`Menu-Navbar-Component-main nav-item ${
                        activePage === "logout" ? "active" : ""
                      }`}
                      onClick={() => dispatch(logoutUser())}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Log Out</Typography>
                      </MenuItem>
                    </Link>
                  </Menu>
                </React.Fragment>,
              ]
            ) : (
              <a className="a-login-button-desktop" href="/login">
                <ButtonComponent>Log In</ButtonComponent>
              </a>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
