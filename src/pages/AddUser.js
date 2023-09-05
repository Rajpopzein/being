import { Avatar, Card, Badge } from "@mui/material";
import Arrowbutton from "../components/Arrowbutton";
import PersistentDrawerLeft from "./Dashboard";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './Adduser.css'
import UserForm from "../components/userForm";
import UserFormFormik  from "../components/formic";


const AddUser = () => {

  return (
    <PersistentDrawerLeft>
      <Arrowbutton navigation={"/users"} />
      <h2>Add User</h2>
      <Card sx={{ padding: "3rem" }} className="cardborder">
        {/* <UserForm/> */}
        <UserFormFormik/>
      </Card>
    </PersistentDrawerLeft>
  );
};

export default AddUser;
