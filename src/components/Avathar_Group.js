import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import "../components/style.css";

const Avatars = ({avadata}) => {

    // const imgdata = useSelector((state)=> state.userdetails?.datas?.profile_pic)
    // console.log("image url", imgdata)
    console.log('ava',avadata)
    let counter = 0
    return(
        <div>
            <AvatarGroup max={4} sx={{display:'grid', gridTemplateColumns:'auto auto', width:'2,5rem'}}>

                {
                    avadata != undefined && avadata.map((da)=>{
                        counter += 1
                        return(
                            <Avatar key={counter} sx={{width:'3rem', height:"3rem"}} src={`https://demo.emeetify.com:5016/${da.profile_pic}`}/>
                        )
                    })
                }
             </AvatarGroup>
        </div>
    )
}

export default Avatars;