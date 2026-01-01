import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Button from "../../../SharedComponents/Buttons/Button";
import UploadFileCreate from "../../../SharedComponents/Uploads/UploadAnyFileType/UploadFileCreate";
import { useCases } from "../../../../Hooks/useCases";
import LogoLoader from "../../../../helpers/loader";
import { getCurrentData } from "../../../../helpers/formatDate";
import { errorMessages } from "../../../../helpers/messages";
import { useUser } from "../../../../Context/userContext";

const CaseAttachmentsModal = ({ show, onHide, caseID, setData }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";  const [caseAttachmentName, setAttachmentStatusName] = useState("");
  const [selectedState, setSeletedState] = useState("request");
  const [uploadState, setUploadState] = useState(false);
  const [validated, setValidated] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState("");
  const { addCaseFile, loading } = useCases();
  const { userData } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      caseAttachmentName === "" ||
      selectedState === t("Choosing_a_state")
    ) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setError("");
    } else {
      if (selectedState === "request") {
        setValidated(false);
        setError("");
        const response = await addCaseFile(
          caseID,
          caseAttachmentName,
          null,
          null,
          "request"
        );
        setUploadedFile(null);
        setAttachmentStatusName("");
        setSeletedState("request");
        setUploadState(false);
        setData((prev) => [
          {
            id: response.data.data.id,
            added_by: userData,
            case_id: response.data.data.case_id,
            created_at: response.data.data.created_at,
            action: "request",
            file_name: response.data.data.file_name,
            file_path: null,
            file_size: null,
            status: 1,
          },
          ...prev,
        ]);
      } else {
        if (uploadedFile === null) {
          setValidated(true);
          setError(t(errorMessages.requiredFeild));
        } else {
          setValidated(false);
          setError("");
          const response = await addCaseFile(
            caseID,
            caseAttachmentName,
            getCurrentData(),
            uploadedFile,
            "upload"
          );
          setData((prev) => [
            {
              id: response.data.data.id,
              added_by: userData,
              case_id: response.data.data.case_id,
              created_at: response.data.data.created_at,
              action: "upload",
              file_name: response.data.data.file_name,
              file_path: response.data.data.file_path,
              file_size: response.data.data.file_size,
              file_upload_date: response.data.data.file_upload_date,
              status: 1,
            },
            ...prev,
          ]);
          setUploadedFile(null);
          setAttachmentStatusName("");
          setSeletedState("request");
          setUploadState(false);
        }
      }
    }
  };

  // Callback function to handle file uploads
  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSeletedState(value);
    // Reset validation if the value is correct
    if (value !== "" && value !== t("Choosing_a_state")) {
      if (value === "add") {
        setUploadState(true);
      } else {
        setUploadState(false);
      }
      setValidated(false);
    }
  };
  return (
    <Modal show={show} onHide={onHide} centered className="px-sm-5 px-3">
      {loading && <LogoLoader loading={loading} />}
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form
          className="w-100 my-3"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <div className="mb-3 w-100 d-flex  flex-wrap justify-content-between align-items-center gap-4">
            <Form.Group
              className="mb-3 mw-230px flex-grow-3 text-capitalize create-btn-clr fw-medium "
              controlId="validationCustom01"
            >
              <Form.Label className={`w-100 ${isRTL?"text-end":"text-start"}`}>{t("Required_file_name")}</Form.Label>
              <Form.Control
                required
                className={`btn-h48-s15 text-capitalize h-48 text-color2 fw-semibold ${isRTL?"text-end":"text-start"}`}
                type="text"
                value={caseAttachmentName}
                placeholder={t("Required_file_name")}
                onChange={(e) => setAttachmentStatusName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {t("please_choose_valid_case_attachment_name")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="text-capitalize flex-frow-1  fw-medium"
              controlId="validationCustom05"
            >
              <Form.Select
                className=" btn-h48-s15 bg-transparent fw-medium create-btn-clr border text-capitalize mt-3 text-center"
                aria-label="Default select example"
                required
                value={selectedState}
                placeholder={t("Choosing_a_state")}
                onChange={handleSelectChange}
                isInvalid={
                  validated &&
                  (selectedState === "" ||
                    selectedState === t("Choosing_a_state"))
                }
                isValid={
                  validated &&
                  selectedState !== "" &&
                  selectedState !== t("Choosing_a_state")
                }
              >
                <option value={t("Choosing_a_state")}>
                  {t("Choosing_a_state")}
                </option>
                <option value="request">{t("request")}</option>
                <option value="add">{t("add")}</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {t("Please select a valid option.")}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          {uploadState ? (
            <Form.Group
              className="mb-3 mw-230px flex-grow-3 text-capitalize create-btn-clr fw-medium "
              controlId="validationCustom01"
            >
              <UploadFileCreate
                onUpload={handleFileUpload}
                allowVideos={false}
                setError={setError}
                setValidated={setValidated}
              />
              <div className="text-danger fw-semibold">{error}</div>
            </Form.Group>
          ) : null}
          <div className="d-flex justify-content-end gap-4">
            <Button
              customClass="btn-h48-s15 btn-lg"
              value={uploadState ? t("save") : t("send")}
              icon={uploadState ? "FaCheck" : "LuArrowRight"}
              buttonType="create"
              type="button"
              typeAttribute="submit"
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CaseAttachmentsModal;
