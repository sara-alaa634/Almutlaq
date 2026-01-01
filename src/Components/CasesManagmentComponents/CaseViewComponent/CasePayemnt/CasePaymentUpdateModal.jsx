import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "../../../SharedComponents/Buttons/Button";
import { useCases } from "../../../../Hooks/useCases";
import LogoLoader from "../../../../helpers/loader";

const CasePaymentUpdateModal = ({
  show,
  onHide,
  oldCasePaymentData = {},
  setData,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [casePaymentAmount, setcasePaymentAmount] = useState(
    oldCasePaymentData.required_amount || ""
  );
  const [casePaymentAmountPaid, setcasePaymentAmountPaid] = useState(
    oldCasePaymentData.paid_amount || ""
  );
  const [casePaymentDate, setcasePaymentDate] = useState(
    oldCasePaymentData.payment_date || ""
  );
  const [casePaymentDescription, setcasePaymentDescription] = useState(
    oldCasePaymentData.payment_details || ""
  );
  const [casePaymentMethod, setCasePaymentMethod] = useState(
    oldCasePaymentData.payment_method || ""
  );
  const [selectedState, setSeletedState] = useState(
    oldCasePaymentData.action || ""
  );
  const [validated, setValidated] = useState(false);
  const [paidState, setpaidState] = useState(false);
  const { editCasePayment, loading } = useCases();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      casePaymentAmount === "" ||
      casePaymentDescription === "" ||
      casePaymentDate === ""
    ) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      if (selectedState === "payment") {
        if (
          casePaymentAmountPaid === "" ||
          casePaymentAmountPaid === null ||
          casePaymentMethod === "" ||
          casePaymentMethod === null
        ) {
          event.preventDefault();
          event.stopPropagation();
          setValidated(true);
        }
      }
      setValidated(false);
      const response = await editCasePayment(
        oldCasePaymentData.id,
        casePaymentAmount,
        casePaymentDescription,
        casePaymentDate,
        casePaymentAmountPaid,
        casePaymentMethod,
        selectedState
      );
      setData((prev) =>
        prev.map((item) =>
          item.id === oldCasePaymentData.id
            ? {
                ...item,
                action: response.data.action,
                paid_amount: response.data.paid_amount,
                payment_date: response.data.payment_date,
                payment_details: response.data.payment_details,
                payment_method: response.data.payment_method,
                required_amount: response.data.required_amount,
                updated_at: response.data.updated_at,
              }
            : item
        )
      );
    }
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSeletedState(value);
    // Reset validation if the value is correct
    if (value !== "") {
      if (value === "payment") {
        setpaidState(true);
      } else {
        setpaidState(false);
      }
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
          <Row className="w-100">
            <Col md={11}>
              <Row className="mb-3 row">
                <Form.Group
                  className="mb-3 mw-230px flex-grow-3 text-capitalize create-btn-clr fw-medium "
                  controlId="validationCustom01"
                  as={Col}
                  md="4"
                >
                  <Form.Label
                    className={`w-100 ${isRTL ? "text-end" : "text-start"}`}
                  >
                    {t("Amount")}
                  </Form.Label>
                  <Form.Control
                    className={`btn-h48-s15 text-capitalize text-color2 fw-semibold ${
                      isRTL ? "text-end" : "text-start"
                    }`}
                    required
                    type="number"
                    step="0.001"
                    value={casePaymentAmount}
                    placeholder={t("Amount")}
                    onChange={(e) => setcasePaymentAmount(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t("please_choose_valid_case_amount")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3 mw-230px flex-grow-5 text-capitalize create-btn-clr fw-medium "
                  controlId="validationCustom02"
                  as={Col}
                  md="4"
                >
                  <Form.Label
                    className={`w-100 ${isRTL ? "text-end" : "text-start"}`}
                  >
                    {t("Paid_Details")}
                  </Form.Label>
                  <Form.Control
                    className={`btn-h48-s15 text-capitalize text-color2 fw-semibold ${
                      isRTL ? "text-end" : "text-start"
                    }`}
                    required
                    type="text"
                    value={casePaymentDescription}
                    placeholder={t("Paid_Details")}
                    onChange={(e) => setcasePaymentDescription(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t("please_choose_valid_case_status_description")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3 mw-230px flex-grow-3 text-capitalize create-btn-clr fw-medium "
                  controlId="validationCustom05"
                  as={Col}
                  md="4"
                >
                  <Form.Label
                    className={`w-100 ${isRTL ? "text-end" : "text-start"}`}
                  >
                    {t("Payment_date")}
                  </Form.Label>
                  <Form.Control
                    className="btn-h48-s15 text-color2 fw-semibold text-capitalize"
                    required
                    type="date"
                    value={casePaymentDate}
                    placeholder={t("Payment_date")}
                    dir={isRTL ? "rtl" : "ltr"}
                    onChange={(e) => setcasePaymentDate(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t("please_choose_valid_case_payment_date")}
                  </Form.Control.Feedback>
                </Form.Group>
                {paidState && paidState ? (
                  <>
                    <Form.Group
                      className="mb-3 mw-230px flex-grow-3 text-capitalize create-btn-clr fw-medium "
                      controlId="validationCustom03"
                      as={Col}
                      md="4"
                    >
                      <Form.Label
                        className={`w-100 ${isRTL ? "text-end" : "text-start"}`}
                      >
                        {t("Amount_paid")}
                      </Form.Label>
                      <Form.Control
                        className={`btn-h48-s15 text-capitalize text-color2 fw-semibold ${
                          isRTL ? "text-end" : "text-start"
                        }`}
                        required
                        type="number"
                        step="0.001"
                        value={casePaymentAmountPaid}
                        placeholder={t("Amount_paid")}
                        onChange={(e) =>
                          setcasePaymentAmountPaid(e.target.value)
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("please_choose_valid_case_amount")}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="mb-3 mw-230px flex-grow-3 text-capitalize create-btn-clr fw-medium "
                      controlId="validationCustom04"
                      as={Col}
                      md="4"
                    >
                      <Form.Label
                        className={`w-100 ${isRTL ? "text-end" : "text-start"}`}
                      >
                        {t("payment_method")}
                      </Form.Label>
                      <Form.Control
                        className={`btn-h48-s15 text-capitalize text-color2 fw-semibold ${
                          isRTL ? "text-end" : "text-start"
                        }`}
                        required
                        type="text"
                        value={casePaymentMethod}
                        placeholder={t("payment_method")}
                        onChange={(e) => setCasePaymentMethod(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("please_choose_valid_case_amount")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                ) : null}
              </Row>
            </Col>

            <Form.Group
              className="text-capitalize flex-frow-1  fw-medium d-flex align-items-center justify-content-center no-validation-icon"
              as={Col}
              md="1"
            >
              <select
                className=" btn-h48-s15 bg-transparent text-color2 fw-semibold border rounded-3 px-2 text-capitalize mt-3 text-center mb-3 no-validation-icon"
                aria-label="Default select example"
                required
                value={selectedState}
                placeholder={t("Choosing_a_state")}
                onChange={handleSelectChange}
                dir={isRTL ? "rtl" : "ltr"}
              >
                <option value="request">{t("request")}</option>
                <option value="payment">{t("pay")}</option>
              </select>
            </Form.Group>
          </Row>
          <div className="d-flex justify-content-end gap-4">
            <Button
              customClass="btn-h48-s15 btn-lg"
              value={paidState ? t("save") : t("send")}
              icon={paidState ? "FaCheck" : "LuArrowRight"}
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

export default CasePaymentUpdateModal;
