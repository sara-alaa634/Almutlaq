import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../SharedComponents/Buttons/Button";
import { GoTrash } from "react-icons/go"; // Assuming you're using GoTrash icon
import { FaCheck } from "react-icons/fa6";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { usePosts } from "../../../Hooks/usePosts";

const PostsTags = ({ onFilterChange, selectedFilters, setSelectedFilters,fetchTags,addTag,removeTags }) => {
  const { t } = useTranslation();
  const [tags, setTags] = useState([]); // Tag list
  const [deleteMode, setDeleteMode] = useState(false); // Toggle delete mode
  const [softDeletedTags, setSoftDeletedTags] = useState([]);
  const [isCreateTag, setIsCreateTag] = useState(false);
  const [addedTag, setNewAddedTag] = useState("");
 const [validation,setValidation]=useState(false);

  // Fetch tags from API on component mount
  useEffect(() => {
    const handleFetchTags = async () => {
      // Simulating an API call
      const apiTags = await fetchTags();     
     //  console.log("tagsWithSelection: ",apiTags)
      setTags(apiTags);
    };

    handleFetchTags();
  }, []);

  const handleDeleteToggle =async () => {
    if (deleteMode && softDeletedTags.length > 0) {
      // Confirm deletion when toggling delete mode off
    //   console.log("Tags to delete:", softDeletedTags); 
        await removeTags(softDeletedTags);
      // Permanently remove the soft-deleted tags from the UI not from the database yet
      setTags((prevTags) =>
        prevTags.filter((tag) => !softDeletedTags.includes(tag.id))
      );
      setSoftDeletedTags([]); 
    }

    setDeleteMode(!deleteMode); 
  };

  const handleSoftDelete = (id) => {
    setSoftDeletedTags((prev) => [...prev, id]); // Add tag to soft-deleted list
  };

  const handleRestoreTag = (id) => {
    setSoftDeletedTags((prev) => prev.filter((tagId) => tagId !== id)); // Remove tag from soft-deleted list
  };

  const handleTagFilter = (tag) => {
    if (deleteMode) return;

    // Check if the tag is already a filter
    const isAlreadyFilter = selectedFilters.some(
      (filter) => filter.id === tag.id
    );

    if (isAlreadyFilter) {
      // Remove the tag from filters
      const updatedFilters = selectedFilters.filter(
        (filter) => filter.id !== tag.id
      );
      setSelectedFilters(updatedFilters);

      // Notify parent component about filter changes
      onFilterChange(updatedFilters);
    } else {
      // Add the tag to filters
      const updatedFilters = [...selectedFilters, tag];
      setSelectedFilters(updatedFilters);

      // Notify parent component about filter changes
      onFilterChange(updatedFilters);
    }
  };
  const handleCreateTag =async  (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if(isCreateTag){
      if( form.checkValidity() === false ||
      addedTag === ""){
        setValidation(true)
      }else{
        setValidation(false);
       //  console.log("addedTag: ",addedTag)
       const response= await addTag(addedTag);
       const updatedFilters = [...tags, response.data];
       setTags(updatedFilters);
      }
    }else{
      setIsCreateTag(!isCreateTag);
    }
   
  };

  return (
    <div className="my-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
        <h4 className="posts-filter-section-sub-header position-relative text-capitalize fw-semibold">
          {t("tags")}
        </h4>
        {
          isCreateTag?(
            <Button
            customClass="btn-h48-s15 btn-lg"
            value={t("save")}
            icon="FaCheck"
            buttonType="create"
            type="button"
            onClick={handleCreateTag}
          />
          ):(
            <Button
            customClass="btn-h48-s15 btn-lg"
            value={t("Create")}
            icon="FiPlus"
            buttonType="create"
            type="button"
            onClick={handleCreateTag}
          />
          )
        }
       
        <Button
          customClass="btn-h48-s15 btn-lg"
          icon={deleteMode ? "FaCheck" : "GoTrash"}
          buttonType="main"
          type="button"
          typeAttribute="submit"
          onClick={handleDeleteToggle}
        />
      </div>
         <Form.Group
          as={Col}
          md="12"
          className={`text-capitalize create-input-btn-clr create-btn-clr fw-medium   position-relative ${
            isCreateTag ? "show mt-3" : "hide"
          }`}
          controlId="validationCustom02"
        >
          <Form.Control
            required
            className="border-0 ps-5 textarea-with-placeholder input-border btn-h48-s15 btn-lg rounded text-color2 fw-semibold"
            type="text"
            value={addedTag}
            placeholder={t("write_a_post_now")}
            onChange={(e) => setNewAddedTag(e.target.value)}
          />
          <img
            src={process.env.PUBLIC_URL + "/Assets/Images/icons/post-edit.png"}
            alt=""
            className="textarea-icon tag"
          />
          <Form.Control.Feedback type="invalid" className="mt-1">
            {t("please_choose_valid_case_name")}
          </Form.Control.Feedback>
        </Form.Group>

      <div className="d-flex flex-wrap align-items-center justify-content-start gap-3 my-4">
        {tags && tags.length > 0 ? (
          tags.map((tag) => (
            <div
              key={tag.id}
              className={`posts-tag-filter rounded px-3 py-2 fw-semibold d-flex align-items-center ${
                deleteMode ? "" : "cursor-pointer"
              } ${
                selectedFilters.some((filter) => filter.id === tag.id) &&
                !deleteMode
                  ? "sc-1-bg text-white"
                  : ""
              }`}
              onClick={() => handleTagFilter(tag)}
            >
              {tag.name}
              {deleteMode && (
                <button
                  className="btn btn-sm bg-transparent ms-2 fw-bold text-black"
                  onClick={() =>
                    softDeletedTags.includes(tag.id)
                      ? handleRestoreTag(tag.id)
                      : handleSoftDelete(tag.id)
                  }
                >
                  {softDeletedTags.includes(tag.id) ? (
                    <FaCheck style={{ fontSize: "1.2rem", color: "green" }} />
                  ) : (
                    <span>x</span>
                  )}
                </button>
              )}
            </div>
          ))
        ) : (
          <p>{t("No Tags Available")}</p>
        )}
      </div>
    </div>
  );
};

export default PostsTags;
