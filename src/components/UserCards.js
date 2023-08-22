
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { selecterchange } from '../redux/slice/pageselectionSlice';
import { useEffect } from 'react';
import { Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './style.css'

export default function UserCards({name,location,images,userid, cardfun}) {
 

  const dispatch = useDispatch()
  
  const pageSelectionHandler = (dispatch, value) => {
    
    dispatch(selecterchange(value));
  };

  const handlechnges = () => {
    console.log("clicking")
    // pageSelectionHandler(dispatch, 7)
  }
  useEffect(()=>{},[])
  

  return (
    <Card sx={{ Width: 345, borderRadius:'10px', padding:'5px 15px' }}>
      <div className='imageandbtn'>
        <Avatar src={`https://demo.emeetify.com:5016/${images}`} alt={name} sx={{width:85, height: 85}}/>
        <MoreVertIcon onClick={()=>cardfun(userid)}/>
      </div>
      <CardContent>
        <Typography gutterBottom variant="p" sx={{fontSize:'20px'}} component="div">
            {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
      </CardContent>
    </Card>
  );
}
