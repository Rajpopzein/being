import React from 'react'

function NavItem({img, Title}) {
  return (
    <div style={{display:'flex', marginTop:'8px',cursor:'pointer'}}>
        <img src={img} alt="img icons"  style={{width:'25px',height:'25px', marginRight:'5px'}}/>
        <h5 style={{color:"#000"}}>{Title}</h5>
    </div>
  )
}

export default NavItem