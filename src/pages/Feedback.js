import PersistentDrawerLeft from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { selecterchange } from "../redux/slice/pageselectionSlice";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Card } from "@mui/material";
import { getFeedback } from "../redux/slice/FeedBackSlice";

const Feedback = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selecterchange(6));
    dispatch(getFeedback());
  }, []);

  const feeddata = useSelector((state) => state.feedback?.data?.data);

  return (
    <PersistentDrawerLeft>
      <h3 style={{ marginLeft: "1rem", marginBottom: "4rem" }}>FeedBack</h3>

      <div className="search">
        <div className="search_filter_section seachfilter-user">
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
                marginLeft: "5px",
              }}
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
        </div>
      </div>

      <Card sx={{ minWidth: 90, padding: "2rem", marginTop: "2rem" }}>
          {feeddata !== null &&
            feeddata?.map((data) => {
              const fullname = data.firstname + data.lastname;
              return (
                <Card sx={{ padding: "1rem", borderRadius: "10px", marginBottom:'1.5rem' }}>
                  <p style={{ float: "right" }}>{data?.created_at}</p>
                  <p>{fullname}</p>
                  <p>{data.comments}</p>
                  </Card>
              );
            })}
        
      </Card>
    </PersistentDrawerLeft>
  );
};

export default Feedback;
