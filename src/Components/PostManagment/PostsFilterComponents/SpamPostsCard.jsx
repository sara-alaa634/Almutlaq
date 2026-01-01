import React, { useState } from "react";
import DotsDropdown from "../../SharedComponents/Buttons/DotsDropdown";
import { useTranslation } from "react-i18next";
import "../../../Assets/Css/postsManangemnt.css";
const SpamPostsCard = ({ data, setData, removePost, deletePermission }) => {
  const { t } = useTranslation();

  const handleDeletePost = async (actionType, postID) => {
    await removePost(postID);
    setData((prevPosts) => prevPosts.filter((post) => post.id !== postID));
  };
  return (
    <div
      key={data.id}
      className="my-4 d-flex flex-wrap align-items-center justify-content-between gap-3"
    >
      <div className="publisher-info row">
        <div className="col-5 ">
          <img
            className="spam-post-image rounded h-100"
            src={
              data.media_type === "image"
                ? data.media_path ||
                  `${process.env.PUBLIC_URL}/Assets/Images/default-post-img.png`
                : data.video_thumbnail ||
                  `${process.env.PUBLIC_URL}/Assets/Images/default-post-img.png`
            }
            alt=""
          />
        </div>
        <div className="col-7 ">
          <div className="h-100 d-flex flex-column align-items-start justify-content-center">
            <div className="publisher-name h5 mb-0 fw-semibold text-capitalize mb-2">
              {data?.text?.length > 20
                ? `${data.text.slice(0, 20)}...`
                : data.text}
            </div>
            <div
              href="#"
              className="piblisher-action fw-medium text-capitalize sc-1-clr"
            >
              {t("unwilling_request")} {data.reports_count}
            </div>
          </div>
        </div>
      </div>
      <div className="publisher-card-action">
        {deletePermission ? (
          <DotsDropdown
            customClass="btn-h48-s15 btn-lg px-0 cursor-pointer"
            buttonType="subMain"
            deleteOption={true}
            updateOption={false}
            actionID={data.id}
            onSelect={handleDeletePost}
            deletePermission={deletePermission}
            deleteValue={t("delete_post")}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SpamPostsCard;
