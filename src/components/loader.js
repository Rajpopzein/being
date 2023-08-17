import { BoxLoading, WindMillLoading } from 'react-loadingg';
import { Placeholder } from 'rsuite';
import Loader from 'rsuite/Loader'; 



const Loaders = ()=>{
    return(
        <div>
        <Placeholder.Paragraph rows={8} />
        <Loader center content="loading" />
      </div>
    )

}

export default Loaders