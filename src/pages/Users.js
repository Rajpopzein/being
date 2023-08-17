// import { Card } from "@mui/material";
// import "../pages/user.css";
// import "../components/style.css";
// import SearchIcon from "@mui/icons-material/Search";
// import cardimg from "../resource/Web - Menu/posts_1.png";
// import Dropdownlist from "../components/DropDownlist";
// import UserCards from "../components/UserCards";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getAlluser } from "../redux/slice/AlluserSlice";
// import Grid from "@mui/material/Grid";

// const Users = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAlluser());
//   }, []);

//   const userdata = useSelector((state) => state.Alluser);
//   console.log("alluser", userdata);
//   return (
//     <div style={{ paddingLeft: "32px" }}>
//       <h2>Users</h2>
//       <Card
//         className="userCards"
//         sx={{ width: "600px", position: "relative" }}
//         elevation={0}
//       >
//         <img
//           src={cardimg}
//           alt="cardimg"
//           style={{ width: "500px", position: "relative" }}
//         />
//         <div className="card-details-user">
//           <h4>Total User</h4>
//           <h4>12</h4>
//         </div>
//       </Card>
//       <div className="search">
//         <div className="search_filter_section seachfilter-user">
//           <div className="search_filter">
//             <input
//               type="text"
//               placeholder="Search"
//               style={{
//                 width: "40%",
//                 padding: "20px 39px",
//                 borderRadius: "50px",
//                 backgroundColor: "#f4f3f5",
//                 border: "0px",
//                 position: "relative",
//                 marginLeft: "20px",
//               }}
//             ></input>
//             <SearchIcon
//               style={{
//                 position: "absolute",
//                 left: "35%",
//                 top: "17px",
//                 fontSize: "32px",
//               }}
//             />
//           </div>
//         </div>
//         <div style={{ width: "15%", marginTop: "3%" }}>
//           <Dropdownlist />
//         </div>
//       </div>

//       {/* user card container */}
//       <div className="userscardsections">
//         <Grid
//           container
//           rowSpacing={2}
//           columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 'auto'}}
//         >
//           {userdata?.data?.data.map((user) => {
//             const fullname = user.firstname + user.lastname;
//             const location = user.city + "," + user.country;
//             return (
//               <Grid item xs={12} lg={3} id={user.id}>
//                 <div style={{width:'100%'}}>
//                   <UserCards
//                     name={fullname}
//                     location={location}
//                     images={user.profile_pic}
//                   />
//                 </div>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </div>
//     </div>
//   );
// };

// export default Users;
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
import Dropdownlist from "../components/DropDownlist";;


const ITEMS_PER_PAGE = 12; // Number of items to display per page

const UserGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAlluser());
  }, []);

  const userdata = useSelector((state) => state.Alluser);

  // Calculate pagination information
  const totalItems = userdata?.data?.data.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToDisplay = userdata?.data?.data.slice(startIndex, endIndex);

  console.log("item",itemsToDisplay)

  // Function to handle page navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
        <div style={{ width: "15%", marginTop: "3%" }}>
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
                />
              </div>
            </Grid>
          );
        })}
      </Grid>

      {/* Pagination controls */}
      <div style={{marginTop:'20px'}}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default UserGrid;

