import PersistentDrawerLeft from "./Dashboard";
import Arrowbutton from "../components/Arrowbutton";
import { useNavigate } from "react-router-dom";
import UserFormFormik from "../components/formic";
import { Card } from "@mui/material";
import { useLocation } from "react-router-dom";

const EditUser = () => {
  const location = useLocation();
  const userdata = location.state

  return (
    <PersistentDrawerLeft>
      <Arrowbutton navigation={"/users"} />
      <Card sx={{ padding: "2rem", margin: "1rem" }}>
        <UserFormFormik userdatas={userdata}/>
      </Card>
    </PersistentDrawerLeft>
  );
};

export default EditUser;
