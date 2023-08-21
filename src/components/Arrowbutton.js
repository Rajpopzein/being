import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './style.css'
import { useNavigate } from 'react-router-dom';

function Arrowbutton({navigation}) {
  const nav = useNavigate()

  const handleclick =()=>{
    nav(navigation)
  }

  return (
    <div className='arrowbutton' onClick={handleclick} style={{cursor:'pointer'}}>
        <ArrowBackIcon/>
        <h4>Back</h4>
    </div>
  )
}

export default Arrowbutton