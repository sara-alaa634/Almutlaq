import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "../SharedComponents/Buttons/Button";
import UploadFileCreate from "../SharedComponents/Uploads/UploadAnyFileType/UploadFileCreate";
const EditProfile = ({ show, onHide, userData,setUserData, editLoggedUserProfile }) => {
 //  console.log("userData:", userData);
  const { t } = useTranslation();
  const [userName, setUserName] = useState(userData?.name || "");
  const [userAddress, setUserAddress] = useState(userData?.address || "");
  const [userPhone, setUserPhone] = useState(userData?.phone || "");
  const [uploadedFile, setUploadedFile] = useState(userData?.image || null);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

   // Callback function to handle file uploads
   const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      userPhone === "" ||
      userAddress === "" ||
      userName === "" 
    ) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      let resposne ={};
      if(uploadedFile === userData?.image){
        resposne =await editLoggedUserProfile(userName, userAddress, userPhone,null);

      }else{
        resposne =await editLoggedUserProfile(userName, userAddress, userPhone,uploadedFile);

      }
      setUserData(resposne);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="px-sm-5 px-3 edit-profile-modal"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="p-md-5 p-3">
        <h3 className="text-center edit-profile-header">
          {t("Edit my profile")}
        </h3>
        <p className="text-center edit-profile-description mb-md-4 mb-3 pb-2">
          {t("Updating user details will trigger a privacy audit.")}
        </p>
        <Form
          className="w-100 my-3"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row>
          <Form.Group
              className="mb-3  text-capitalize create-btn-clr fw-medium "
              controlId="validationCustom011"
            >
              <UploadFileCreate
                onUpload={handleFileUpload}
                allowVideos={false}
                setError={setError}
                setValidated={setValidated}
                placeholder={t("profile photo")}

              />
              <div className="text-danger fw-semibold">{error}</div>
            </Form.Group>
            <Form.Group
              className="mb-3  text-capitalize create-btn-clr fw-medium "
              controlId="validationCustom01"
              as={Col}
              md="12"
            >
              <Form.Label>{t("full_name")}</Form.Label>
              <Form.Control
                className="btn-h48-s15 text-capitalize text-color2 fw-semibold"
                required
                type="text"
                value={userName}
                placeholder={t("full_name")}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {t("please_choose_valid_user_name")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3 text-capitalize create-btn-clr fw-medium "
              controlId="validationCustom01"
              as={Col}
              md="12"
            >
              <Form.Label>{t("address")}</Form.Label>
              <Form.Control
                className="btn-h48-s15 text-capitalize text-color2 fw-semibold"
                required
                type="text"
                value={userAddress}
                placeholder={t("address")}
                onChange={(e) => setUserAddress(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {t("please_choose_valid_user_address")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3 text-capitalize text-color2 fw-semibold"
              controlId="validationCustom01"
              as={Col}
              md="12"
            >
              <Form.Label>{t("Phone")}</Form.Label>
              <Form.Control
                className="btn-h48-s15 text-color2 fw-semibold text-capitalize"
                required
                type="text"
                value={userPhone}
                placeholder={t("phone")}
                onChange={(e) => setUserPhone(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {t("Please_provide_a_valid_phone_number")}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="d-flex justify-content-center mt-md-4 mt-3 gap-4">
            <Button
              customClass="btn-h48-s15 btn-lg px-md-4 px-3"
              value={t("update")}
              buttonType="submit"
              type="button"
              typeAttribute="submit"
            />
            <Button
              customClass="btn-h48-s15 btn-lg px-md-4 px-3 "
              value={t("cancel")}
              buttonType="cancel"
              type="button"
              onClick={onHide}
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfile;
