// import { Button } from "@mui/material/Button"
import './style.css'

const CustomButton =({name, handleclick, style, type}) =>{

    return(
    <div className="Place_order_btn" >
    <button type={type} onClick={handleclick} style={style} placeholder="Place order">{name}</button>
  </div>)
}

export default CustomButton