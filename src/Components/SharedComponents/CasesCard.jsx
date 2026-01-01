import React from "react";
import { useTranslation } from "react-i18next";

const CasesCard = ({ caseData }) => {
  const { t } = useTranslation();

  return (
    <div className="card custom-card mb-3" key={caseData.id}>
      <div className="card-body">
      <div
          className={
            caseData.case_type === "1"
              ? "ongoing-case bg-transparent fw-semibold fw-6 mb-3"
              : caseData.case_type === "2"
              ? "inactive-case bg-transparent fw-semibold fw-6 mb-3"
              : "active-case bg-transparent fw-semibold  fw-6 mb-3"
          }
        >
          {caseData.case_type === "1" ? t("ongoing_case") : t("finished_case")}
        </div>
        <div className="case-header create-btn-clr mb-2 fw-bold fs-4">
          {caseData.title}
        </div>
        <div className="case-description fw-normal fs-6  mc-3-clr mb-3">
          {caseData.description}
        </div>
      </div>
    </div>
  );
};

export default CasesCard;
