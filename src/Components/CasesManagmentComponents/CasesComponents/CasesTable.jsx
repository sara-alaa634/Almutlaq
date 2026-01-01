import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../SharedComponents/Buttons/Button";
import FilterDropdown from "../../SharedComponents/Buttons/FilterDropdown";
import ExportButton from "../../SharedComponents/Buttons/ExportButton";
import Search from "../../SharedComponents/Search";
import "../../../Assets/Css/CasesManagment.css";
import CasesSingleTable from "../CasesComponents/CasesSingleTable";
import { usePagination } from "../../../Hooks/usePagination";
import Pagination from "../../SharedComponents/Pagination";
import { caseTypeData, caseStatusData } from "../../../helpers/constants";
import useDebounce from "../../../Hooks/useDebounce";
import LogoLoader from "../../../helpers/loader";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const CasesTable = ({
  fetchCases,
  fetchFilteredCases,
  fetchExportCasesData,
  editCaseState,
  removeCase,
}) => {
  const { t } = useTranslation();
  const [selectedCaseType, setSelectedCaseType] = useState("");
  const [selectedCaseStatus, setSelectedCaseStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [exportData, setExportData] = useState([]);
  const [exportLoading, setExportLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);
  const {
    handlePagination,
    currentPage,
    setCurrentPage,
    paginationData,
    setPaginationData,
    totalPagesNumber,
  } = usePagination();
  const { hasPermission } = useHasPermission();
  const hasViewPermission = hasPermission(permissionsNames.cases.view);
  const hasCreatePermission = hasPermission(permissionsNames.cases.create);
  const hasEditPermission = hasPermission(permissionsNames.cases.edit);
  const hasDeletePermission = hasPermission(permissionsNames.cases.delete);

  useEffect(() => {
    if (
      debouncedSearchTerm.trim() === "" &&
      selectedCaseType === "" &&
      selectedCaseStatus === ""
    ) {
      setCurrentPage(1);
      fetchAllData(1);
    } else {
      fetchFilterdData(currentPage);
    }
  }, [debouncedSearchTerm, selectedCaseType, selectedCaseStatus]);

  const fetchAllData = async (page) => {
    setLoading(true);
    await handlePagination(fetchCases, { page: page });
    setLoading(false);
  };
  const fetchFilterdData = async (page, paginationState = false) => {
    setLoading(true);
    const isCaseTypeApplied = selectedCaseType && selectedCaseType.value !== "";
    const isCaseStatusApplied =
      selectedCaseStatus && selectedCaseStatus.value !== "";
    const isSearchApplied =
      debouncedSearchTerm && debouncedSearchTerm.trim() !== "";
    // this condtion help in handling the case of reset the seach if the search enterd and not asking for new page
    if (
      (page !== 1 && isSearchApplied && !paginationState) ||
      (page !== 1 &&
        (isCaseStatusApplied || isCaseTypeApplied) &&
        !paginationState)
    ) {
      page = 1;
      setCurrentPage(1);
    }

    const filterValue = {
      page: page,
      case_type: isCaseTypeApplied ? selectedCaseType.value : null,
      status: isCaseStatusApplied ? selectedCaseStatus.value : null,
      search: isSearchApplied ? debouncedSearchTerm.trim() : null,
    };

    await handlePagination(fetchFilteredCases, filterValue);
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

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchTerm(event.target.value);
  };

  const handleExport = async () => {
    setExportLoading(true);
    const exportData = await fetchExportCasesData();
    const processedExportData = exportData.map((item) => ({
      [t("case_ID")]: item.id,
      [t("case_name")]: item.title,
      [t("case_description")]: item.description,
      [t("the_client")]: item.client_name,
      [t("case_state")]: item.case_type === "1" ? t("ongoing") : t("ended"),
      [t("state")]: item.status ? t("active") : t("inactive"),
      [t("case_category")]: item.category_title,
      [t("case_sub_category")]: item.subcategory_title,
    }));
    setExportData(processedExportData);
    setExportLoading(false);
  };

  return (
    <div className="card-body">
      {exportLoading && <LogoLoader loading={exportLoading} />}
      <section className="interact-btns d-flex flex-wrap gap-4 align-items-center">
        {hasCreatePermission ? (
          <Button
            customClass="btn-h48-s15 btn-lg"
            value={t("create_case")}
            icon="FiPlus"
            buttonType="create"
            type="link"
            href="/cases/create-case"
          />
        ) : null}
        <FilterDropdown
          customClass="btn-h48-s15 btn-lg"
          value={t("case_status")}
          data={caseTypeData}
          onSelect={(item) => handleDropdownChange(setSelectedCaseType, item)}
        />
        <FilterDropdown
          customClass="btn-h48-s15 btn-lg"
          value={t("status")}
          data={caseStatusData}
          onSelect={(item) => handleDropdownChange(setSelectedCaseStatus, item)}
        />
        <ExportButton
          customClass="btn-h48-s15 btn-lg"
          value={t("Excel_version")}
          onClick={handleExport}
          data={exportData}
          fileName="Cases"
        />
        <Search
          onChange={(e) => {
            handleSearch(e);
          }}
          value={searchTerm || ""}
        />
      </section>
      <section className="table-wrapper mt-4">
        <div className="table-responsive-xl">
          <CasesSingleTable
            paginationData={paginationData}
            setPaginationData={setPaginationData}
            editCaseState={editCaseState}
            removeCase={removeCase}
            hasDeletePermission={hasDeletePermission}
            hasEditPermission={hasEditPermission}
            hasViewPermission={hasViewPermission}
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

export default CasesTable;
