// import React, { useEffect } from 'react';
// import jwt_decode from 'jsonwebtoken';


// function AccessTokencheck() {
//   useEffect(() => {
//     // Assuming `token` is the token you want to check
//     const token = localStorage.getItem('accessToken'); // Get the token from storage

//     if (token) {
//       try {
//         const decodedToken = jwt_decode(token);

//         // Check if the token has an 'exp' (expiration) claim
//         if (decodedToken.exp) {
//           // Get the current timestamp in seconds
//           const currentTimestamp = Math.floor(Date.now() / 1000);

//           if (decodedToken.exp < currentTimestamp) {
//             console.log('Token has expired');
//           } else {
//             console.log('Token is still valid');
//           }
//         } else {
//           console.log('Token does not have an expiration claim');
//         }
//       } catch (error) {
//         console.error('Error decoding the token:', error);
//       }
//     } else {
//       console.log('Token not found in storage');
//     }
//   }, []);

//   return (
//     <div className="App">
      
//     </div>
//   );
// }

// export default AccessTokencheck;
