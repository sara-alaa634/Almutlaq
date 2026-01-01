import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../Components/SharedComponents/BreadCrumb";
import { useGeneral } from "../../Hooks/useGeneral";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";
import LogoLoader from "../../helpers/loader";
import NotificationForm from "../../Components/EmailNotification/NotificationForm";
import { useParams } from "react-router-dom";
import { useHasPermission } from "../../Hooks/usePermissions";
import { permissionsNames } from "../../helpers/constants";

const UpdateNotification = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { editNotification, fetchSingleNotification, loading, error } =
    useGeneral();
  const [userData, setUserData] = useState({});
  const { hasPermission } = useHasPermission();
  const hasUpdatePermission = hasPermission(permissionsNames.notifications.edit);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await fetchSingleNotification(id);
      setUserData(data);
    };
    fetchUserData();
  }, []);
  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("Notification update")}
          icon="TbFileDollar"
          listItem1={t("Notification update")}
          arrow={false}
        />
        <div className="card  bg-transparent shadow-none">
          <div className="card-body">
            {hasUpdatePermission ? (
              <div className="row">
                <div className="col-12 col-md-8 col-lg-7">
                  {userData ? (
                    <NotificationForm
                      type="update"
                      oldData={userData}
                      editNotification={editNotification}
                    />
                  ) : null}
                </div>
              </div>
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

export default UpdateNotification;
