import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../Components/SharedComponents/BreadCrumb";
import RoleComponent from "../../Components/UsersManagmentComponents/Roles/RoleComponent";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";
import LogoLoader from "../../helpers/loader";
import { useUsers } from "../../Hooks/useUsers";

const Roles = () => {
  const { t } = useTranslation();
  const { addRole, fetchRoles, loading, error } = useUsers();
  const [rolesData, setRolesData] = useState([]);

  useEffect(() => {
    const handleFetchRoles = async () => {
      const roles = await fetchRoles();
      setRolesData(roles);
    };
    handleFetchRoles();
  }, []);

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("create_role")}
          icon="TbUsers"
          listItem1={t("User_management")}
          listItem2={t("create_role")}
        />
        <div className="card">
          <div className="card-body">
            {rolesData && <RoleComponent addRole={addRole} rolesData={rolesData} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Roles;
