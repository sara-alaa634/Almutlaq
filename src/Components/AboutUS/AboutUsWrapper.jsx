import React, { useState, useEffect } from "react";
import AboutView from "./AboutView";
import UploadFeildCreate from "../SharedComponents/Uploads/UploadInput/UploadFeildCreate";
import { errorMessages } from "../../helpers/messages";
import { useTranslation } from "react-i18next";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "../SharedComponents/Buttons/Button";
import { useHasPermission } from "../../Hooks/usePermissions";
import { permissionsNames } from "../../helpers/constants";

const AboutUsWrapper = ({ data, addNewAbout }) => {
  const [aboutImage, setAboutImage] = useState(null);
  const [aboutOldImage, setAboutOldImage] = useState(null);
  const [aboutText, setAboutText] = useState("");
  const [validated, setValidated] = useState(false);
  const [previewData, setPreviewData] = useState({
    image: process.env.PUBLIC_URL + "/Assets/Images/default-placeholder.jpg",
    text: "",
  });
  const [error, setError] = useState("");
  const { t,i18n  } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { hasPermission } = useHasPermission();
  const hasAddPermission = hasPermission(permissionsNames.office.create);
  const hasViewPermission = hasPermission(permissionsNames.office.view);

  useEffect(() => {
    if (data) {
      const initialImage =
        data?.about_office_image ||
        process.env.PUBLIC_URL + "/Assets/Images/default-placeholder.jpg";
      const initialText = data?.about_office_text || "";

      setAboutImage(initialImage);
      setAboutOldImage(initialImage)
      setAboutText(initialText);
      setPreviewData({
        image: initialImage,
        text: initialText,
      });
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || aboutText === "") {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setError("");
    } else if (
      aboutImage === null ||
      aboutImage ===
        process.env.PUBLIC_URL + "/Assets/Images/default-placeholder.jpg"
    ) {
      setValidated(true);
      setError(t(errorMessages.requiredFeild));
    } else {
      setValidated(false);
      setError("");
      try {
        if(aboutImage === aboutOldImage){
          await addNewAbout(null, aboutText);
        }else{
          await addNewAbout(aboutImage, aboutText);
        }
      } catch (err) {
        // console.error("Error creating case category:", err);
      }
    }
  };
  const handleFileUpload = (fileData) => {
    setAboutImage(fileData);
    setPreviewData((prev) => ({
      ...prev,
      image: URL.createObjectURL(fileData),
    }));
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setAboutText(newText);
    // Update preview immediately when text changes
    setPreviewData((prev) => ({
      ...prev,
      text: newText,
    }));
  };
  return (
    <div className="row mb-md-5 mb-3">
      {hasAddPermission && (
        <div className={`${hasViewPermission ? "col-12 col-md-6" : "col-12"} `}>
          <Form
            className="w-100 pe-md-3 pe-0"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Form.Group
                className=" mw-230px flex-grow-3 text-capitalize create-btn-clr fw-medium wide-img-feild"
                controlId="validationCustom01"
              >
                <UploadFeildCreate
                  onUpload={handleFileUpload}
                  allowVideos={false}
                  feildType="wide-input-feild"
                  setError={setError}
                  placeholder={t("Click to uplaod about us image")}
                  setValidated={setValidated}
                />

                <div className="text-danger fw-semibold">{error}</div>
              </Form.Group>
              <Form.Group
                as={Col}
                className="my-3  text-capitalize create-btn-clr fw-medium "
                md="12"
                controlId="validationCustom01"
              >
                <Form.Label className={`w-100 ${isRTL?"text-end":"text-start"}`}>{t("Write about the office")}</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={5}
                  className={`text-color2 fw-semibold ${isRTL?"text-end":"text-start"}`}
                  placeholder={t("write")}
                  value={aboutText}
                  onChange={handleTextChange}
                />
                <Form.Control.Feedback type="invalid">
                  {t("please_provide_valid_description")}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button
              customClass="btn-h48-s15 btn-lg px-3"
              value={t("save")}
              icon="LuArrowRight"
              buttonType="submit"
              type="button"
              typeAttribute="submit"
            />
          </Form>
        </div>
      )}
      {hasViewPermission && (
        <div
          className={`${
            hasAddPermission ? "col-12 col-md-6" : "col-12"
          }  card-vertical-line`}
        >
          <AboutView data={previewData} />
        </div>
      )}
    </div>
  );
};

export default AboutUsWrapper;
