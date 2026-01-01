import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Button from "../../../SharedComponents/Buttons/Button";
import { useUsers } from "../../../../Hooks/useUsers";
import { useCases } from "../../../../Hooks/useCases";
import LogoLoader from "../../../../helpers/loader";

const CaseStatusUpdateModal = ({ show, onHide, caseID, oldCaseState = {},data,setData }) => {
  const { t } = useTranslation();
  const [caseStatusName, setCaseStatusName] = useState(oldCaseState.title);
  const [caseStatusDescription, setCaseStatusDescription] = useState(
    oldCaseState.description
  );
  const [selectedLawyer, setSeletedLawyer] = useState(
    Object.keys(oldCaseState).length ? oldCaseState.lawyer.id : ""
  );
  const [validated, setValidated] = useState(false);
  const { fetchFilteredUsers, users } = useUsers();
  const { editCaseStates, loading } = useCases();

  useEffect(() => {
    const getLawyers = async () => {
      await fetchFilteredUsers("work team");
    };
    getLawyers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      caseStatusName === "" ||
      caseStatusDescription === ""
    ) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
     const response= await editCaseStates(
        oldCaseState.id,
        caseID,
        caseStatusName,
        caseStatusDescription,
        selectedLawyer
      );
      const newLawyer=users.find((lawyer)=>lawyer.id.toString() === response.data.lawyer_id.toString())
      setData((prev)=>prev.map((item)=> item.id === oldCaseState.id ?{
        ...item,
        title:response.data.title,
        description:response.data.description,
        lawyer:newLawyer?newLawyer:null
      }:item))
    }
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSeletedLawyer(value);
    if (value !== "") {
      setValidated(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="px-sm-5 px-3">
      {loading && <LogoLoader loading={loading} />}
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
              <Form.Label>{t("case_status")}</Form.Label>
              <Form.Control
                className="btn-h48-s15 text-color2 fw-semibold text-capitalize"
                required
                type="text"
                value={caseStatusName}
                placeholder={t("case_status")}
                onChange={(e) => setCaseStatusName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {t("please_choose_valid_case_status")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3 mw-230px flex-grow-5 text-capitalize create-btn-clr fw-medium "
              controlId="validationCustom02"
            >
              <Form.Label>{t("status_description")}</Form.Label>
              <Form.Control
                className="btn-h48-s15 text-color2 fw-semibold text-capitalize"
                required
                type="text"
                value={caseStatusDescription}
                placeholder={t("status_description")}
                onChange={(e) => setCaseStatusDescription(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {t("please_choose_valid_case_status_description")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="text-capitalize flex-frow-3  fw-medium"
              controlId="validationCustom05"
            >
              <Form.Select
                className=" btn-h48-s15 bg-transparent text-color2 fw-semibold border text-capitalize mt-3 text-center"
                aria-label="Default select example"
                required
                value={selectedLawyer}
                placeholder={t("Choosing_a_lawyer")}
                onChange={handleSelectChange}
                isInvalid={validated && selectedLawyer === ""}
                isValid={validated && selectedLawyer !== ""} // Add isValid to prevent success class
              >
                <option value="">{t("Choosing_a_lawyer")}</option>
                {users && users.length !== 0 ? (
                  users.map((lawyer) => (
                    <option value={lawyer.id} key={lawyer.id}>
                      {lawyer.name}
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
          </div>
          <div className="d-flex justify-content-end gap-4">
            <Button
              customClass="btn-h48-s15 btn-lg"
              value={t("save")}
              icon="LuArrowRight"
              buttonType="submit"
              type="button"
              typeAttribute="submit"
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CaseStatusUpdateModal;
