import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {  getAllUser } from "../../redux/apiCall/userCall";

const TableUser = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllUser());
    };

    fetchData();
  }, [dispatch]);

  // const handleDelete = async (id) => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this Product!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then(async (willDelete) => {
  //     if (willDelete) {
  //       await dispatch(deleteUser(id));
  //       dispatch(getAllUser());
  //     }
  //   });
  // };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 110 },
    { field: "lastName", headerName: "LastName", width: 150 },
    { field: "email", headerName: "email", width: 150 },
    { field: "username", headerName: "username", width: 150 },

    { field: "phone", headerName: "Number", width: 110 },
    {
      field: "image",
      headerName: "image",
      width: 110,
      renderCell: (params) => (
        <div>
          <img
            src={params.row.userImage}
            width={100}
            height={100}
            alt="user avatar"
          />
        </div>
      ),
    },

    // {
    //   field: "Action",
    //   headerName: "Action",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   renderCell: (params) => (
    //     <div>
    //       <button
    //         className="btn btn-danger btn-sm"
    //         style={{ borderRadius: "5px" }}
    //         onClick={() => handleDelete(params.row._id)}
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  //   Map the products array to include an 'id' property for each row

  const rows = users.map((user) => ({
    ...user,
    id: user._id, // Set the id to a unique value, e.g., the product's _id
  }));

  return (
    <div style={{ height: 400, width: "100%", margin: "10px" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowHeight={100} />
    </div>
  );
};

export default TableUser;
