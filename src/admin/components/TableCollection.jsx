import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import {
  deleteCollection,
  getAllCollections,
} from "../../redux/apiCall/collectionCall";
import ButtonComponent from "../../components/ButtonComponent";

const TableCollection = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collection.collections);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCollection(id)).then(() => {
          dispatch(getAllCollections());
        });
      }
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "collectionName", headerName: "Collection Name", width: 200 },
    {
      field: "collectionDescription",
      headerName: "Collection Description",
      width: 200,
    },

    {
      field: "image",
      headerName: "image",
      width: 200,
      renderCell: (params) => (
        <div>
          <img
            src={params.row.collectionImage}
            width={100}
            height={100}
            alt={params.row.collectionName}
          />
        </div>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div>
          <Link
            to={`/admin/admin-edit-collections`}
            state={{
              collectionId: params.row.id,
              collectionName: params.row.collectionName,
              collectionDescription: params.row.collectionDescription,
            }}
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
            onClick={() => handleDelete(params.row._id)}
            style={{ borderRadius: "5px" }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const rows = collections.map((collection) => ({
    ...collection,
    id: collection._id,
  }));

  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  return (
    <div style={{ height: 400, width: "100%", margin: "10px" }}>
      <div className="d-flex justify-content-end mb-3">
        <Link to={"/admin/addcollection"}>
          <ButtonComponent type="submit">Add New Collection</ButtonComponent>
        </Link>
      </div>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowHeight={100} />
    </div>
  );
};

export default TableCollection;
