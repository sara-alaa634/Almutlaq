import React from "react";
import { useTranslation } from "react-i18next";
import "../../../Assets/Css/usersManagment.css";
import Button from "../../SharedComponents/Buttons/Button";
import { Form, Row, Col } from "react-bootstrap";
import { useUsers } from "../../../Hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const UserViewForm = ({ user }) => {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
  const hasEditPermission = hasPermission(permissionsNames.users.edit);
  const hasDeletePermission = hasPermission(permissionsNames.users.delete);
  const hasViewChatPermission = hasPermission(permissionsNames.chat.view);

  const userType =
    user.user_type === "client"
      ? "1"
      : user.user_type === "user"
      ? "2"
      : user.user_type === "work team"
      ? "3"
      : "";
  const { removeUser } = useUsers();
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    navigate(`/users/clients`);
    await removeUser(user.id);
  };
  return (
    <Form noValidate>
      <div className=" py-4">
        <div className="user-img-&-action-btns-wrapper d-flex flex-wrap justify-content-between align-items-center">
          <img
            className="create-user-img rounded mb-3"
            src={
              user.image
                ? user.image
                : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder-square.jpg`
            }
            alt=""
          />
          <div className="user-info-action-btns-wrapper d-flex flex-wrap gap-3 mb-3">
            {hasDeletePermission && (
              <Button
                customClass="btn-h48-s15 btn-lg LH-27px"
                value={t("update")}
                icon="FiEdit"
                buttonType="main"
                iconClass="create-btn-clr fs-6"
                type="link"
                typeAttribute="submit"
                href={`/users/update-user/${user.id}`}
              />
            )}
            {hasViewChatPermission && (
              <Button
                customClass="btn-h48-s15 btn-lg LH-27px"
                value={t("message")}
                icon="IoChatbubbleEllipsesOutline"
                buttonType="main"
                iconClass="create-btn-clr fs-6"
                type="link"
                typeAttribute="submit"
                href={`/chat/${user.id}`}
              />
            )}
            {hasEditPermission && (
              <Button
                customClass="btn-h48-s15 btn-lg"
                value={t("delete")}
                icon="GoTrash"
                iconClass="create-btn-clr fs-6"
                buttonType="main"
                type="button"
                typeAttribute="submit"
                onClick={handleDeleteUser}
              />
            )}
          </div>
        </div>
        <div className="user-info-feilds">
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="6"
              className="mb-3 text-capitalize create-btn-clr fw-medium"
              controlId="validationCustom01"
            >
              <Form.Label>{t("name")}</Form.Label>
              <Form.Control
                required
                type="text"
                className="text-color2 fw-semibold"
                value={user.name || " "}
                readOnly
                disabled
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              className="mb-3 text-capitalize create-btn-clr fw-medium"
              controlId="validationCustom02"
            >
              <Form.Label>{t("Phone")}</Form.Label>
              <Form.Control
                required
                type="tel"
                value={user.phone || " "}
                readOnly
                className="text-color2 fw-semibold"
                disabled
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              className="mb-3 text-capitalize create-btn-clr fw-medium"
              controlId="validationCustom03"
            >
              <Form.Label>{t("email")}</Form.Label>
              <Form.Control
                required
                type="text"
                autoComplete="username"
                value={user.email || " "}
                className="text-color2 fw-semibold"
                readOnly
                disabled
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              className="mb-3 text-capitalize create-btn-clr fw-medium"
              controlId="validationCustom04"
            >
              <Form.Label>{t("password")}</Form.Label>
              <Form.Control
                required
                type="password"
                value="12345678"
                readOnly
                autoComplete="current-password"
                className="text-color2 fw-semibold"
                disabled
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              className="mb-3 text-capitalize create-btn-clr fw-medium"
              controlId="validationCustom05"
            >
              <Form.Label>{t("User type")}</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                value={userType || " "}
                readOnly
                className="text-color2 fw-semibold"
                disabled
              >
                <option value="">{t("Open this select menu")}</option>
                <option value="1">{t("Not client user")}</option>
                <option value="2">{t("client")}</option>
                <option value="3">{t("our team")}</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              className="mb-3 text-capitalize create-btn-clr fw-medium"
              controlId="validationCustom010"
            >
              <Form.Label>{t("User state")}</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                value={user.is_online ? "active" : "inactive"}
                disabled
                className="text-color2 fw-semibold"
              >
                <option value="">{t("Open this select menu")}</option>
                <option value="active">{t("active")}</option>
                <option value="inactive">{t("inactive")}</option>
              </Form.Select>
            </Form.Group>

            {user.user_type === "work team" && user?.roles?.length !== 0 ? (
              <Form.Group
                as={Col}
                md="12"
                className="mb-3 text-capitalize create-btn-clr fw-medium"
                controlId="validationCustom10"
              >
                <Form.Label>{t("User role")}</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  required
                  className="text-color2 fw-semibold"
                  value={user && user.roles ? user.roles[0] : "no role" || " "}
                  disabled
                >
                  <option value="">{t("choose")}</option>
                  {user && user.roles ? (
                    <option value={user.roles[0]}>{user.roles[0]}</option>
                  ) : (
                    <option value={"no role"}>{t("has no role type")}</option>
                  )}
                </Form.Select>
              </Form.Group>
            ) : null}
          </Row>
        </div>
      </div>
    </Form>
  );
};

export default UserViewForm;
