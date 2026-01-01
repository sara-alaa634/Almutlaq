import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../SharedComponents/Buttons/Button";
import Search from "../SharedComponents/Search";
import { IoIosClose } from "react-icons/io";
import "../../Assets/Css/postsManangemnt.css";
import PostsFilter from "../PostManagment/PostsFilterComponents/PostsFilter";
import PostCardsWrapper from "./PostCardsWrapper";
import useDebounce from "../../Hooks/useDebounce";
import Pagination from "../SharedComponents/Pagination";
import { usePagination } from "../../Hooks/usePagination";
import { useHasPermission } from "../../Hooks/usePermissions";
import { permissionsNames } from "../../helpers/constants";

const PostsLayout = ({ fetchPosts, fetchTags, addTag, removeTags }) => {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]); // tags filter
  const debouncedSearchTerm = useDebounce(searchInput, 2000);
  const {
    handlePagination,
    currentPage,
    setCurrentPage,
    paginationData,
    setPaginationData,
    totalPagesNumber,
  } = usePagination();
  const { hasPermission } = useHasPermission();
  const hasCreatePermission = hasPermission(permissionsNames.posts.create);
 
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "" && selectedFilters.length === 0) {
      setCurrentPage(1);
      fetchFilterdData(1);
    } else {
      fetchFilterdData(currentPage);
    }
  }, [debouncedSearchTerm, selectedFilters]);

  const fetchFilterdData = async (page, paginationState = false) => {
    setLoading(true);
    let filteredTagsName = [];
    const isSearchApplied =
      debouncedSearchTerm && debouncedSearchTerm.trim() !== "";
    const isTagApplied = selectedFilters.length !== 0;

    if (
      (page !== 1 && isSearchApplied && !paginationState) ||
      (page !== 1 && isTagApplied && !paginationState)
    ) {
      page = 1;
      setCurrentPage(1);
    }
    // to get only the name of each tag for the request
    if (isTagApplied) {
      filteredTagsName = selectedFilters.map((item) => item.name);
    }
    const filterValue = {
      page: page,
      search: isSearchApplied ? debouncedSearchTerm.trim() : null,
      tags: isTagApplied ? filteredTagsName : null,
    };

    await handlePagination(fetchPosts, filterValue);
    setLoading(false);
  };

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchInput(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPagesNumber) {
      setCurrentPage(pageNumber);
      fetchFilterdData(pageNumber, true);
    }
  };

  const handleTagFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };

  // Function to remove individual tag filter
  const handleRemoveTagFilter = (filterId) => {
    const updatedFilters = selectedFilters.filter(
      (filter) => filter.id !== filterId
    );
    setSelectedFilters(updatedFilters);
  };

  return (
    <div className="row">
      <div className="col-12  col-md-7 col-lg-7 col-xl-8 ">
        <div className="d-flex flex-wrap gap-4 align-items-center">
          {hasCreatePermission ? (
            <Button
              customClass="btn-h48-s15 btn-lg"
              value={t("post")}
              icon="FiPlus"
              buttonType="create"
              type="link"
              href="/create-post"
            />
          ) : null}
          <Search
            customInputClass="bg-transparent"
            customButtonClass="bg-transparent"
            onChange={(e) => {
              handleSearch(e);
            }}
            value={searchInput || ""}
            dir="ltr"
            placeholder="search"
          />
        </div>
        {/* Display filters */}
        {selectedFilters.length > 0 && (
          <div className="filters-list mt-3 p-2 d-flex flex-wrap align-items-center gap-3">
            {selectedFilters.map((filter) => (
              <div
                key={filter.id}
                className="filter-tag py-1 px-2 fw-medium rounded d-flex gap-2 align-items-center justify-content-between text-capitalize"
              >
                {filter.name}
                <span
                  className="close-icon cusrsor-pointer"
                  onClick={() => handleRemoveTagFilter(filter.id)}
                >
                  <IoIosClose className="mc-1-clr fw-bold fs-4" />
                </span>
              </div>
            ))}
          </div>
        )}

        <PostCardsWrapper
          posts={paginationData}
          setPosts={setPaginationData}
          loading={loading}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPagesNumber}
          handlePageChange={handlePageChange}
        />
      </div>

      <div className="col-12 col-md-5 col-lg-5 col-xl-4 ">
        <PostsFilter
          onFilterChange={handleTagFiltersChange}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          fetchTags={fetchTags}
          addTag={addTag}
          removeTags={removeTags}
        />
      </div>
    </div>
  );
};

export default PostsLayout;
