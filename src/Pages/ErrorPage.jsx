import React from "react";

const ErrorPage = () => {
  return (
    <div
    className="container-fluid d-flex align-items-center justify-content-center"
  >
    <div className="row text-center align-items-center justify-content-center w-100"  style={{ height: "100vh" }}>
     
      <div className="col-8">
        <img
          src={`${process.env.PUBLIC_URL}/Assets/Images/notFound-img.png`}
          alt=""
          className="w-100" style={{height:'400px'}}
        />
      </div>
      <div className="col-12 mt-3">
        <div className="fw-bold fs-3 text-capitalize mb-4">This page not found</div>
      </div>
      <div className="col-12 mt-3">
        <a href="/" className="sc-1-bg l-d-clr fw-semibold fs-5 rounded px-4 py-3 mt-3">Go Home</a>
      </div>
    </div>
  </div>
  
  
  );
};

export default ErrorPage;
