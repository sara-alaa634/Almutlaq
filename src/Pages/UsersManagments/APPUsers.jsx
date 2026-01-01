import {useEffect, useState} from "react";
import StatisticCard from "../../Components/SharedComponents/StatisticCard";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../Components/SharedComponents/BreadCrumb";
import LogoLoader from "../../helpers/loader";
import { useUsers } from "../../Hooks/useUsers";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";
import UsersTables from '../../Components/UsersManagmentComponents/AppUser/UsersTables'

const APPUsers = () => {
  const { t } = useTranslation();
  const { fetchFilteredUsersPage,fetchFilteredUsers, fetchUsersCounts,removeUser,loading, error } = useUsers();
  const [usersStatistics,setUsersStatistics]=useState({});

  useEffect(()=>{
    const getUsersStatistics= async (userType)=>{
     const userData= await fetchUsersCounts(userType);
      setUsersStatistics(userData)
    }
    getUsersStatistics("user");
},[])

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}

      <div className="container">
        <BreadCrumb
          header={t("App_users")}
          icon="TbUsers"
          listItem1={t("User_management")}
          listItem2={t("App_users")}
        />
        {
          usersStatistics&& (
            <div className="d-flex flex-sm-row flex-column">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3 pe-sm-2 pe-0">
              <StatisticCard
                className=" mb-md-0 mb-2 w-100 "
                color="var(--statistic-c1)"
                backgroundColor="var(--statistic-bg1)"
                name={t("Active_users")}
                value={usersStatistics.online_count}
                icon="FaCheck"
              />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3 px-sm-2 px-0">
              <StatisticCard
                className="mb-md-0 mb-2 w-100 "
                color="var(--statistic-c2)"
                backgroundColor="var(--statistic-bg2)"
                name={t("inactive_users")}
                value={usersStatistics.offline_count}
                icon="MdClose"
              />
            </div>
          </div>
          )
        }
     
        <div className="card">
        <UsersTables fetchFilteredUsers={fetchFilteredUsers} fetchFilteredUsersPage={fetchFilteredUsersPage} removeUser={removeUser}/> 
        </div>
      </div>
    </Layout>
  );
};

export default APPUsers;
