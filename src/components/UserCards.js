
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

export default function UserCards({name,location,images,userdetails, cardfun}) {
 

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
    <Card sx={{ maxWidth: 345, borderRadius:'10px' }}>
      <CardMedia
        component="img"
        alt={name}
        height="180"
        image={`https://demo.emeetify.com:5016/${images}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button  size="small" onClick={()=> cardfun(userdetails)}>View</Button>
      </CardActions>
    </Card>
  );
}
