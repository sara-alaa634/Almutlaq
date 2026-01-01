import "../../Assets/Css/Notifications.css";
import { useTranslation } from "react-i18next";
import Button from "../SharedComponents/Buttons/Button";
import { Form, Row, Col } from "react-bootstrap";
import { handleTableColumnDateFormat } from "../../helpers/formatDate";

const NotificationViewWrapper = ({ userData, addNotification }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailIds = userData?.recipients.map((email) => email.id);
    await addNotification(
      emailIds,
      userData.notification_title,
      userData.notification_body
    );
  };

  return (
    <Form
      className="w-100 view-notification-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <Row className="mb-3">
        <div className={`mb-3 text-capitalize w-auto ${isRTL?"me-3":"ms-3"} fs-6 fw-medium p-y13-x40 border create-btn-clr rounded text-center`}>
          {t(userData.user_type)}
        </div>
        <Form.Group
          as={Col}
          className="mb-3 text-capitalize create-btn-clr fw-medium"
          md="12"
          controlId="validationCustom00"
        >
          {userData?.recipients?.length > 0 && (
            <div className=" p-3 border-light rounded l-d-bg d-flex align-items-center flex-wrap gap-2">
              {userData.recipients.map((recipient, index) => (
                <div key={index} className=" select-mail-box py-2 px-3 rounded">
                  {recipient.email}
                </div>
              ))}
            </div>
          )}
        </Form.Group>

        <Form.Group
          as={Col}
          className="mb-3 text-capitalize create-btn-clr fw-medium"
          md="12"
          controlId="validationCustom01"
        >
          <Form.Control
            required
            type="text"
            className="text-color2 fw-semibold"
            value={userData.notification_title || ""}
            disabled
          />
        </Form.Group>
        <Form.Group
          as={Col}
          md="12"
          className="mb-3 text-capitalize create-btn-clr fw-medium"
          controlId="validationCustom02"
        >
          <Form.Control
            required
            as="textarea"
            className="text-color2 fw-semibold"
            value={userData.notification_body || ""}
            rows={5}
            disabled
          />
        </Form.Group>
        <Form.Group
          as={Col}
          xl="8"
          lg="12"
          md="8"
          sm="8"
          className="mt-3 mb-md-4 mb-3 text-capitalize create-btn-clr fw-medium"
          controlId="validationCustom22"
        >
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div className="d-flex align-items-center">
              <img
                className={`client-table-user-img  ${isRTL ? "ms-2" : "me-2"}`}
                src={
                  userData?.sender?.image !== null
                    ? userData.sender?.image
                    : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
                }
                alt=""
              />
              <div className="d-flex flex-column gap-2">
                <div className="notification-title">{t("sender")}</div>
                <div className="notification-value">
                  {userData?.sender?.name}
                </div>
              </div>
            </div>
            <div className="ms-5 d-flex flex-column gap-2">
              <div className="notification-title">
                {" "}
                {t("Date of submission")}
              </div>
              <div className="notification-value">
                {userData?.created_at
                  ? handleTableColumnDateFormat(userData.created_at)
                  : ""}
              </div>
            </div>
          </div>
        </Form.Group>
      </Row>
      <Button
        customClass="btn-h48-s15 btn-lg px-3"
        value={t("resend")}
        icon="TbEditCircle"
        buttonType="update"
        type="button"
        typeAttribute="submit"
      />
    </Form>
  );
};

export default NotificationViewWrapper;
