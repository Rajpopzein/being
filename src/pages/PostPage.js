import PersistentDrawerLeft from "./Dashboard"
import { useDispatch } from "react-redux";
import { selecterchange } from "../redux/slice/pageselectionSlice";
import { useEffect } from "react";
const PostPage = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(selecterchange(2))
      },[])
    return(
        <PersistentDrawerLeft>
            <h1>Post page</h1>
        </PersistentDrawerLeft>
    )
}

export default PostPage