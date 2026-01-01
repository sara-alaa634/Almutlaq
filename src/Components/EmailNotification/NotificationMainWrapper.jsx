import React, { useEffect, useState } from "react";
import NotificationForm from "./NotificationForm";
import NotificationSingleTable from "./NotificationSingleTable";
import Pagination from "../SharedComponents/Pagination";
import { usePagination } from "../../Hooks/usePagination";
import { useGeneral } from "../../Hooks/useGeneral";
import ErrorComponents from "../SharedComponents/ErrorComponent";
import LogoLoader from "../../helpers/loader";
import { useHasPermission } from "../../Hooks/usePermissions";
import { permissionsNames } from "../../helpers/constants";
const NotificationMainWrapper = () => {
  const [loadingData, setLoadingData] = useState(false);
  const {
    addNotification,
    fetchNotifications,
    removeNotification,
    loading,
    error,
  } = useGeneral();
  const {
    handlePagination,
    currentPage,
    setCurrentPage,
    paginationData,
    setPaginationData,
    totalPagesNumber,
  } = usePagination();
  const { hasPermission } = useHasPermission();
  const hasDeletePermission = hasPermission(
    permissionsNames.notifications.delete
  );
  const hasEditPermission = hasPermission(permissionsNames.notifications.edit);
  const hasAddPermission = hasPermission(permissionsNames.notifications.create);
  const hasViewPermission = hasPermission(permissionsNames.notifications.view);

  useEffect(() => {
    fetchNotificationsData(currentPage);
  }, [currentPage]);

  const fetchNotificationsData = async (pageNumber) => {
    setLoadingData(true);
    await handlePagination(fetchNotifications, { page: pageNumber });
    setLoadingData(false);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPagesNumber) {
      setCurrentPage(pageNumber);
      fetchNotificationsData(pageNumber);
    }
  };

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <div className="row">
      {loading && <LogoLoader loading={loading} />}

      {hasAddPermission && (
        <div className="col-12 col-md-8 col-lg-7 col-xl-4">
          <NotificationForm
            addNotification={addNotification}
            setPaginationData={setPaginationData}
          />
        </div>
      )}
      <div
        className={hasAddPermission ? "col-12 col-lg-12 col-xl-8 " : "col-12"}
      >
        <section className="table-wrapper mt-4">
          <div className="table-responsive-xxl">
            <NotificationSingleTable
              paginationData={paginationData}
              setPaginationData={setPaginationData}
              removeNotification={removeNotification}
              loading={loadingData}
              hasEditPermission={hasEditPermission}
              hasDeletePermission={hasDeletePermission}
              hasViewPermission={hasViewPermission}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPagesNumber}
              handlePageChange={handlePageChange}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotificationMainWrapper;
