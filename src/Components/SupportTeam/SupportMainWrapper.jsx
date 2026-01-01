import React, { useEffect } from "react";
import Pagination from "../SharedComponents/Pagination";
import { usePagination } from "../../Hooks/usePagination";
import MessageCard from "./MessageCard";

const SupportMainWrapper = ({
  onFetch,
  onDelete,
  hasViewPermission,
  hasChatPermission,
  hasDeletePermission,
}) => {
  const {
    handlePagination,
    currentPage,
    setCurrentPage,
    paginationData,
    setPaginationData,
    totalPagesNumber,
  } = usePagination();

  useEffect(() => {
    fetchMessagesData(currentPage);
  }, [currentPage]);

  const fetchMessagesData = async (pageNumber) => {
    await handlePagination(onFetch, { page: pageNumber });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPagesNumber) {
      setCurrentPage(pageNumber);
      fetchMessagesData(pageNumber);
    }
  };
  return (
    <div>
      <div className="mb-md-5 mb-4">
        {paginationData
          ? paginationData.map((item, index) => (
              <MessageCard
                key={index}
                data={item}
                setData={setPaginationData}
                onDelete={onDelete}
                deletePermission={hasDeletePermission}
                viewPermission={hasViewPermission}
                chatPermission={hasChatPermission}
              />
            ))
          : null}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPagesNumber}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default SupportMainWrapper;