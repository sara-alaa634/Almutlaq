import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../Components/SharedComponents/BreadCrumb";
import "../../Assets/Css/usersManagment.css";
import UserCasesCard from "../../Components/SharedComponents/UserCasesCard";
import UserUpdateForm from "../../Components/UsersManagmentComponents/UserView/UserViewForm";
import { useParams } from "react-router-dom";
import { useUsers } from "../../Hooks/useUsers";
import LogoLoader from "../../helpers/loader";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";

const UserView = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { fetchUserProfile,fetchUserProfileCases, loading, error } = useUsers();
  const [userData, setUserData] = useState([]);
  const [userCasesData,setUserCasesData]=useState([]);
  useEffect(() => {
    handleUserData(id);
    handleUserCasesData(id);
  }, []);

  const handleUserData = async (id) => {
    const response = await fetchUserProfile(id);

    setUserData(response);
  };
  const handleUserCasesData = async (id) => {
    const response = await fetchUserProfileCases(id);
    setUserCasesData(response);
  };
  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("user_view")}
          icon="TbUsers"
          listItem1={t("User_management")}
          listItem2={t("user_view")}
        />
        <div className="card">
          <div className="card-body">
            {/* Nav tabs  */}
            <ul className="nav nav-tabs border-0 gap-3">
              <li className="nav-item">
                <a
                  className="nav-link px-md-5 px-3 rounded fw-medium text-capitalize user-view-tab active"
                  id="userInfo-tab"
                  data-bs-toggle="tab"
                  href="#userInfo"
                  role="tab"
                  aria-controls="userInfo"
                  aria-selected="true"
                >
                  {t("info")}
                </a>
              </li>
              {userCasesData.length !== 0 && userData.user_type === "client" ? (
                <li className="nav-item">
                  <a
                    className="nav-link px-md-5 px-3 rounded fw-medium user-view-tab text-capitalize"
                    id="userCases-tab"
                    data-bs-toggle="tab"
                    href="#userCases"
                    role="tab"
                    aria-controls="userCases"
                    aria-selected="false"
                  >
                    {t("cases")}
                  </a>
                </li>
              ) : null}
            </ul>

            {/* Tab panes */}

            <div className="tab-content mt-3">
              <div
                className="tab-pane fade show active"
                id="userInfo"
                role="tabpanel"
                aria-labelledby="userInfo-tab"
              >
                <UserUpdateForm user={userData} />
              </div>
              {(userCasesData.length !== 0 && userData.user_type === "client")  ? (
                <div
                  className="tab-pane fade"
                  id="userCases"
                  role="tabpanel"
                  aria-labelledby="userCases-tab"
                >
              
                  <div className=" py-4">
                    {userCasesData
                      ? userCasesData.map((userCase) => (
                          <UserCasesCard
                            userCase={userCase}
                            key={userCase.id}
                          />
                        ))
                      : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserView;
