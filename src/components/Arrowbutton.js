import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Arrowbutton({ navigation }) {
  const nav = useNavigate();

  const handleclick = () => {
    nav(navigation);
  };

  return (
    <div
      className="arrowbutton"
      onClick={handleclick}
      style={{
        cursor: "pointer",
        // border: "1px solid ",
        padding:'5px',
        width: "8rem",
        marginBottom: "1.2rem",
        borderRadius: "20px",
        backgroundColor: "lightgray",
        
      }}
    >
      <div
        style={{
          display: "flex",
          margin: "10px",
          marginBottom: "-2px",
          marginLeft: "15px",
        }}
      >
        <ArrowBackIcon />
        <h4>Back</h4>
      </div>
    </div>
  );
}

export default Arrowbutton;
