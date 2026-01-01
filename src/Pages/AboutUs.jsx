import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../Layout/Layout";
import BreadCrumb from "../Components/SharedComponents/BreadCrumb";
import AboutUsWrapper from "../Components/AboutUS/AboutUsWrapper";
import { useGeneral } from "../Hooks/useGeneral";
import LogoLoader from "../helpers/loader";
import ErrorComponents from "../Components/SharedComponents/ErrorComponent";

const AboutUs = () => {
  const { t } = useTranslation();
  const { fetchAboutUsData, addNewAboutData, loading, error } = useGeneral();
  const [aboutData, setAboutData] = useState({});
  useEffect(() => {
    const handleFetchAboutData = async () => {
      const response = await fetchAboutUsData();
      setAboutData(response);
    };
    handleFetchAboutData();
  }, []);
  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}

      <div className="container">
        <BreadCrumb
          header={t("About the office")}
          icon="TbFileDollar"
          listItem1={t("Office information")}
          listItem2={t("About the office")}
        />
        {aboutData && (
          <AboutUsWrapper
            data={aboutData}
            setData={setAboutData}
            addNewAbout={addNewAboutData}
          />
        )}
      </div>
    </Layout>
  );
};

export default AboutUs;
