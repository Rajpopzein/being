import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import React, { useState,useEffect } from 'react';
import { Grid } from '@mui/material';
import UserCards from '../components/UserCards'; // Import your UserCards component
import { useSelector, useDispatch } from 'react-redux';
import { getAlluser } from '../redux/slice/AlluserSlice';
import { Card } from "@mui/material";
import "../pages/user.css";
import "../components/style.css";
import SearchIcon from "@mui/icons-material/Search";
import cardimg from "../resource/Web - Menu/posts_1.png";
import Dropdownlist from "../components/DropDownlist";
import { useTheme } from "@mui/material/styles";
import { current } from '@reduxjs/toolkit';
import { IconButton } from "@mui/material";
import { sepuserdata } from "../redux/slice/UserDetailsslice";
import { selecterchange } from "../redux/slice/pageselectionSlice";

import PersistentDrawerLeft from "../pages/Dashboard"
import { useNavigate } from "react-router-dom";


const ITEMS_PER_PAGE = 8; // Number of items to display per page

const UserGrid = () => {

  const navigation = useNavigate()

  const Returnfun = () =>{
    const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAlluser());
    dispatch(selecterchange(5))
  }, []);

  const theme = useTheme()

  const userdata = useSelector((state) => state.Alluser);

  // Calculate pagination information
  const totalItems = userdata?.data?.data.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToDisplay = userdata?.data?.data.slice(startIndex, endIndex);

//   console.log("item",itemsToDisplay)

  // Function to handle page navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  let dd = null

  const handle_view_user = (udata) =>{
    console.log("ud",udata)
    dd = udata
    console.log("dd", dd)
    navigation("/userdetails",{state:udata})
  }

  return (
    <div style={{ paddingLeft: "32px" }}>
        <h2>Users</h2>
        <Card
        className="userCards"
        sx={{ width: "600px", position: "relative" }}
        elevation={0}
      >
        <img
          src={cardimg}
          alt="cardimg"
          style={{ width: "500px", position: "relative" }}
        />
        <div className="card-details-user">
          <h4>Total User</h4>
          <h4>12</h4>
        </div>
      </Card>
      <div className="search">
        <div className="search_filter_section seachfilter-user">
          <div className="search_filter">
            <input
              type="text"
              placeholder="Search"
              style={{
                width: "40%",
                padding: "20px 39px",
                borderRadius: "50px",
                backgroundColor: "#f4f3f5",
                border: "0px",
                position: "relative",
                marginLeft: "20px",
              }}
            ></input>
            <SearchIcon
              style={{
                position: "absolute",
                left: "35%",
                top: "17px",
                fontSize: "32px",
              }}
            />
          </div>
        </div>
        <div style={{ width: "15%", marginTop: "2%" }}>
          <Dropdownlist />
        </div>
      </div>
      <div className='userscardsections'>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 'auto' }}
      >
        {itemsToDisplay?.map((user) => {
          const fullname = user.firstname + ' ' + user.lastname;
          const location = user.city + ', ' + user.country;
          return (
            <Grid item xs={12} lg={3} key={user.id}>
              <div style={{ width: '100%' }}>
                <UserCards
                  name={fullname}
                  location={location}
                  images={user.profile_pic}
                  userid={user}
                  cardfun={handle_view_user}
                />
              </div>
            </Grid>
          );
        })}
      </Grid>

      {/* Pagination controls */}
      <div style={{marginTop:'20px', float:'left'}}>
      <IconButton
        onClick={()=>handlePageChange(currentPage -1)}
        disabled={currentPage === 1}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
        <span>Page {currentPage} of {totalPages}</span>
        <IconButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
      </div>
    </div>
    </div>
  );
  }

  return(
    <PersistentDrawerLeft>{<Returnfun/>}</PersistentDrawerLeft>
  )
  
};

export default UserGrid;

