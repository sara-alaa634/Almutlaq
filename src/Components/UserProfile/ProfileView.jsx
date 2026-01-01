import { useState } from "react";
import { TbCrown } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { TbCalendar } from "react-icons/tb";
import { formatPostDate } from "../../helpers/formatDate";
import { useTranslation } from "react-i18next";
import { LuUser } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { LuPhoneCall } from "react-icons/lu";
import Button from "../SharedComponents/Buttons/Button";
import EditProfile from "./EditProfile";
import { useUser } from "../../Context/userContext";

const ProfileView = ({ editLoggedUserProfile }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { userData, setUserData } = useUser();
  const [showModal, setShowModal] = useState(false);

  const currentLanguage = i18n.language;
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <div>
      {userData !== null ? (
        <div>
          <div className="card small-card mb-1">
            <div className="card-body">
              <div className="d-flex flex-sm-row flex-column align-items-center justify-content-start gap-4">
                <div className="profile-img-wrapper">
                  <img
                    src={
                      userData.image !== null
                        ? userData.image
                        : process.env.PUBLIC_URL +
                          "/Assets/Images/human-placeholder-square.jpg"
                    }
                    alt=""
                  />
                </div>
                <ul className="profile-info w-100 d-flex flex-column align-items-start justify-content-center gap-2 m-0 p-0">
                  <li className="user-profile-head-name fw-medium">
                    {userData.name}
                  </li>
                  <li className="user-profile-info">
                    <TbCrown
                      className={`fs-5 mc-1-clr ${isRTL ? "ms-2" : "me-2"}`}
                    />
                    <span className="role-name text-capitalize me-1">
                      {t("role")}
                    </span>{" "}
                    <span className="role-value text-capitalize ms-1">
                      {userData.roles ? userData.roles[0] : ""}
                    </span>
                  </li>
                  <li className="user-profile-info">
                    <TbCalendar
                      className={`fs-5 mc-1-clr ${isRTL ? "ms-2" : "me-2"}`}
                    />
                    <span className="role-value text-capitalize me-1">
                      {t("Created in")}
                    </span>{" "}
                    <span className="role-value text-capitalize me-1">
                      {formatPostDate(userData.created_at, currentLanguage)}
                    </span>
                  </li>
                  <li className="user-profile-info">
                    <MdOutlineMail
                      className={`fs-5 mc-1-clr ${isRTL ? "ms-2" : "me-2"}`}
                    />
                    <span className="role-name text-capitalize me-1">
                      {t("email")}
                    </span>{" "}
                    <span className="role-value text-capitalize ms-1">
                      {userData.email}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* about info */}
          <div className="card small-card">
            <div className="card-body">
              <div className="row" dir={isRTL ? "rtl" : "ltr"}>
                <div className="col-12 col-md-6">
                  <ul className="profile-info d-flex flex-column align-items-start justify-content-center gap-2 m-0 p-0">
                    <li className="user-profile-head-name text-uppercase fw-medium mb-2">
                      about
                    </li>
                    <li
                      className="user-profile-info"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <LuUser
                        className={`fs-5 mc-1-clr ${isRTL ? "ms-2" : "me-2"}`}
                      />
                      <span className="role-name text-capitalize ms-1 ">
                        {t("full_name")}{" "}
                      </span>{" "}
                      <span className="role-value text-capitalize ms-1">
                        {userData.name}
                      </span>
                    </li>
                    <li className="user-profile-info">
                      <GrLocation
                        className={`fs-5 mc-1-clr ${isRTL ? "ms-2" : "me-2"}`}
                      />
                      <span
                        className={`role-name text-capitalize ${
                          isRTL ? "ms-1" : "me-1"
                        }`}
                      >
                        {" "}
                        {t("address")}{" "}
                      </span>{" "}
                      <span
                        className={`role-value text-capitalize ${
                          isRTL ? "ms-1" : "me-1"
                        }`}
                      >
                        {userData.address}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-6">
                  <ul className="profile-info d-flex flex-column align-items-start justify-content-center gap-2 m-0 p-0">
                    <li className="user-profile-head-name text-uppercase fw-medium mb-2">
                      contacts
                    </li>
                    <li className="user-profile-info">
                      <LuPhoneCall
                        className={`fs-5 mc-1-clr ${isRTL ? "ms-2" : "me-2"}`}
                      />
                      <span className="role-name text-capitalize ms-1">
                        {t("Phone")}
                      </span>{" "}
                      <span className="role-value text-capitalize me-1">
                        {userData.phone}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`small-card d-flex align-items-center ${
              isRTL ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <Button
              customClass="btn-h48-s15 btn-lg px-3"
              value={t("update")}
              icon="TbEditCircle"
              buttonType="submit"
              type="button"
              typeAttribute="submit"
              onClick={handleShow}
            />
          </div>

          <EditProfile
            show={showModal}
            onHide={handleClose}
            userData={userData}
            setUserData={setUserData}
            editLoggedUserProfile={editLoggedUserProfile}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProfileView;
