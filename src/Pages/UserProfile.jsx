import { useTranslation } from "react-i18next";
import Layout from "../Layout/Layout";
import BreadCrumb from "../Components/SharedComponents/BreadCrumb";
import ProfileView from "../Components/UserProfile/ProfileView";
import { useUsers } from "../Hooks/useUsers";
import LogoLoader from "../helpers/loader";
import ErrorComponents from "../Components/SharedComponents/ErrorComponent";

const UserProfile = () => {
  const { t } = useTranslation();
  const { editLoggedUserProfile, loading, error } = useUsers();

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}

      <div className="container">
        <BreadCrumb
          icon="HiOutlineHome"
          listItem1={t("my_info")}
          arrow={false}
        />

        <ProfileView editLoggedUserProfile={editLoggedUserProfile} />
      </div>
    </Layout>
  );
};

export default UserProfile;
