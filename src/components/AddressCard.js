import { Card } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import './style.css'


const Addresscard = ({Title, Address}) => {
    return (
      <Card
        variant="outlined"
        sx={{ backgroundColor: "#f4f5ff", padding: "3rem 3rem" , borderRadius:'10px',margin:'1rem 0rem'}}
      >
        <div className="multi_heading_remove">
          <div>
            <h5>{Title}</h5>
          </div>
          <div style={{display:"flex"}}>
              <h6 style={{fontWeight:"400", marginTop:'2px', marginRight:'2px'}}>Remove</h6>
              <ClearIcon/>
          </div>
        </div>
        <div className="multi_address_section">
          <p>
              {Address}
          </p>
        </div>
      </Card>
    );
  };

  export default Addresscard