import { useState, useEffect } from "react";
import "../../../Assets/Css/CasesManagment.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";
import Button from "../../SharedComponents/Buttons/Button";
import UploadFeildUpdate from "../../SharedComponents/Uploads/UploadInput/UploadFeildUpdate";
import { useCasesSubCategories } from "../../../Hooks/useCasesSubCategories";
import { useCasesCategories } from "../../../Hooks/useCasesCategories";
import DropDownButton from "../../SharedComponents/Buttons/DropDownButton";
import { errorMessages } from "../../../helpers/messages";

const UpdateCaseSubCategory = ({
  id,
  oldCaseSubCategory = null,
  disableFields = false,
  type = "update",
}) => {
  const [casesCategories, setCasesCategories] = useState([]);
  const [validated, setValidated] = useState(false);
  const [caseSubCategoryName, setcaseSubCategoryName] = useState(
    oldCaseSubCategory.title
  );
  const [uploadedFiles, setUploadedFiles] = useState(oldCaseSubCategory.image);
  const [caseCategoryID, setCaseCategoryID] = useState(
    oldCaseSubCategory.category_id
  );
  const [selectedCaseCategory, setSelectedCaseCategory] = useState(
    oldCaseSubCategory === null
      ? t("case_categories")
      : oldCaseSubCategory.category.title
  );
  const [caseCategoryError, setCaseCategoryError] = useState("");
  const [error, setError] = useState("");
  const { t,i18n  } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { editCaseSubCategory } = useCasesSubCategories();
  const { fetchCasesCategories } = useCasesCategories();

  useEffect(() => {
      handleFetchCaseCategories();
  }, []);

  const handleFetchCaseCategories = async () => {
    const response = await fetchCasesCategories();
    setCasesCategories(response)
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || caseSubCategoryName === "") {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setCaseCategoryError("");
      setError("");
    } else if (uploadedFiles === null) {
      setValidated(true);
      setError(t(errorMessages.requiredFeild));
    } else if (selectedCaseCategory === null) {
      setValidated(true);
      setCaseCategoryError(t(errorMessages.requiredFeild));
    } else {
      setValidated(false);
      setCaseCategoryError("");
      setError("");
      try {
        // Call API to add case category
        await editCaseSubCategory(
          id,
          caseCategoryID,
          caseSubCategoryName,
          uploadedFiles instanceof File
            ? uploadedFiles
            : oldCaseSubCategory.image
        );
      } catch (err) {
        // console.error("Error creating case category:", err);
      }
    }
  };
  const handleFileUpload = (fileData) => {
    setUploadedFiles(fileData);
  };

  const handleSelectedCaseCategory = (item) => {
    setSelectedCaseCategory(item);
    setCaseCategoryID(item.id);
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
          className="my-3  text-capitalize create-btn-clr fw-medium w-100"
          md="12"
          controlId="validationCustom01"
        >
          <DropDownButton
            buttonWrapper="w-100"
            customClass="btn-h48-s15 btn-lg cusrsor-pointer w-100  d-flex justify-content-between align-items-center"
            dropDownBoxClass="w-100"
            value={selectedCaseCategory}
            data={casesCategories}
            onSelect={handleSelectedCaseCategory}
            disabled={disableFields}
          />
          <div className="text-danger fw-semibold">{caseCategoryError}</div>
        </Form.Group>
        <Form.Group
          className=" mw-230px flex-grow-3 text-capitalize create-btn-clr fw-medium wide-img-feild"
          controlId="validationCustom01"
        >
          <UploadFeildUpdate
            onUpload={handleFileUpload}
            oldUploadedFiles={uploadedFiles}
            allowVideos={false}
            feildType="wide-input-feild"
            setError={setError}
            setValidated={setValidated}
            disabled={disableFields}
          />

          <div className="text-danger fw-semibold">{error}</div>
        </Form.Group>
        <Form.Group
          as={Col}
          className="my-3  text-capitalize create-btn-clr fw-medium "
          md="12"
          controlId="validationCustom01"
        >
          <Form.Label>{t("category_name")}</Form.Label>
          <Form.Control
            required
            type="text"
            className={`h-48 text-color2 fw-semibold ${isRTL?"text-end":"text-start"}`}
            placeholder={t("write")}
            value={caseSubCategoryName}
            disabled={disableFields}
            onChange={(e) => setcaseSubCategoryName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {t("please_choose_valid_case_name")}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      {type === "update" ? (
        <Button
          customClass="btn-h48-s15 btn-lg px-3"
          value={t("update")}
          icon="TbEditCircle"
          buttonType="update"
          type="button"
          typeAttribute="submit"
        />
      ) : null}
    </Form>
  );
};

export default UpdateCaseSubCategory;
