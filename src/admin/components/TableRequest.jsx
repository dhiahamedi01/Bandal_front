import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import swal from "sweetalert";

const TableRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Récupérer toutes les requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://bandali-back.vercel.app/api/requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Erreur lors de la récupération :", err);
      swal("Erreur", "Impossible de récupérer les requests", "error");
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une request
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this request!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`https://bandali-back.vercel.app/api/requests/${id}`);
          swal("Deleted!", "The request has been deleted.", "success");
          setRequests((prev) => prev.filter((req) => req._id !== id)); // supprime localement pour éviter un fetch complet
        } catch (err) {
          console.error("Erreur lors de la suppression :", err);
          swal("Erreur", "Impossible de supprimer la request", "error");
        }
      }
    });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <div>
          <img
            src={params.row.imageUrl}
            alt={params.row.title}
            width={100}
            height={100}
            style={{ objectFit: "cover", borderRadius: 5 }}
          />
        </div>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(params.row._id)}
          style={{ borderRadius: "5px" }}
        >
          Delete
        </button>
      ),
    },
  ];

  const rows = requests.map((req) => ({
    ...req,
    id: req._id,
  }));

  return (
    <div style={{ height: 500, width: "100%", margin: "10px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowHeight={120}
        loading={loading}
      />
    </div>
  );
};

export default TableRequest;
