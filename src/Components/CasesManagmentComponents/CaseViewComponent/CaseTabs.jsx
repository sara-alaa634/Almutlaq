import React from "react";
import { useTranslation } from "react-i18next";
import "../../../Assets/Css/CasesManagment.css";
import CasePayemnt from "./CasePayemnt/CasePayemnt";
import CaseAttachments from "./CaseAttachments/CaseAttachments";
import CaseStatus from "./CaseStatus/CaseStatus";
const CaseTabs = ({ caseID }) => {
  const { t } = useTranslation();

  return (
    <section className="case-tabs-wrapper mt-3">
      <ul className="nav nav-tabs border-0 gap-3">
        <li className="nav-item">
          <a
            className="nav-link px-sm-3 px-0 text-capitalize fw-semibold nav-case-tab fs-5   active"
            id="caseStatus-tab"
            data-bs-toggle="tab"
            href="#caseStatus"
            role="tab"
            aria-controls="caseStatus"
            aria-selected="true"
          >
            {t("Case_status")}
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link  px-sm-3 px-0 text-capitalize nav-case-tab fw-semibold fs-5 "
            id="caseAttachments-tab"
            data-bs-toggle="tab"
            href="#caseAttachments"
            role="tab"
            aria-controls="caseAttachments"
            aria-selected="false"
          >
            {t("case_attachments")}
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link  px-sm-3 px-0 text-capitalize nav-case-tab fw-semibold fs-5  "
            id="CasePayments-tab"
            data-bs-toggle="tab"
            href="#CasePayments"
            role="tab"
            aria-controls="CasePayments"
            aria-selected="false"
          >
            {t("Case_payments")}
          </a>
        </li>
      </ul>
      <div className="tab-content mt-3">
        <div
          className="tab-pane fade show active"
          id="caseStatus"
          role="tabpanel"
          aria-labelledby="caseStatus-tab"
        >
          <CaseStatus caseID={caseID} />
        </div>
        <div
          className="tab-pane fade show "
          id="caseAttachments"
          role="tabpanel"
          aria-labelledby="caseAttachments-tab"
        >
          <CaseAttachments caseID={caseID} />
        </div>
        <div
          className="tab-pane fade show "
          id="CasePayments"
          role="tabpanel"
          aria-labelledby="CasePayments-tab"
        >
          <CasePayemnt caseID={caseID} />
        </div>
      </div>
    </section>
  );
};

export default CaseTabs;
