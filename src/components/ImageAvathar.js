import React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageAvatar = ({ image ,onRemove}) => {
  const randomColor = Math.floor(Math.random() * 2) === 0 ? deepOrange[500] : deepPurple[500];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position:'relative' }}>
    <Avatar sx={{width:'120px', height:'120px',position:'relative'}} alt="Avatar">
      <img src={image} alt="Selected" style={{width:'100%', height:'100%'}}/>
    </Avatar>
    <IconButton sx={{position:'absolute', right:1, fontSize:'20px'}} onClick={onRemove} color="primary">
      <DeleteIcon />
    </IconButton>
  </div>
  );
};

export default ImageAvatar;