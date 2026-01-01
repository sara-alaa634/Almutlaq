import { useEffect, useState } from "react";
import "../../Assets/Css/Notifications.css";
import { useTranslation } from "react-i18next";
import Button from "../SharedComponents/Buttons/Button";
import Select from "react-select";
import { Form, Row, Col } from "react-bootstrap";
import FilterDropdown from "../SharedComponents/Buttons/FilterDropdown";
import { usersTypeWithAll } from "../../helpers/constants";
import { useUsers } from "../../Hooks/useUsers";
import { IoIosClose } from "react-icons/io";

const NotificationForm = ({
  addNotification = {},
  editNotification = {},
  setPaginationData,
  type = "create",
  oldData = {},
}) => {
  const [validated, setValidated] = useState(false);
  const [emailTitle, setEmailTitle] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [seletedUsersType, setSelectedUsersType] = useState("");
  const [emailDescription, setEmailDescription] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [viewUsersSelect, setViewUsersSelect] = useState(false);
  const { t } = useTranslation();
  const { fetchFilteredUsers, loading: userLoading } = useUsers();

  // this case for the update case
  useEffect(() => {
    if (type === "update" && oldData) {
      setEmailTitle(oldData.notification_title || "");
      setSelectedEmails(
        oldData?.recipients?.map((recipitent) => ({
          value: recipitent.id,
          label: recipitent.email,
        })) || []
      );
      setSelectedUsersType(oldData.user_type || "");
      setEmailDescription(oldData.notification_body || "");
    }
  }, [oldData, type]);

  useEffect(() => {
    if (seletedUsersType) {
      if(seletedUsersType === "all" ){
        handleSendTOAllUsers();
      }else{
        handleGetUsers(seletedUsersType);
      }
   
    }
  }, [seletedUsersType]);

  const handleGetUsers = async (userType) => {
    const users = await fetchFilteredUsers(userType);
    const options = users.map((user) => ({
      value: user.id,
      label: user.name,
    }));
    setUsersData(options);
  };
const handleSendTOAllUsers =()=>{
  if(viewUsersSelect){
    setViewUsersSelect(false)
  }

  setSelectedEmails([0]);
  setUserEmailError("");

}
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      selectedEmails.length === 0 ||
      emailDescription === "" ||
      emailTitle === ""
    ) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      if (selectedEmails.length === 0) {
        setUserEmailError(t("Please select at least one email"));
      }
    } else {
      setValidated(false);
      const emailIds = selectedEmails.map((email) => email.value);
      if (type === "create") {
        const responsedata = await addNotification(
          emailIds,
          emailTitle,
          emailDescription
        );
        setPaginationData((prev) => [responsedata, ...prev]);
        setEmailDescription("");
        setSelectedEmails([]);
        setEmailTitle("");
      } else {
        await editNotification(
          oldData?.id,
          seletedUsersType,
          emailIds,
          emailTitle,
          emailDescription
        );
      }
    }
  };
  const handleEmailChange = (option) => {
    if (option) {
      setSelectedEmails((prev) => [...prev, option]);
      setUserEmailError("");
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setSelectedEmails((prev) =>
      prev.filter((email) => email.value !== emailToRemove.value)
    );
  };

  const handleSelectedUserType = (item) => {
    if (!viewUsersSelect) {
      setViewUsersSelect(true);
    }
    switch (item.value.toString()) {
      case "1":
        setSelectedUsersType("client");
        break;
      case "2":
        setSelectedUsersType("user");
        break;
      case "3":
        setSelectedUsersType("work team");
        break;
      case "0":
        setSelectedUsersType("all");
        break;
      default:
        setSelectedUsersType("");
    }
  };

  return (
    <Form
      className="w-100"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Row className="mb-3">
        <Form.Group
          as={Col}
          className="my-3 text-capitalize create-btn-clr fw-medium"
          md="6"
          lg="12"
          xl="8"
          xxl="6"
          controlId="validationCustom01"
        >
          <FilterDropdown
            buttonWrapper="w-100"
            customClass="btn-h48-s15 btn-lg w-100"
            value={
              seletedUsersType === "client"
                ? "1"
                : seletedUsersType === "user"
                ? "2"
                : seletedUsersType === "work team"
                ? "3"
                : seletedUsersType === "all"
                ? "0"
                : t("Select user type")
            }
            data={usersTypeWithAll}
            onSelect={(item) => handleSelectedUserType(item)}
          />
        </Form.Group>
        {viewUsersSelect && (
          <Form.Group
            as={Col}
            className="mb-3 text-capitalize create-btn-clr fw-medium"
            md="12"
            controlId="validationCustom00"
          >
            <Form.Label>{t("select user email")}</Form.Label>
            <Select
              options={
                userLoading ? [{ label: "Loading...", value: "" }] : usersData
              }
              onChange={handleEmailChange}
              placeholder={userLoading ? t("Loading...") : t("choose email")}
              isSearchable
              isClearable
              isDisabled={usersData.length === 0}
              value={null}
            />
            {selectedEmails.length > 0 && (
              <div className="mt-2 p-3 border-light rounded l-d-bg mt-4 d-flex align-items-center flex-wrap gap-2">
                {selectedEmails.map((email, index) => (
                  <div
                    key={index}
                    className=" select-mail-box py-1 px-3 rounded"
                  >
                    {email.label}
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="bg-transparent border-0 px-0"
                    >
                      <IoIosClose className=" fs-4 mc-1-clr fw-bold" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="text-danger fw-semibold">{userEmailError}</div>
          </Form.Group>
        )}

        <Form.Group
          as={Col}
          className="mb-3 text-capitalize create-btn-clr fw-medium"
          md="12"
          controlId="validationCustom01"
        >
          <Form.Label>{t("Notification Title")}</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder={t("write")}
            className="text-color2 fw-semibold"
            value={emailTitle}
            onChange={(e) => setEmailTitle(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {t("please_choose_valid_case_name")}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="12"
          className="mb-3 text-capitalize create-btn-clr fw-medium"
          controlId="validationCustom02"
        >
          <Form.Label>{t("Notification content")}</Form.Label>
          <Form.Control
            required
            as="textarea"
            placeholder={t("write")}
            value={emailDescription}
            className="text-color2 fw-semibold"
            rows={5}
            onChange={(e) => setEmailDescription(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {t("please_choose_valid_case_name")}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      {type === "create" ? (
        <Button
          customClass="btn-h48-s15 btn-lg mb-4"
          value={t("save")}
          icon="LuArrowRight"
          buttonType="submit"
          type="button"
          typeAttribute="submit"
        />
      ) : (
        <Button
          customClass="btn-h48-s15 btn-lg px-3"
          value={t("update")}
          icon="TbEditCircle"
          buttonType="update"
          type="button"
          typeAttribute="submit"
        />
      )}
    </Form>
  );
};

export default NotificationForm;
