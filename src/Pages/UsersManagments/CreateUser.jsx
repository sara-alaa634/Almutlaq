import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../Components/SharedComponents/BreadCrumb";
import CreateUserForm from "../../Components/UsersManagmentComponents/CreateUser/CreateUserForm";
import { useUsers } from "../../Hooks/useUsers";
import LogoLoader from "../../helpers/loader";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";
import { useHasPermission } from "../../Hooks/usePermissions";
import { permissionsNames } from "../../helpers/constants";

const CreateUser = () => {
  const { t } = useTranslation();
  const { createUser, fetchRoles, loading, error } = useUsers();
  const { hasPermission } = useHasPermission();
  const hasCreatePermission = hasPermission(permissionsNames.users.create);

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("Create_a_user")}
          icon="TbUsers"
          listItem1={t("User_management")}
          listItem2={t("Create_a_user")}
        />
        <div className="card">
          <div className="card-body">
            {hasCreatePermission ? (
              <CreateUserForm createUser={createUser} fetchRoles={fetchRoles} />
            ) : (
              <div className="fw-bold fs-4 text-center text-capitalize py-3">
                {t("you are not allowed to see this page")}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateUser;
