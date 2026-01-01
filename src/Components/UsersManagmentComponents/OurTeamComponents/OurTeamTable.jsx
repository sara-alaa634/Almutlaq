import { useState, useEffect } from "react";
import "../../../Assets/Css/usersManagment.css";
import { useTranslation } from "react-i18next";
import Button from "../../SharedComponents/Buttons/Button";
import FilterDropdown from "../../SharedComponents/Buttons/FilterDropdown";
import ExportButton from "../../SharedComponents/Buttons/ExportButton";
import { userStatus } from "../../../helpers/constants";
import { usePagination } from "../../../Hooks/usePagination";
import Pagination from "../../SharedComponents/Pagination";
import LogoLoader from "../../../helpers/loader";
import OurTeamSingleTable from "./OurTeamSingleTable";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const OurTeamTable = ({
  fetchFilteredUsersPage,
  fetchFilteredUsers,
  removeUser,
}) => {
  const { t } = useTranslation();
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
  const hasViewPermission = hasPermission(permissionsNames.users.view);
  const hasViewChatPermission = hasPermission(permissionsNames.chat.view);

  useEffect(() => {
    if (selectUserStatus === "") {
      setCurrentPage(1);
      fetchFilterdData(1);
    } else {
      fetchFilterdData(currentPage);
    }
  }, [selectUserStatus]);

  const fetchFilterdData = async (page, paginationState = false) => {
    setLoading(true);
    const isUserStatusApplied =
      selectUserStatus && selectUserStatus.value !== "";

    if (page !== 1 && isUserStatusApplied && !paginationState) {
      page = 1;
      setCurrentPage(1);
    }

    const filterValue = {
      page: page,
      user_type: "work team",
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
    const exportData = await fetchFilteredUsers("work team");

    const processedExportData = exportData.map((item) => ({
      [t("user_ID")]: item.id,
      [t("user_name")]: item.name,
      [t("email")]: item.email,
      [t("address")]: item.address,
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
        <Button
          customClass="btn-h48-s15 btn-lg"
          value={t("Create_a_member")}
          icon="FiPlus"
          buttonType="create"
          type="link"
          typeAttribute="button"
          href="/users/create-user"
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
          fileName="Team"
        />
      </section>
      <section className="table-wrapper mt-4">
        <div className="table-responsive-xl">
          <OurTeamSingleTable
            paginationData={paginationData}
            setPaginationData={setPaginationData}
            hasViewChatPermission={hasViewChatPermission}
            hasViewPermission={hasViewPermission}
            hasEditPermission={hasEditPermission}
            hasDeletePermission={hasDeletePermission}
            currentPage={currentPage}
            onChange={handlePageChange}
            loading={loading}
            onDelete={removeUser}
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

export default OurTeamTable;
