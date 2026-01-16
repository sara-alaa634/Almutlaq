import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "../SharedComponents/Buttons/Button";
import UploadFeildCreate from "../SharedComponents/Uploads/UploadInput/UploadFeildCreate";
import { errorMessages } from "../../helpers/messages";
import PostCardSample from "../../Components/PostManagment/PostCardSample";
import { getCurrentTimeInApiFormat } from "../../helpers/formatDate";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { usePosts } from "../../Hooks/usePosts";
const CreatePostForm = ({ addPost, fetchTags }) => {
  const { t } = useTranslation();
  const [postDescription, setPostDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [uploadedThumbnail, setUploadedThumbnail] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [imageThumbnailError, setImageThumbnailError] = useState("");
  const [viewImg, setViewImg] = useState(null);
  const [imageError, setImageError] = useState("");
  const [tagsError, setTagsError] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const [validation, setValidated] = useState(false);
  const [addTagView, setAddTagView] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [newTagError, setNewTagError] = useState("");
  const { addTag } = usePosts();
  useEffect(() => {
    const handleFetchTags = async () => {
      const tagsData = await fetchTags();
      setTags(tagsData);
    };
    handleFetchTags();
  }, []);

  const viewPost = {
    id: 1,
    creator: {
      name: "مكتب المطلق للمحاماة للاستشارات القانونية",
      image: process.env.PUBLIC_URL + "/Assets/Images/create-post-img.png",
    },
    postPublisherName: "مكتب المطلق للمحاماة للاستشارات القانونية",
    created_at: getCurrentTimeInApiFormat(),
    text: postDescription,
    media_type: "image",
    media_path:
      viewImg === null
        ? process.env.PUBLIC_URL + "/Assets/Images/default-post-img.png"
        : URL.createObjectURL(viewImg),
    comments_count: 0,
    shares_count: 0,
  };

  // Handle checkbox change event
  const handleTagChange = (tagName) => {
    setSelectedTags(
      (prevSelectedTags) =>
        prevSelectedTags.includes(tagName)
          ? prevSelectedTags.filter((name) => name !== tagName) // Uncheck
          : [...prevSelectedTags, tagName] // Check
    );
  };
  const handleFileUpload = (fileData) => {
    setUploadedFiles(fileData);

    const videoExtensions = ["webm", "mp4"];

    // Extract the file extension from the File object's name
    const fileExtension = fileData.name?.split(".").pop().toLowerCase();
    const video = videoExtensions.includes(fileExtension);
    setIsVideo(video);
    setViewImg(video ? null : fileData);
  };

  const handleVideoThumbnail = (fileData) => {
    setUploadedThumbnail(fileData);
    setViewImg(fileData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (isVideo) {
      if (uploadedThumbnail === null) {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        setImageThumbnailError(t(errorMessages.requiredFeild));
      }
    } else {
      setValidated(false);
      await addPost(
        postDescription.length === 0 ? null : postDescription,
        selectedTags.length === 0 ? null : selectedTags,
        isVideo,
        uploadedFiles ? uploadedFiles : null,
        uploadedThumbnail ? uploadedThumbnail : null
      );

      setIsVideo(false);
    }
  };

  const addTagToggle = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAddTagView((prev) => !prev);
  };
  const handleAddNewTag = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    setNewTagError("");
    if (newTag.length !== 0) {
      const response = await addTag(newTag);

      setNewTag("");
      setTags((prev) => [...prev, response.data]);
    } else {
      setNewTagError(t("This field is required to add a new tag."));
    }
  };

  return (
    <div className="row">
      <div className="col-12 col-md-8">
        <Form noValidate validated={validation} onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="card-header l-d-bg border-0">
              <div className="publisher-info d-flex align-items-center justify-content-start gap-3">
                <img
                  className="publisher-image"
                  src={
                    process.env.PUBLIC_URL +
                    "/Assets/Images/create-post-img.png"
                  }
                  alt=""
                />
                <div>
                  <div className="publisher-name h5 mb-0 fw-semibold text-capitalize">
                    مكتب أ المطلق للمحاماة للاستشارات القانونية
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Form.Group
                as={Col}
                md="12"
                className="text-capitalize create-btn-clr fw-medium  input-border-bottom position-relative"
                controlId="validationCustom02"
              >
                <Form.Control
                  className="border-0 ps-5 text-color2 fw-semibold textarea-with-placeholder"
                  as="textarea"
                  rows={6}
                  value={postDescription}
                  placeholder={t("write_a_post_now")}
                  onChange={(e) => setPostDescription(e.target.value)}
                />
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/Assets/Images/icons/post-edit.png"
                  }
                  alt=""
                  className="textarea-icon"
                />
              </Form.Group>
              <Form.Group
                className=" mw-230px flex-grow-3 text-capitalize create-btn-clr fw-medium"
                controlId="validationCustom01"
              >
                <UploadFeildCreate
                  onUpload={handleFileUpload}
                  allowVideos={true}
                  setError={setImageError}
                  setValidated={setValidated}
                />
                <div className="text-danger fw-semibold my-3">{imageError}</div>
              </Form.Group>
              {isVideo && (
                <Form.Group
                  className=" mw-230px flex-grow-3 text-capitalize create-btn-clr fw-medium"
                  controlId="validationCustom01"
                >
                  <Form.Label>{t("upload video thumbnail")}</Form.Label>
                  <UploadFeildCreate
                    onUpload={handleVideoThumbnail}
                    allowVideos={false}
                    setError={setImageThumbnailError}
                    setValidated={setValidated}
                  />
                  <div className="text-danger fw-semibold mt-3">
                    {imageThumbnailError}
                  </div>
                </Form.Group>
              )}

              {/* Posts Tags */}
              <div className="tags-wrapper py-md-4 py-3  input-border-bottom  mb-3 d-flex flex-wrap align-items-center justify-content-start gap-3">
                {tags ? (
                  tags.map((tag) => (
                    <div key={tag.id} className="tag-item">
                      <input
                        type="checkbox"
                        id={`tag-${tag.id}`}
                        value={tag.name}
                        checked={selectedTags.includes(tag.name)}
                        onChange={() => handleTagChange(tag.name)}
                        className="hidden-checkbox" // Add a class to hide checkbox
                      />
                      <label
                        htmlFor={`tag-${tag.id}`}
                        className={`tag-label px-3 py-2 fw-semibold rounded-5 ${selectedTags.includes(tag.name) ? "selected" : ""
                          }`}
                      >
                        {tag.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <div> {t("no_data_available")}</div>
                )}

                <button
                  className="rounded-circle create-btn-clr input-border-bottom tag-label p-12px fw-bold  d-flex align-items-center"
                  onClick={(e) => { addTagToggle(e) }}
                >
                  {addTagView ? <IoClose /> : <FaPlus />}
                </button>

                {addTagView && (
                  <div className="d-flex align-items-center gap-3 ">
                    <Form.Group
                      as={Col}
                      md="12"
                      className="text-capitalize create-btn-clr fw-medium"
                      controlId="validationCustom02"
                    >
                      <Form.Control
                        className=" ps-5 textarea-with-placeholder text-color2 fw-semibold text-end"
                        type="text"
                        required
                        value={newTag}
                        placeholder={t("write_a_new_tag")}
                        onChange={(e) => setNewTag(e.target.value)}
                      />
                    </Form.Group>
                    <button
                      className="sc-1-bg l-d-clr py-2 px-2 border-0 fw-semibold rounded"
                      onClick={(e) => {
                        handleAddNewTag(e);
                      }}
                    >
                      {t("add")}
                    </button>
                  </div>
                )}
              </div>
              <div className="text-danger fw-semibold mt-3">
                {tagsError || newTagError}
              </div>

              <Button
                customClass="btn-h48-s15 btn-lg mt-md-5 mt-3"
                value={t("save")}
                icon="LuArrowRight"
                buttonType="submit"
                type="button"
                typeAttribute="submit"
              />
            </div>
          </div>
        </Form>
      </div>
      <div className="col-12 col-md-4">
        <PostCardSample data={viewPost} />
      </div>
    </div>
  );
};

export default CreatePostForm;
