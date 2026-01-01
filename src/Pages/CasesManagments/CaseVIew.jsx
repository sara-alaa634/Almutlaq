import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCases } from "../../Hooks/useCases";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../Components/SharedComponents/BreadCrumb";
import CaseViewInteractionBtns from "../../Components/CasesManagmentComponents/CaseViewComponent/CaseViewInteractionBtns";
import CasesCard from "../../Components/SharedComponents/CasesCard";
import CaseTabs from "../../Components/CasesManagmentComponents/CaseViewComponent/CaseTabs";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";
import LogoLoader from "../../helpers/loader";
import { useHasPermission } from "../../Hooks/usePermissions";
import { permissionsNames } from "../../helpers/constants";

const CaseView = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [viewCase, setViewCase] = useState({});
  const { fetchCase, loading, error } = useCases();
  const { hasPermission } = useHasPermission();
  const hasViewPermission = hasPermission(permissionsNames.users.view);
  const hasEditPermission = hasPermission(permissionsNames.cases.edit);
  const hasDeletePermission = hasPermission(permissionsNames.cases.delete);

  useEffect(() => {
    const getCaseData = async (id) => {
      const caseData = await fetchCase(id);
      if (caseData) {
        setViewCase(caseData);
      }
    };
    getCaseData(id);
  }, []);

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("case_view")}
          icon="TbFileDollar"
          listItem1={t("Case_Management")}
          listItem2={t("case_view")}
        />
        <CaseViewInteractionBtns
          userID={viewCase?.client_id}
          caseID={id}
          hasDeletePermission={hasDeletePermission}
          hasEditPermission={hasEditPermission}
          hasViewPermission={hasViewPermission}
        />
        {Object.keys(viewCase).length !== 0 ? (
          <CasesCard caseData={viewCase} />
        ) : null}
        <CaseTabs caseID={id} />
      </div>
    </Layout>
  );
};

export default CaseView;
