// import { Button } from "@mui/material/Button"
import './style.css'

const CustomButton =({name, handleclick, style}) =>{
  console.log('style',style)
    return(
    <div className="Place_order_btn" style={style}>
    <button  onClick={handleclick} placeholder="Place order">{name}</button>
  </div>)
}

export default CustomButton