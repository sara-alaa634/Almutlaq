import React, { useState } from "react";
import DotsDropdown from "../../SharedComponents/Buttons/DotsDropdown";
import { useTranslation } from "react-i18next";
import "../../../Assets/Css/postsManangemnt.css";
const LatestPostsCard = ({ data, setData, removePost, deletePermission }) => {
  const { t } = useTranslation();

  const handleDeletePost = async (actionType, postID) => {
    await removePost(postID);
    setData((prevPosts) => prevPosts.filter((post) => post.id !== postID));
  };
  return (
    <div
      key={data.id}
      className="my-4 d-flex align-items-center justify-content-between gap-3"
    >
      <div className="publisher-info d-flex align-items-center justify-content-start gap-3">
        <img
          className="publisher-image"
          src={
            data.user.image
              ? data.user.image
              : process.env.PUBLIC_URL +
                "/Assets/Images/human-placeholder-square.jpg"
          }
          alt=""
        />
        <div>
          <div className="publisher-name mb-0 fw-semibold text-capitalize">
            {data.user.name}
          </div>
          <p className="latest-post-text mb-0 mt-2">
            {data?.text?.length > 40
              ? `${data?.text?.slice(0, 40)}...`
              : data.text}
          </p>
          <a
            href="#"
            className="piblisher-action d-none fw-medium text-capitalize sc-1-clr"
          >
            {t("view_posts")}
          </a>
        </div>
      </div>
      <div className="publisher-card-action">
        {deletePermission ? (
          <DotsDropdown
            customClass="btn-h48-s15 btn-lg cursor-pointer"
            deleteOption={true}
            updateOption={false}
            actionID={data.id}
            onSelect={handleDeletePost}
            deleteValue={t('delete_post')}
            deletePermission={deletePermission}
          />
        ) : null}
      </div>
    </div>
  );
};

export default LatestPostsCard;
