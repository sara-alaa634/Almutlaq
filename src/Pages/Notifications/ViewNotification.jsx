import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../Components/SharedComponents/BreadCrumb";
import { useGeneral } from "../../Hooks/useGeneral";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";
import LogoLoader from "../../helpers/loader";
import NotificationViewWrapper from "../../Components/EmailNotification/NotificationViewWrapper";
import { useParams } from "react-router-dom";
import { useHasPermission } from "../../Hooks/usePermissions";
import { permissionsNames } from "../../helpers/constants";

const ViewNotification = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({});
  const { fetchSingleNotification, addNotification, loading, error } =
    useGeneral();
  const { id } = useParams();
  const { hasPermission } = useHasPermission();
  const hasViewPermission = hasPermission(permissionsNames.notifications.view);

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
          header={t("Notification view")}
          icon="TbFileDollar"
          listItem1={t("Notification view")}
          arrow={false}
        />
        <div className="card  bg-transparent shadow-none">
          <div className="card-body">
            {hasViewPermission ? (
              <div className="row">
                <div className="col-12 col-md-8 col-lg-8 col-xl-6">
                  {userData ? (
                    <NotificationViewWrapper
                      addNotification={addNotification}
                      userData={userData}
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

export default ViewNotification;
