import React, { useEffect, useState } from "react";
import StatisticsSection from "../../Components/CasesManagmentComponents/CasesComponents/StatisticsSection";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../Components/SharedComponents/BreadCrumb";
import CasesTable from '../../Components/CasesManagmentComponents/CasesComponents/CasesTable'
import { useCases } from "../../Hooks/useCases";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";
import LogoLoader from "../../helpers/loader";

const Cases = () => {
  const { t } = useTranslation();
  const [casesCounts, setCasesCounts] = useState({});
  const { fetchCasesCounts,fetchExportCasesData,fetchCases,fetchFilteredCases, editCaseState, removeCase, loading, error } =useCases();

  useEffect(() => {
    const handelCasesCounts = async () => {
      const counts = await fetchCasesCounts();
      if (counts) {
        setCasesCounts(counts);
      }
    };
    handelCasesCounts();
  }, []);

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("cases")}
          icon="TbFileDollar"
          listItem1={t("Case_Management")}
          listItem2={t("cases")}
        />
         {Object.keys(casesCounts).length !== 0 && (
          <StatisticsSection casesCounts={casesCounts} t={t} />
        )}
        <div className="card ">
            <CasesTable  fetchCases={fetchCases} fetchFilteredCases={fetchFilteredCases} fetchExportCasesData={fetchExportCasesData} editCaseState={editCaseState} removeCase={removeCase}/>
        </div>
      </div>
    </Layout>
  );
};

export default Cases;
