import React, { useState } from "react";
import DotsDropdown from "../../SharedComponents/Buttons/DotsDropdown";
import { useTranslation } from "react-i18next";
import "../../../Assets/Css/postsManangemnt.css";
import { useUsers } from "../../../Hooks/useUsers";
import { useNavigate } from "react-router-dom";

const PublisherCard = ({
  data,
  setData,
  hasViewUserPermission,
  hasViewChatPermission,
  hasDeleteUserPermission,
}) => {
  const { t } = useTranslation();
  const { removeUser } = useUsers();
  const navigate = useNavigate();

  const handleDeletePublisher = async (actionType, userID) => {
    if (actionType === "delete") {
      await removeUser(userID);
      setData((prevUsers) => prevUsers.filter((user) => user.id !== userID));
    } else if (actionType === "view") {
      navigate(`/users/${userID}`);
    } else if (actionType === "chat") {
      navigate(`/chat/${userID}`);
    }
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
            data.image
              ? data.image
              : process.env.PUBLIC_URL +
                "/Assets/Images/human-placeholder-square.jpg"
          }
          alt=""
        />
        <div>
          <div className="publisher-name mb-0 fw-semibold text-capitalize">
            {data.name}
          </div>
          <a
            href="#"
            className="piblisher-action d-none fw-medium text-capitalize sc-1-clr"
          >
            {t("view_posts")}
          </a>
        </div>
      </div>
      <div className="publisher-card-action">
        <DotsDropdown
          customClass="btn-h48-s15 btn-lg cursor-pointer"
          deleteOption={true}
          updateOption={false}
          viewOption={true}
          chatOption={true}
          updateOption={false}
          viewPermission={hasViewUserPermission}
          viewChatPermission={hasViewChatPermission}
          deletePermission={hasDeleteUserPermission}
          actionID={data.id}
          onSelect={handleDeletePublisher}
        />
      </div>
    </div>
  );
};

export default PublisherCard;
