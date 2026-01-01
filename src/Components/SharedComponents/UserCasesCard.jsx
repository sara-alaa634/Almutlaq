import React from "react";
import { useTranslation } from "react-i18next";
import { useHasPermission } from "../../Hooks/usePermissions";
import { permissionsNames } from "../../helpers/constants";

const   UserCasesCard = ({ userCase }) => {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
  const hasViewCasesPermission = hasPermission(permissionsNames.cases.view);

  return (
    <div className="card custom-card mb-3" key={userCase.id}>
      <div className="card-body">
        <div className="case-header create-btn-clr mb-2 fw-bold fs-4">
          {userCase.title}
        </div>
        <div
          className={
            userCase.case_type === "1"
              ? "active-case bg-transparent fw-bold fw-6 mb-3"
              : userCase.case_type === "2"
              ? "inactive-case bg-transparent fw-bold fw-6 mb-3"
              : "active-case bg-transparent fw-bold fw-6 mb-3"
          }
        >
          {userCase.case_type === "1" ? t("ongoing") : t("ended")}
        </div>
        <div className="case-description mc-1-clr mb-3">
          {userCase.description}
        </div>
       {
        hasViewCasesPermission && (
          <a
          className="sc-1-clr fs-5 fw-semibold"
          href={`/cases/case-view/${userCase.id}`}
        >
          {t("View case details")}
        </a>
        )
       }
      </div>
    </div>
  );
};

export default UserCasesCard;
