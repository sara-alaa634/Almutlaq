import { useState } from "react";
import { Toast } from "../helpers/Toast";
import { useTranslation } from "react-i18next";
import { errorMessages } from "../helpers/messages";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [paginationData, setPaginationData] = useState([]);
  const [totalPagesNumber, setTotalPagesNumber] = useState(1);
  const [totalRowsNumber, setTotalRowsNumber] = useState(10);
  const [currentPageTotalRowsNumber, setCurrentPageTotalRowsNumber] =
    useState(10);
  const { t } = useTranslation();

  const handlePagination = async (apiCall, apiParams) => {
    try {
      const response = await apiCall(apiParams);

      // Check if `meta` exists in the response
      const { current_page, data, total, per_page, to } = response.meta
        ? {
            current_page: response.meta.current_page,
            data: response.data,
            total: response.meta.total,
            per_page: response.meta.per_page,
            to: response.meta.to,
          }
        : {
            current_page: response.current_page,
            data: response.data,
            total: response.total,
            per_page: response.per_page,
            to: response.to,
          };
      setCurrentPage(current_page);
      setRowsPerPage(per_page);
      setCurrentPageTotalRowsNumber(to);
      setTotalRowsNumber(total);
      setPaginationData(Array.isArray(data) ? data : []);
      setTotalPagesNumber(Math.ceil(total / per_page));
    } catch (error) {
      Toast("error", t(errorMessages.paginationErrorMessage));
    }
  };
  return {
    handlePagination,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    paginationData,
    setPaginationData,
    totalPagesNumber,
    setTotalPagesNumber,
    totalRowsNumber,
    setTotalRowsNumber,
    currentPageTotalRowsNumber,
    setCurrentPageTotalRowsNumber,
  };
};
