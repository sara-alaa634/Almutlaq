import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../Components/SharedComponents/BreadCrumb";
import NotificationMainWrapper from "../../Components/EmailNotification/NotificationMainWrapper";
const Notifications = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container">
        <BreadCrumb
          header={t("Notifications")}
          icon="TbFileDollar"
          listItem1={t("Notifications")}
          arrow={false}
        />
        <div className="card  bg-transparent shadow-none">
          <div className="card-body">
            <NotificationMainWrapper />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
