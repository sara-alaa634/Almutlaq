import React from "react";
import { useTranslation } from "react-i18next";
import StatisticCard from "../../Components/SharedComponents/StatisticCard";
const ClientsAndUsers = ({statistics}) => {
  const { t } = useTranslation();

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h2 className="home-card-header text-capitalize">
          {t("Clients and Users")}
        </h2>
        <div className="row mt-md-4 mb-3 mt-3 pt-1">
          <div className="col-12 col-md-6 col-lg-6 col-xl-4">
            <StatisticCard
              className=" mb-md-0 mb-2 w-100 "
              color="var(--statistic-c1)"
              backgroundColor="var(--statistic-bg1)"
              name={t("active_clients")}
              value={statistics.active_clients}
              icon="FaCheck"
              href="/users/clients"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-4 mt-md-0 mt-3">
            <StatisticCard
              className=" mb-md-0 mb-2 w-100 "
              color="var(--statistic-c2)"
              backgroundColor="var(--statistic-bg2)"
              name={t("inActive_clients")}
              value={statistics.inactive_clients}
              icon="MdClose"
              href="/users/clients"

            />
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-4 mt-xl-0 mt-3">
            <StatisticCard
              className=" mb-md-0 mb-2 w-100 "
              color="var(--statistic-c1)"
              backgroundColor="var(--statistic-bg1)"
              name={t("active_users")}
              value={statistics.all_users}
              icon="FiUserCheck"
              href="/users/clients"

            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsAndUsers;
