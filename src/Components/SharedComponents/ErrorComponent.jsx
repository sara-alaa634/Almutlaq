import React from "react";

const ErrorComponents = ({ error }) => {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center">
      <div className="row justify-content-center align-items-center w-100"  style={{ height: "100vh" }}>
        <div className="col-sm-12 col-md-10 col-lg-10 col-xl-6">
          <div className="card my-0 bg-transparent shadow-none">
            <img
              src={`${process.env.PUBLIC_URL}/Assets/Images/error-img.png`}
              alt=""
              className="w-100"
              style={{ height: "400px" }}
            />
            {error.message === "Network Error" ? (
              <div className="card-body pt-0 text-center text-danger text-capitalize fw-bold fs-4">
                error: ({error?.response?.data?.message || error.message}) ,
                please try to visit us later
              </div>
            ) : (
              <div className="card-body pt-0 text-center text-danger text-capitalize fs-4 fw-bold d-flex flex-column align-items-center justify-content-center gap-2 w-100">
                <div className="text-danger error-page-text">something went wrong in the request you made, error: </div>
                <div className="text-center error-page-text text-capitalize fw-bold text-danger mb-2">
                  {error?.response?.data?.message || error.message}
                  page
                </div>
                <a
                  href="/"
                  className="l-d-clr sc-1-bg rounded py-3 px-4 mt-4 text-capitalize"
                >
                  go Home
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponents;
