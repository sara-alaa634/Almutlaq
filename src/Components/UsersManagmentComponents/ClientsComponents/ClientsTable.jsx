import { useState, useEffect } from "react";
import "../../../Assets/Css/usersManagment.css";
import { useTranslation } from "react-i18next";
import Button from "../../SharedComponents/Buttons/Button";
import FilterDropdown from "../../SharedComponents/Buttons/FilterDropdown";
import ExportButton from "../../SharedComponents/Buttons/ExportButton";
import { clientStatus, userStatus } from "../../../helpers/constants";
import { usePagination } from "../../../Hooks/usePagination";
import Pagination from "../../SharedComponents/Pagination";
import LogoLoader from "../../../helpers/loader";
import ClientsSingleTable from "./ClientsSingleTable";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const ClientsTable = ({
  fetchFilteredUsersPage,
  fetchFilteredUsers,
  removeUser,
  switchUserState,
}) => {
  const { t } = useTranslation();
  const [selectClientStatus, setClientStatus] = useState("");
  const [selectUserStatus, setSelectedUserStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [exportData, setExportData] = useState([]);
  const [exportLoading, setExportLoading] = useState(false);
  const {
    handlePagination,
    currentPage,
    setCurrentPage,
    paginationData,
    setPaginationData,
    totalPagesNumber,
  } = usePagination();
  // this part handle the table permissions
  const { hasPermission } = useHasPermission();
  const hasDeletePermission = hasPermission(permissionsNames.users.delete);
  const hasEditPermission = hasPermission(permissionsNames.users.edit);
  const hasCreatePermission = hasPermission(permissionsNames.users.create);
  const hasViewPermission = hasPermission(permissionsNames.users.view);
  const hasViewChatPermission = hasPermission(permissionsNames.chat.view);

  useEffect(() => {
    if (selectUserStatus === "" && selectClientStatus === "") {
      setCurrentPage(1);
      fetchFilterdData(1);
    } else {
      fetchFilterdData(currentPage);
    }
  }, [selectClientStatus, selectUserStatus]);

  const fetchFilterdData = async (page, paginationState = false) => {
    setLoading(true);
    const isUserStatusApplied =
      selectUserStatus && selectUserStatus.value !== "";
    const isClientStateApplied =
      selectClientStatus && selectClientStatus.value !== "";
    if (
      page !== 1 &&
      (isUserStatusApplied || isClientStateApplied) &&
      !paginationState
    ) {
      page = 1;
      setCurrentPage(1);
    }

    const filterValue = {
      page: page,
      user_type: "client",
      is_deleted: isClientStateApplied ? selectClientStatus.value : null,
      user_status: isUserStatusApplied ? selectUserStatus.value : null,
    };

    await handlePagination(fetchFilteredUsersPage, filterValue);
    setLoading(false);
  };

  // Reset pagination and fetch data when filter changes
  const handleDropdownChange = (setter, item) => {
    setter(item.value === "all" ? null : item);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPagesNumber) {
      setCurrentPage(pageNumber);
      fetchFilterdData(pageNumber, true);
    }
  };

  const handleExport = async () => {
    setExportLoading(true);
    const exportData = await fetchFilteredUsers("client");
    const processedExportData = exportData.map((item) => ({
      [t("user_ID")]: item.id,
      [t("user_name")]: item.name,
      [t("email")]: item.email,
      [t("address")]: item.address,
      [t("client_state")]:
        item.status === "ongoing" ? t("ongoing") : t("ended"),
      [t("state")]: item.user_status ? t("active") : t("inactive"),
      [t("phone")]: item.phone,
      [t("cases_count")]: item.legal_cases_count,
    }));
    setExportData(processedExportData);
    setExportLoading(false);
  };
  return (
    <div className="card-body">
      {exportLoading && <LogoLoader loading={exportLoading} />}
      <section className="interact-btns d-flex flex-wrap gap-4 align-items-center">
        {hasCreatePermission && (
          <Button
            customClass="btn-h48-s15 btn-lg"
            value={t("create_client")}
            icon="FiPlus"
            iconClass="l-d-clr"
            buttonType="create"
            type="link"
            href="/users/create-user"
          />
        )}
        <FilterDropdown
          customClass="btn-h48-s15 btn-lg"
          value={t("Customer_status")}
          data={clientStatus}
          onSelect={(item) => handleDropdownChange(setClientStatus, item)}
        />
        <FilterDropdown
          customClass="btn-h48-s15 btn-lg"
          value={t("User_Status")}
          data={userStatus}
          onSelect={(item) => handleDropdownChange(setSelectedUserStatus, item)}
        />
        <ExportButton
          customClass="btn-h48-s15 btn-lg"
          value={t("Excel_version")}
          onClick={handleExport}
          data={exportData}
          fileName="Users"
        />
      </section>
      <section className="table-wrapper mt-4">
        <div className="table-responsive-xl">
          <ClientsSingleTable
            paginationData={paginationData}
            setPaginationData={setPaginationData}
            hasViewChatPermission={hasViewChatPermission}
            hasViewPermission={hasViewPermission}
            hasEditPermission={hasEditPermission}
            hasDeletePermission={hasDeletePermission}
            onDelete={removeUser}
            switchUserState={switchUserState}
            loading={loading}
            currentPage={currentPage}
            onChange={handlePageChange}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPagesNumber}
            handlePageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
};

export default ClientsTable;
