import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  deleteCategory,
} from "../../redux/apiCall/categoryCall";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ButtonComponent from "../../components/ButtonComponent";

const TableCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(id)).then(() => {
          dispatch(getAllCategory());
        });
      }
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Category Name", width: 200 },
    {
      field: "image",
      headerName: "image",
      width: 200,
      renderCell: (params) => (
        <div>
          <img
            src={params.row.image}
            width={100}
            height={100}
            alt={params.row.name}
          />
        </div>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 220,
      renderCell: (params) => (
        <div>
          <Link
            to={`/admin/editcategory`}
            state={{ categoryId: params.row.id, categoryName: params.row.name }}
          >
            <button
              className="btn btn-primary btn-sm"
              style={{ marginRight: "25px", borderRadius: "5px" }}
            >
              Edit
            </button>
          </Link>
          <button
            className="btn btn-danger btn-sm"
            style={{ borderRadius: "5px" }}
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const rows = categories.map((category) => ({
    ...category,
    id: category._id,
  }));

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <div style={{ height: 400, width: "100%", margin: "10px" }}>
      <div className="d-flex justify-content-end mb-3">
        <Link to={"/admin/addcategory"}>
          <ButtonComponent type="submit">Add New Category</ButtonComponent>
        </Link>
      </div>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowHeight={100} />
    </div>
  );
};

export default TableCategory;
