import React from "react";
import { HiOutlineChat } from "react-icons/hi";
import { TbTrash } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { defaultAlert } from "../../helpers/Alert";
import { alertMessages } from "../../helpers/messages";
import { useTranslation } from "react-i18next";
const MessageCard = ({
  data,
  setData,
  onDelete,
  deletePermission,
  chatPermission,
  viewPermission,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleViewProfile = (event, id) => {
    event.stopPropagation();
    navigate(`/users/${id}`);
  };

  const handleChatRedirect = (event, id) => {
    event.stopPropagation();
    navigate(`/chat/${id}`);
  };

  const handleDeleteMessage = async (event, id) => {
    event.stopPropagation();
    const result = await defaultAlert(
      t(alertMessages.confirmTitle),
      t(alertMessages.confirmSupportMessage),
      t(alertMessages.confirmButton),
      t(alertMessages.cancelButton),
      "warning"
    );

    if (result) {
      await onDelete(id);
      setData((prev) => prev.filter((message) => message.id !== id));
    }
  };

  return (
    <div className="card mb-3 mt-0 ">
      <div className="card-body p-md-4 p-3  message-wrapper d-flex justify-content-between align-items-center gap-3">
        <div className="message-info d-flex  justify-content-between align-items-center gap-4">
          <img
            src={
              data?.user?.image !== null
                ? data.user.image
                : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
            }
            className="message-card-img"
            alt=""
          />
          <div>
            <h2 className="message-card-name text-capitalize">
              {data?.user?.name}
            </h2>
            <p className="mb-0 message-card-description">{data?.text}</p>
          </div>
        </div>
        <ul className="message-actions d-flex flex-column justify-content-end align-items-center gap-3">
          {chatPermission ? (
            <li
              className="message-action"
              onClick={(e) => {
                e.stopPropagation();
                handleChatRedirect(e, data.user_id);
              }}
            >
              <HiOutlineChat className="fs-5" />
            </li>
          ) : null}
          {viewPermission ? (
            <li
              className="message-action"
              onClick={(e) => {
                handleViewProfile(e, data.user_id);
              }}
            >
              <CgProfile className="fs-5" />
            </li>
          ) : null}
          {deletePermission ? (
            <li
              className="message-action"
              onClick={(e) => {
                handleDeleteMessage(e, data.id);
              }}
            >
              <TbTrash className="fs-5" />
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default MessageCard;
