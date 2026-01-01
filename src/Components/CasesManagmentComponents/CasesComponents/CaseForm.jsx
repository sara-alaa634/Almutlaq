import { useEffect, useState } from "react";
import "../../../Assets/Css/CasesManagment.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";
import Button from "../../SharedComponents/Buttons/Button";
import { useCases } from "../../../Hooks/useCases";
import { useCasesSubCategories } from "../../../Hooks/useCasesSubCategories";
import { useUsers } from "../../../Hooks/useUsers";
import LogoLoader from "../../../helpers/loader";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const CaseForm = ({ type = "create", oldData = {} }) => {
  const [validated, setValidated] = useState(false);
  const [caseName, setCaseName] = useState(oldData.title || "");
  const [selectCaseType, setSelectCaseType] = useState(
    oldData.subcategory_id || ""
  );
  const [caseDescription, setCaseDescription] = useState(
    oldData.description || ""
  );
  const [caseUser, setCaseUser] = useState(oldData.client_id || "");
  const [caseState, setCaseState] = useState(oldData.case_type || "");
  const [casesTypes, setCasesTypes] = useState([]);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { addCase, editCase, loading } = useCases();
  const { fetchAllCasesSubCategoriesIDs } = useCasesSubCategories();
  const { fetchUsers, users } = useUsers();
  const { hasPermission } = useHasPermission();
  const hasCreatePermission = hasPermission(permissionsNames.cases.create);

  useEffect(() => {
    const getCasesTypesIDs = async () => {
      const casesTypes = await fetchAllCasesSubCategoriesIDs();
      if (casesTypes) {
        setCasesTypes(casesTypes);
      }
    };

    const getUsers = async () => {
      await fetchUsers();
    };
    getCasesTypesIDs();
    getUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || selectCaseType === "") {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      if (type === "create") {
        await addCase(
          caseName,
          caseDescription,
          caseState,
          selectCaseType,
          caseUser
        );

        setCaseName("");
        setCaseDescription("");
        setCaseState("");
        setSelectCaseType("");
        setCaseUser("");
      } else {
        await editCase(
          oldData.id,
          caseName,
          caseDescription,
          caseState,
          selectCaseType,
          caseUser
        );
      }
    }
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectCaseType(value);
    if (value !== "") {
      setValidated(false);
    }
  };

  const handleSelectUserChange = (event) => {
    const value = event.target.value;
    setCaseUser(value);
    if (value !== "" && value) {
      setValidated(false);
    }
  };
  const handleSelectStateChange = (event) => {
    const value = event.target.value;
    setCaseState(value);
    if (value !== "") {
      setValidated(false);
    }
  };
  return (
    <>
      {hasCreatePermission ? (
        <Form
          className="w-100"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          {loading && <LogoLoader loading={loading} />}

          <Row className="mb-3">
            <Form.Group
              as={Col}
              className="mb-3 text-capitalize create-btn-clr fw-medium "
              md="12"
              controlId="validationCustom01"
            >
              <Form.Label className={`w-100 ${isRTL?"text-end":"text-start"}`}>{t("case_name")}</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder={t("case_name")}
                value={caseName}
                className={`h-48 text-color2 fw-semibold ${
                  isRTL ? "text-end" : "text-start"
                }`}
                onChange={(e) => setCaseName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {t("please_choose_valid_case_name")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="12"
              className="mb-3 text-capitalize create-btn-clr fw-medium "
              controlId="validationCustom02"
            >
              <Form.Label className={`w-100 ${isRTL?"text-end":"text-start"}`}>{t("case_description")}</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder={t("case_description")}
                value={caseDescription}
                className={`h-48 text-color2 fw-semibold ${
                  isRTL ? "text-end" : "text-start"
                }`}
                rows={5}
                onChange={(e) => setCaseDescription(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {t("please_choose_valid_case_name")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              sm="6"
              md="4"
              className="my-3 text-capitalize fw-medium"
              controlId="validationCustom08"
            >
              <Form.Label className={`w-100 ${isRTL?"text-end":"text-start"}`}>{t("case_type")}</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                value={selectCaseType} // Use the state that stores the selected option
                onChange={handleSelectChange}
                className={`h-48 text-color2 fw-semibold ${
                  isRTL ? "text-end" : "text-start"
                }`}
                isInvalid={validated && selectCaseType === ""}
                isValid={validated && selectCaseType !== ""} // Add isValid to prevent success class
                dir={isRTL ? "rtl" : "ltr"}
              >
                <option value="">{t("choose")}</option>
                {casesTypes && casesTypes.length !== 0 ? (
                  casesTypes.map((caseType) => (
                    <option value={caseType.id} key={caseType.id}>
                      {caseType.name}
                    </option>
                  ))
                ) : (
                  <option value="1">{t("no_data_avilable")}</option>
                )}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {t("Please select a valid option.")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              sm="6"
              md="4"
              className="my-3 text-capitalize fw-medium"
              controlId="validationCustom06"
            >
              <Form.Label className={`w-100 ${isRTL?"text-end":"text-start"}`}>{t("user_name")}</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                value={caseUser}
                onChange={handleSelectUserChange}
                isInvalid={validated && caseUser === ""}
                isValid={validated && caseUser !== ""}
                className={`h-48 text-color2 fw-semibold ${
                  isRTL ? "text-end" : "text-start"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
              >
                <option value="">{t("choose")}</option>
                {users && users.length !== 0 ? (
                  users.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))
                ) : (
                  <option value="1">{t("no_data_avilable")}</option>
                )}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {t("Please select a valid option.")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              sm="6"
              md="4"
              className="my-3 text-capitalize fw-medium"
              controlId="validationCustom06"
            >
              <Form.Label className={`w-100 ${isRTL?"text-end":"text-start"}`}>{t("case_state")}</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                value={caseState}
                onChange={handleSelectStateChange}
                isInvalid={validated && caseState === ""}
                isValid={validated && caseState !== ""}
                className={`h-48 text-color2 fw-semibold ${
                  isRTL ? "text-end" : "text-start"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
              >
                <option value="">{t("choose")}</option>
                <option value="1">{t("ongoing")}</option>
                <option value="2">{t("ended")}</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {t("Please select a valid option.")}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className={`w-100 d-flex ${isRTL ?"justify-content-end":"justify-content-start"}`}>
          {type === "create" ? (
            <Button
              customClass={`btn-h48-s15 btn-lg my-4 `}
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
          </div>
       
        </Form>
      ) : (
        <div className="fw-bold fs-4 text-center text-capitalize py-3">
          {t("you are not allowed to see this page")}
        </div>
      )}
    </>
  );
};

export default CaseForm;
