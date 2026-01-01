import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../Assets/Css/CasesManagment.css";
import CreateRole from "./CreateRole";
import ViewRoles from "./ViewRoles";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const RoleComponent = ({ addRole, rolesData }) => {
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();
  const hasCreatePermission = hasPermission(permissionsNames.role.create);
  const hasViewPermission = hasPermission(permissionsNames.role.view);

  return (
    <section>
      <ul className="nav nav-tabs border-0 gap-3">
        {hasCreatePermission ? (
          <li className="nav-item">
            <a
              className="nav-link px-md-5 px-3 rounded fw-medium user-view-tab text-capitalize active"
              id="createRole-tab"
              data-bs-toggle="tab"
              href="#createRole"
              role="tab"
              aria-controls="createRole"
              aria-selected="true"
            >
              {t("create_role")}
            </a>
          </li>
        ) : null}
        {hasViewPermission ? (
          <li className="nav-item">
            <a
              className="nav-link px-md-5 px-3 rounded fw-medium user-view-tab text-capitalize "
              id="viewRoles-tab"
              data-bs-toggle="tab"
              href="#viewRoles"
              role="tab"
              aria-controls="viewRoles"
              aria-selected="false"
            >
              {t("view_roles")}
            </a>
          </li>
        ) : null}
      </ul>
      <div className="tab-content mt-3">
        {hasCreatePermission ? (
          <div
            className="tab-pane fade show active"
            id="createRole"
            role="tabpanel"
            aria-labelledby="createRole-tab"
          >
            <CreateRole addRole={addRole} />
          </div>
        ) : null}
        {hasViewPermission ? (
          <div
            className="tab-pane fade show "
            id="viewRoles"
            role="tabpanel"
            aria-labelledby="viewRoles-tab"
          >
            <ViewRoles data={rolesData} />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default RoleComponent;
