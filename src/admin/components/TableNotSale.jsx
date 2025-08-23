import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotForSaleProduct,
  deleteNotForSaleProduct,
} from "../../redux/apiCall/notSaleCall";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ButtonComponent from "../../components/ButtonComponent";

const TableNotSale = () => {
  const dispatch = useDispatch();
  const { notProducts } = useSelector((state) => state.notProduct);
  // console.log(notProducts);

  const handleDelete = (id) => {
    // Display a confirmation dialog using sweetalert
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // If user confirms, dispatch the delete action and refresh the product list
        dispatch(deleteNotForSaleProduct(id)).then(() => {
          dispatch(getAllNotForSaleProduct());
        });
      }
    });
  };

  // Columns configuration for the data grid
  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "description", headerName: "Product Description", width: 250 },
    {
      field: "collectionName",
      headerName: "collection",
      width: 200,
      valueGetter: (params) => params.row.collectionId?.collectionName || "N/A",
    },
    {
      field: "image",
      headerName: "Image",
      width: 110,
      renderCell: (params) => (
        <div>
          <img
            src={params.row.image}
            width={100}
            height={100}
            alt={`Product ${params.row.name}`}
          />
        </div>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 160,
      renderCell: (params) => (
        <div>
          {/* Link to the edit page with product details */}
          <Link
            to={`/admin/editnotsale`}
            state={{
              productId: params.row.id,
              productName: params.row.name,
              productDescription: params.row.description,
              productcollectionId: params.row.collectionId,
            }}
          >
            <button
              className="btn btn-primary btn-sm"
              style={{ marginRight: "25px", borderRadius: "5px" }}
            >
              Edit
            </button>
          </Link>
          {/* Button to delete the product */}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(params.row.id)}
            style={{ borderRadius: "5px" }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Map the products array to include an 'id' property for each row
  const rows = notProducts.map((product) => ({
    ...product,
    id: product._id, // Set the id to a unique value, e.g., the product's _id
  }));

  // Fetch collections when the component mounts
  useEffect(() => {
    dispatch(getAllNotForSaleProduct());
  }, [dispatch]);

  return (
    <div style={{ height: 400, width: "100%", margin: "10px" }}>
      <div className="d-flex justify-content-end mb-3">
        {/* Link to the add product page */}
        <Link to={"/admin/addnotsale"}>
          <ButtonComponent type="submit">Add New Product</ButtonComponent>
        </Link>
      </div>
      {/* DataGrid component displaying the products */}
      <DataGrid rows={rows} columns={columns} pageSize={5} rowHeight={100} />
    </div>
  );
};

export default TableNotSale;
