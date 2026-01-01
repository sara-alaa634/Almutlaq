import { useEffect, useState } from "react";
import StatisticCard from "../../Components/SharedComponents/StatisticCard";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../Components/SharedComponents/BreadCrumb";
import ClientsTable from "../../Components/UsersManagmentComponents/ClientsComponents/ClientsTable";
import LogoLoader from "../../helpers/loader";
import { useUsers } from "../../Hooks/useUsers";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";

const Clients = () => {
  const { t } = useTranslation();
  const {
    fetchFilteredUsersPage,
    fetchFilteredUsers,
    fetchUsersCounts,
    switchUserState,
    removeUser,
    loading,
    error,
  } = useUsers();
  const [usersStatistics, setUsersStatistics] = useState({});

  useEffect(() => {
    const getUsersStatistics = async (userType) => {
      const userData = await fetchUsersCounts(userType);
      setUsersStatistics(userData);
    };
    getUsersStatistics("client");
  }, []);
  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("clients")}
          icon="TbUsers"
          listItem1={t("User_management")}
          listItem2={t("the_clients")}
        />
        {usersStatistics && (
          <section className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3 pe-sm-2 pe-0">
              <StatisticCard
                className="w-100 mb-md-0 mb-2"
                color="var(--statistic-c1)"
                backgroundColor="var(--statistic-bg1)"
                name={t("Active_clients")}
                value={usersStatistics.online_count}
                icon="FaCheck"
              />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3 px-sm-2 px-0">
              <StatisticCard
                className="w-100 mb-md-0 mb-2"
                color="var(--statistic-c2)"
                backgroundColor="var(--statistic-bg2)"
                name={t("Inactive_clients")}
                value={usersStatistics.offline_count}
                icon="MdClose"
              />
            </div>
          </section>
        )}

        <div className="card ">
          <ClientsTable
            fetchFilteredUsersPage={fetchFilteredUsersPage}
            fetchFilteredUsers={fetchFilteredUsers}
            removeUser={removeUser}
            switchUserState={switchUserState}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Clients;
