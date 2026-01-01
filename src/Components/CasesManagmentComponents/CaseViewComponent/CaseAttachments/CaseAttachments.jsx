import { useState, useEffect } from "react";
import CaseAttachmentTable from "./CaseAttachmentsTable";
import Button from "../../../SharedComponents/Buttons/Button";
import Search from "../../../SharedComponents/Search";
import { useTranslation } from "react-i18next";
import CaseAttachmentsModal from "./CaseAttachmentsModal";
import useDebounce from "../../../../Hooks/useDebounce";
import { usePagination } from "../../../../Hooks/usePagination";
import { useCases } from "../../../../Hooks/useCases";
import Pagination from "../../../SharedComponents/Pagination";
import { useHasPermission } from "../../../../Hooks/usePermissions";
import { permissionsNames } from "../../../../helpers/constants";

const CaseAttachments = ({ caseID }) => {
  const {
    fetchCaseFiles,
    downloadSingleCaseFile,
    editCaseFileState,
    removeCaseFile,
  } = useCases();
  const {
    handlePagination,
    currentPage,
    setCurrentPage,
    paginationData,
    setPaginationData,
    totalPagesNumber,
  } = usePagination();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);
  const { hasPermission } = useHasPermission();
  const hasViewPermission = hasPermission(permissionsNames.cases.view);
  const hasCreatePermission = hasPermission(permissionsNames.cases.create);
  const hasEditPermission = hasPermission(permissionsNames.cases.edit);
  const hasDeletePermission = hasPermission(permissionsNames.cases.delete);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setCurrentPage(1);
      fetchFilterdData(1);
    } else {
      fetchFilterdData(currentPage);
    }
  }, [debouncedSearchTerm]);

  const fetchFilterdData = async (page, paginationState = false) => {
    setLoading(true);
    const isSearchApplied =
      debouncedSearchTerm && debouncedSearchTerm.trim() !== "";

    if (page !== 1 && isSearchApplied && !paginationState) {
      page = 1;
      setCurrentPage(1);
    }

    const filterValue = {
      page: page,
      case_id: caseID,
      search: isSearchApplied ? debouncedSearchTerm.trim() : null,
    };
    await handlePagination(fetchCaseFiles, filterValue);
    setLoading(false);
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

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <div className="card">
      <div className="card-body">
        <section className="d-flex flex-wrap gap-4 align-items-center">
          {hasCreatePermission ? (
            <Button
              customClass="btn-h48-s15 btn-lg"
              value={t("new_attachment")}
              icon="FiPlus"
              buttonType="create"
              type="button"
              onClick={handleShow}
            />
          ) : null}

          <Search
            onChange={(e) => {
              handleSearch(e);
            }}
            value={searchTerm || ""}
          />
          <CaseAttachmentsModal
            caseID={caseID}
            show={showModal}
            onHide={handleClose}
            setData={setPaginationData}
          />
        </section>
        <section className="table-wrapper mt-4">
          <div className="table-responsive-xl">
            <CaseAttachmentTable
              caseID={caseID}
              paginationData={paginationData}
              setPaginationData={setPaginationData}
              onUpdate={editCaseFileState}
              onDelete={removeCaseFile}
              download={downloadSingleCaseFile}
              hasEditPermission={hasEditPermission}
              hasDeletePermission={hasDeletePermission}
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
    </div>
  );
};

export default CaseAttachments;
