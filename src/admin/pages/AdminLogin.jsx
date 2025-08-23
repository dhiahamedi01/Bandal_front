import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminAuthLogin } from "../../redux/apiCall/authAdminCall";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent";
import React from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import Logo from '../../assets/log.png';
import adminLogo from '../../assets/adminLog.jpg'
// const AdminLogin = () => {
  // const dispatch = useDispatch();
  // const admin = useSelector((state) => state.admin.admin);
  // const error = useSelector((state) => state.admin.error);

  // const navigate = useNavigate(); // Access the navigate function

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   dispatch(AdminAuthLogin({ username, password }))
  //     .then((data) => {
  //       console.log(data, "dataa");
  //       if (data) {
  //         navigate("/admin");
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

//   return (
//     <div className="container d-flex align-items-center justify-content-center vh-100">
//       <div className="card w-60">
//         <div className="card-body">
//           <h2 className="card-title text-center">Login</h2>
//           <form>
//             <div className="form-group">
//               <label htmlFor="username">Username:</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="form-control "
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password:</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="form-control"
//                 required
//               />
//             </div>
//             <button
//               type="button"
//               onClick={handleLogin}
//               className="btn btn-primary btn-block"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


const AdminLogin = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.admin);
  const error = useSelector((state) => state.admin.error);

  const navigate = useNavigate(); // Access the navigate function

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(AdminAuthLogin({ username, password }))
      .then((data) => {
        // console.log(data, "dataa");
        if (data) {
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <MDBContainer className="my-5 margin-zero-auto">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="3">
            <MDBCardImage
              src={adminLogo}
              alt="login form"
              className="rounded-start  w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <img alt="logo" className="logo" src={Logo} width={328} height={58}/>
                
              </div>

              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>

              <MDBInput
                wrapperClass="mb-4"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="username"
                id="formControlLg"
                type="text"
                required
                size="sm"
                className="input-input-input"
              />
              <MDBInput
                wrapperClass="mb-4"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                id="formControlLg"
                type="password"
                className="input-input-input"
                size="sm"
                required
              />

              <ButtonComponent
                type="button"
                onClick={handleLogin}
                className="btn btn-primary btn-block"
              >
                Login
              </ButtonComponent>

            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};


export default AdminLogin;
