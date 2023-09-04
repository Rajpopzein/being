// import { Button } from "@mui/material/Button"
import './style.css'

const CustomButton =({name, handleclick, style, type, visiblity}) =>{

    return(
    <div className="Place_order_btn" >
    <button type={type} onClick={handleclick} style={style} placeholder="Place order" disabled={visiblity}>{name}</button>
  </div>)
}

export default CustomButton