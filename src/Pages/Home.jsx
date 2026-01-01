import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../Layout/Layout";
import BreadCrumb from "../Components/SharedComponents/BreadCrumb";
import HomeMainWrapper from "../Components/Home/HomeMainWrapper";
import { useGeneral } from "../Hooks/useGeneral";
import LogoLoader from "../helpers/loader";
import ErrorComponents from "../Components/SharedComponents/ErrorComponent";

const Home = () => {
  const { t } = useTranslation();
  const [statistics, setStatistics] = useState(null);
  const { fetchHomeStatistics, loading, error } = useGeneral();

  useEffect(() => {
    const handleStatisticsData = async () => {
      const response = await fetchHomeStatistics();
      setStatistics(response);
    };
    handleStatisticsData();
  }, []);
  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}

      <div className="container">
        <BreadCrumb
          icon="TbDashboard"
          listItem1={t("Statistics")}
          arrow={false}
        />
        {statistics && <HomeMainWrapper statistics={statistics} />}
      </div>
    </Layout>
  );
};

export default Home;
