import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../Components/SharedComponents/BreadCrumb";
import CaseForm from "../../Components/CasesManagmentComponents/CasesComponents/CaseForm";
import { useCases } from "../../Hooks/useCases";
import LogoLoader from "../../helpers/loader";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";
const CaseUpdate = () => {
  const [oldCaseData, setOldCaseData] = useState({});
  const { t } = useTranslation();
  const { id } = useParams();
  const { fetchCase, loading, error } = useCases();

  useEffect(() => {
    const getOldCase = async () => {
      const data = await fetchCase(id);
      setOldCaseData(data);
    };

    getOldCase();
  }, []);

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("update_case")}
          icon="TbFileDollar"
          listItem1={t("Case_Management")}
          listItem2={t("update_case")}
        />
        {Object.keys(oldCaseData).length !== 0 ? (
          <CaseForm type="update" oldData={oldCaseData} />
        ) : null}
      </div>
    </Layout>
  );
};

export default CaseUpdate;
