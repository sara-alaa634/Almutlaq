import { useState } from "react";
import "../../../Assets/Css/usersManagment.css";
import { useTranslation } from "react-i18next";
import Pagination from "../../SharedComponents/Pagination";
const ViewRoles = ({ data }) => {
//   console.log("data role", data);
  const { t } = useTranslation();
  const validData = Array.isArray(data) ? data : [];

  const [currentPage, setCurrentPage] = useState(1); 
  const rowsPerPage = 10; 


  const totalPages = Math.ceil(validData.length / rowsPerPage);

  
  const currentData = validData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <section className="table-wrapper mt-lg-0 mt-md-5 mt-4 l-d-bg p-3 rounded">
      <div className="table-responsive-xl">
        <table className="table table-border">
          <thead>
            <tr>
              <th scope="col"> {t("Permissions names")}</th>
              <th scope="col">{t("Permissions")}</th>
            </tr>
          </thead>
          <tbody>
            {currentData && currentData.length > 0 ? (
              currentData.map((role) => (
                <tr key={role.id}>
                  <td className="mw-170px">{role.name}</td>
                  <td className="mw-230px">
                    <div className="d-flex flex-wrap align-items-center justify-content-start">
                      {role.permissions.length
                        ? role.permissions.map((permission, index) => (
                            <span className="me-2" key={index}>
                              {permission.name} ,
                            </span>
                          ))
                        : " - "}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  {t("no_data_available")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default ViewRoles;
