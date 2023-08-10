import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import "../components/style.css";

const Avatars = () => {

    const imgdata = useSelector((state)=> state.userdetails?.datas?.profile_pic)
    console.log("image url", imgdata)
    return(
        <div>
            <AvatarGroup max={4} sx={{display:'grid', gridTemplateColumns:'auto auto', width:'2,5rem'}}>
                <Avatar sx={{width:'3rem', height:"3rem"}} src="https://demo.emeetify.com:5016/${imgdata}"/>
                <Avatar sx={{width:'3rem', height:"3rem"}} src="https://demo.emeetify.com:5016/${imgdata}"/>
                <Avatar sx={{width:'3rem', height:"3rem"}} src="https://demo.emeetify.com:5016/${imgdata}"/>
                <Avatar sx={{width:'3rem', height:"3rem"}} src="https://demo.emeetify.com:5016/${imgdata}"/>
                <Avatar sx={{width:'3rem', height:"3rem"}} src="https://demo.emeetify.com:5016/${imgdata}"/>
                <Avatar sx={{width:'3rem', height:"3rem"}} src="https://demo.emeetify.com:5016/${imgdata}"/>
             </AvatarGroup>
        </div>
    )
}

export default Avatars;