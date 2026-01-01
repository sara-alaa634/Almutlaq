import React from 'react';
import '../Assets/Css/Style.css'; // Create a separate CSS file for styling
import {BeatLoader}  from "react-spinners";

const LogoLoader = ({loading,color="var(--sc-1)"}) => {
    const override = {
        display: "block",
        margin: "0 auto",
      };
    return (
  
   <>
    {
         loading?
         (
             <div className="overlay d-flex align-items-center justify-content-center">
                 <div className="loader-container text-center">
                 <img 
                 className='loader-logo mb-4'
                     src={process.env.PUBLIC_URL + "/login-logo.svg"} 
                     alt="Logo" 
                 />
                     <BeatLoader 
                     color={color}
                     loading={loading}
                     cssOverride={override}
                     size={20}
                     speedMultiplier={0.4} // Decrease this value to slow down the loader
                     aria-label="Loading Spinner"
                     data-testid="loader"
                 />
                 </div>
           </div>
         ):""
    }
   </>
  
 
)};

export default LogoLoader;
