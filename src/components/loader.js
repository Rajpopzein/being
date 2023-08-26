import { BoxLoading, WindMillLoading } from 'react-loadingg';
import { Placeholder } from 'rsuite';
import Loader from 'rsuite/Loader'; 
import CircularProgress from '@mui/material/CircularProgress';



const Loaders = ()=>{
    return(
        
        <CircularProgress disableShrink  sx={{width:'100%', height:'100%'}}/>
      
    )

}

export default Loaders