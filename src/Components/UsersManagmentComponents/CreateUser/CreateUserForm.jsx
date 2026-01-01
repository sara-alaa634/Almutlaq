import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col } from "react-bootstrap";
import Button from "../../SharedComponents/Buttons/Button";
import UploadFeildCreate from "../../SharedComponents/Uploads/UploadInput/UploadFeildCreate";
import { usersType } from "../../../helpers/constants";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const CreateUserForm = ({ createUser, fetchRoles }) => {
  const { t } = useTranslation();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [validated, setValidated] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [selectRole, setSelectRole] = useState("");
  const [telephone, setTelephone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openRoles, setOpenRoles] = useState(false);
  const [rolesData, setRolesData] = useState([]);
  const [error, setError] = useState(null);
  const { hasPermission } = useHasPermission();
  const hasCreatePermission = hasPermission(permissionsNames.users.create);

  const getRoles = async () => {
    const roles = await fetchRoles();
    setRolesData(roles);
  };
  // form validations
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    let flag = false;
    if (
      form.checkValidity() === false ||
      selectedOption === "" ||
      !/^\d+$/.test(telephone) ||
      name === "" ||
      name.trim().length < 2 ||
      password.trim().length < 6 ||
      !/^\S+@\S+\.\S+$/.test(email)
    ) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      if (openRoles) {
        if (selectRole) {
          setValidated(false);
          await createUser(
            name,
            email,
            telephone,
            password,
            uploadedImage,
            selectedUserType,
            selectRole
          );
          flag = true;
        } else {
          event.preventDefault();
          event.stopPropagation();
          setValidated(true);
        }
      } else {
        setValidated(false);
        await createUser(
          name,
          email,
          telephone,
          password,
          uploadedImage,
          selectedUserType,
          null
        );
        flag = true;
      }
    }

    if (flag) {
      setName("");
      setEmail("");
      setPassword("");
      setSelectRole("");
      setSelectedUserType("");
      setSelectedOption("");
      setTelephone("");
      setUploadedImage("");
    }
  };

  const handleSelectChange = async (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value === "1") {
      setSelectedUserType("client");
    } else if (value === "2") {
      setSelectedUserType("user");
    } else if (value === "3") {
      setSelectedUserType("work team");
    } else {
    }

    if (validated && event.target.value !== "") {
      setValidated(false);
    }
    if (value === "3") {
      setOpenRoles(true);
      await getRoles();
    } else {
      setOpenRoles(false);
    }
  };

  const handleSelectRole = (e) => {
    setSelectRole(e.target.value);
  };

  const handleFileUpload = (fileData) => {
    setUploadedImage(fileData);
  };

  const resetFunction = () => {
    setUploadedImage(null);
  };

  return (
    <>
      {hasCreatePermission ? (
        <div className="row">
          <div className="col-12">
            <UploadFeildCreate
              onUpload={handleFileUpload}
              allowVideos={false}
              feildType="user-input-feild"
              setError={setError}
              setValidated={setValidated}
              reset={resetFunction}
            />
            <div className="text-danger fw-semibold mt-2">{error}</div>
          </div>
          {/* new user info */}
          <div className="col-12 mt-4">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                    value={name}
                    placeholder={t("name")}
                    className="text-color2 fw-semibold"
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={validated && name.trim().length < 2}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t("please provide valid name with at least 3 characters")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  className="mb-3 text-capitalize fw-medium"
                  controlId="validationCustom02"
                >
                  <Form.Label>{t("Phone")}</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    value={telephone}
                    placeholder={t("Phone")}
                    className="text-color2 fw-semibold "
                    onChange={(e) => {
                      // Allow only numeric input
                      const value = e.target.value.replace(/\D/g, ""); // Replace any non-digit character with ''
                      setTelephone(value);
                    }}
                    isInvalid={validated && !/^\d+$/.test(telephone)} // Ensures that the value is only digits
                  />
                  <Form.Control.Feedback type="invalid">
                    {t("Please_provide_a_valid_phone_number")}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="6"
                  className="mb-3 text-capitalize fw-medium"
                  controlId="validationCustom03"
                >
                  <Form.Label>{t("email")}</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    value={email}
                    placeholder="example@gmail.com"
                    className="text-color2 fw-semibold"
                    autoComplete="username"
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={validated && !/^\S+@\S+\.\S+$/.test(email)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t("Please_provide_a_valid_email_ex:_example@gmail.com.")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  className="mb-3 text-capitalize fw-medium"
                  controlId="validationCustom04"
                >
                  <Form.Label>{t("password")}</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    className="text-color2 fw-semibold"
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={validated && password.trim().length < 6}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t("Please_provide_a_valid_pasword_at_least_6_numbers")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="12"
                  className="mb-3 text-capitalize fw-medium"
                  controlId="validationCustom05"
                >
                  <Form.Label>{t("User type")}</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="text-color2 fw-semibold"
                    isInvalid={validated && selectedOption === ""}
                  >
                    <option value="">{t("choose")}</option>
                    {usersType &&
                      usersType.map((type) => (
                        <option key={type.id} value={type.value}>
                          {t(type.name)}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {t("Please select a valid option.")}
                  </Form.Control.Feedback>
                </Form.Group>
                {/* team permission */}
                {openRoles ? (
                  <Form.Group
                    as={Col}
                    md="12"
                    className="mb-3 text-capitalize fw-medium"
                    controlId="validationCustom10"
                  >
                    <Form.Label>{t("User role")}</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      required
                      value={selectRole}
                      className="text-color2 fw-semibold"
                      onChange={handleSelectRole}
                      isInvalid={validated && selectRole === ""}
                    >
                      <option value="">{t("choose")}</option>
                      {rolesData ? (
                        rolesData.map((role) => (
                          <option key={role.id} value={role.name}>
                            {role.name}
                          </option>
                        ))
                      ) : (
                        <option value="">{t("no_data_available")}</option>
                      )}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {t("Please select a valid option.")}
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : null}
              </Row>
              <Button
                customClass="btn-h48-s15 btn-lg"
                value={t("save")}
                icon="LuArrowRight"
                buttonType="submit"
                type="button"
                iconClass="l-d-clr"
                typeAttribute="submit"
              />
            </Form>
          </div>
        </div>
      ) : (
        <div className="fw-bold fs-4 text-center py-3 text-capitalize">
          {t("you are not allowed to see this page")}
        </div>
      )}
    </>
  );
};

export default CreateUserForm;
