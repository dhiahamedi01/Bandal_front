import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, deleteProduct } from "../../redux/apiCall/productCall";
import { Link } from "react-router-dom";
import { productActions } from "../../redux/slice/productSlice";
import swal from "sweetalert";
import ButtonComponent from "../../components/ButtonComponent"

export default function TableAdmin() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProduct(id)).then(() => {
          dispatch(getAllProduct());
        });
      }
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", width: 110 },
    { field: "description", headerName: "Product Description", width: 150 },
    {
      field: "categoryName",
      headerName: "Category",
      width: 120,
      valueGetter: (params) => params.row.categoryId?.name || "N/A", // Use optional chaining and provide a default value
    },
    { field: "price", headerName: "Price", width: 110 },
    {
      field: "images",
      headerName: "Images",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.row.images && params.row.images.length > 0 ? (
            <img
              alt="product"
              src={params.row.images[0]} // première image
              width={100}
              height={100}
            />
          ) : (
            "No image"
          )}
        </div>
      ),
    },
    

    { field: "color", headerName: "Color", width: 130 },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <div>
          <Link
            to={`/admin/editproduct/`}
            state={{
              productId: params.row.id,
              productName: params.row.name,
              productDescription: params.row.description,
              productPrice: params.row.price,
              productCategoryId: params.row.categoryId,
              productColor: params.row.color,
            }}
          >
            {" "}
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
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Map the products array to include an 'id' property for each row

  const rows = products.map((product) => ({
    ...product,
    id: product._id, // Set the id to a unique value, e.g., the product's _id
  }));

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const productsCount = products.length;
  dispatch(productActions.setProductsCount(productsCount));

  return (
    <div style={{ height: 400, width: "100%", margin: "10px" }}>
      <div className="d-flex justify-content-end mb-3">
        <Link to={"/admin/addproduct"}>
          {" "}
          <ButtonComponent type="submit">
            Add New Product
          </ButtonComponent>
        </Link>
      </div>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowHeight={100} />
    </div>
  );
}
