import { BoxLoading, WindMillLoading } from 'react-loadingg';
import { Placeholder } from 'rsuite';
import Loader from 'rsuite/Loader'; 



const Loaders = ()=>{
    return(
        <div style={{position:'absolute',top:'50%', left:'50%'}}>
        <BoxLoading/>
      </div>
    )

}

export default Loaders