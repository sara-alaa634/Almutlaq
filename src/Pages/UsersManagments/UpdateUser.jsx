import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../Components/SharedComponents/BreadCrumb";
import UpdateUserForm from "../../Components/UsersManagmentComponents/UpdateUser/UpdateUserForm";
import { useUsers } from "../../Hooks/useUsers";
import LogoLoader from "../../helpers/loader";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";
import { useParams } from "react-router-dom";
import { useHasPermission } from "../../Hooks/usePermissions";
import { permissionsNames } from "../../helpers/constants";

const UpdateUser = () => {
  const { t } = useTranslation();
  const { editUserProfile, fetchUserProfile, fetchRoles, loading, error } =
    useUsers();
  const { id } = useParams();
  const [oldUserData, setOldUserData] = useState([]);
  const { hasPermission } = useHasPermission();
  const hasUpdatePermission = hasPermission(permissionsNames.users.edit);

  useEffect(() => {
    const handleUserProfileData = async (id) => {
      const response = await fetchUserProfile(id);
      setOldUserData(response);
    };
    handleUserProfileData(id);
  }, []);
  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("update_user")}
          icon="TbUsers"
          listItem1={t("User_management")}
          listItem2={t("update_user")}
        />
        <div className="card">
          {hasUpdatePermission ? (
            <div className="card-body">
              {oldUserData.length !== 0 ? (
                <UpdateUserForm
                  editUserProfile={editUserProfile}
                  fetchRoles={fetchRoles}
                  oldUserData={oldUserData}
                />
              ) : null}
            </div>
          ) : (
            <div className="fw-bold fs-4 text-center text-capitalize py-3">
              {t("you are not allowed to see this page")}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateUser;
