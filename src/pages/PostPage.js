import PersistentDrawerLeft from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { selecterchange } from "../redux/slice/pageselectionSlice";
import { useEffect, useState } from "react";
import OrderCard from "../components/OrederCard";
import card1 from "../resource/Web - Menu/posts_1.png";
import card2 from "../resource/Web - Menu/posts_2.png";
import card3 from "../resource/Web - Menu/posts_3.png";
import card4 from "../resource/Web - Menu/posts_4.png";
import "../pages/orderstyle.css";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getallpost } from "../redux/slice/GetAllpost";
import { useNavigate } from "react-router-dom";
import { fetchuser } from "../redux/slice/api_Slice";
import { Formik } from "formik";

const PostPage = () => {
  const [rows, setRow] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(selecterchange(2));
    dispatch(getallpost());

    dispatch(fetchuser());
  }, []);
  const carddata = useSelector((state) => state.dashapi?.userdata);
  console.log("tree", carddata);
  useEffect(() => {}, [rows]);

  const tabledatas = useSelector((state) => state?.getpostapi);
  console.log("tbldata", tabledatas);
  let counts = 1;

  useEffect(() => {
    if (tabledatas.status === "idle" && tabledatas.data != null) {
      const updatedRows = [];
      for (const dl of tabledatas.data) {
        const date = new Date(dl.created_at);
        const fulldate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        counts += 1;
        const dts = { ...dl, id: counts, created_at: fulldate, action: counts };
        updatedRows.push(dts);
      }
      if (tabledatas?.data.length !== rows.length) {
        setRow([...rows, ...updatedRows]);
      }
    }
  }, [tabledatas]);

  const columns = [
    { field: "created_at", headerName: "Date", width: 120 },
    { field: "pet_name", headerName: "Pet name", width: 160 },
    { field: "category_name", headerName: "Category", width: 160 },
    {
      field: "breed",
      headerName: "Breed",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
      sortable: true,
      width: 180,
    },
    {
      field: "name",
      headerName: "User",
      sortable: true,
      width: 180,
    },
    {
      field: "location",
      headerName: "Location",
      sortable: true,
      width: 290,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      width: 120,
    },
    {
      field: "action",
      headerName: "action",
      renderCell: (params) => <Actionbutton data={params.row} />,
    },
  ];

  const funcchangepage = (data) => {
    navigate("/viewpost", { state: data });
  };

  const Actionbutton = ({ data }) => {
    return <MoreHorizIcon onClick={() => funcchangepage(data)} />;
  };

  return (
    <PersistentDrawerLeft>
      <div style={{ padding: "2rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Post page</h3>
        <div className="postcards">
          <div className="imagescarddetails">
            <img src={card1} alt="card1" />
            <div className="imageText">
              <p>Total Post</p>
              <p>{carddata?.petCount}</p>
            </div>
          </div>
          <div className="imagescarddetails">
            <img src={card2} alt="card1" />
            <div className="imageText">
              <p>Approved</p>
              <p>{carddata?.petApprovedCount}</p>
            </div>
          </div>
          <div className="imagescarddetails">
            <img src={card3} alt="card1" />
            <div className="imageText">
              <p>Rejected</p>
              <p>{carddata?.petRejectedCount}</p>
            </div>
          </div>
          <div className="imagescarddetails">
            <img src={card4} alt="card1" />
            <div className="imageText">
              <p>Pending</p>
              <p>0</p>
            </div>
          </div>
        </div>
        <div>
          <div className="search_filter_section">
            <div className="search_filter">
              <input
                type="text"
                placeholder="Search"
                style={{
                  width: "40%",
                  padding: "20px 39px",
                  borderRadius: "50px",
                  backgroundColor: "#f4f3f5",
                  border: "0px",
                  position: "relative",
                  marginLeft: "10px",
                }}
                // onChange={(e) => hanlde_filter(e, value)}
              ></input>
              <SearchIcon
                style={{
                  position: "absolute",
                  left: "35%",
                  top: "17px",
                  fontSize: "32px",
                }}
              />
            </div>
            <div className="Place_order_btn" >
              <button placeholder="Place order" onClick={()=>{navigate('/addpost')}}>Add a new</button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "2rem", width:"100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            onRowClick={(params) => funcchangepage(params.row)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </PersistentDrawerLeft>
  );
};

export default PostPage;
