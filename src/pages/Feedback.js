import PersistentDrawerLeft from "./Dashboard"
import { useDispatch } from "react-redux";
import { selecterchange } from "../redux/slice/pageselectionSlice";
import { useEffect } from "react";

const Feedback = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(selecterchange(6))
      },[])
    return (

        <PersistentDrawerLeft>
            <h1>FeedBack</h1>
        </PersistentDrawerLeft>
    )
}

export default Feedback;