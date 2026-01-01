import React, { useEffect ,useState} from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../../Layout/Layout";
import BreadCrumb from "../../../Components/SharedComponents/BreadCrumb";
import CreateCaseCategoryForm from "../../../Components/CasesManagmentComponents/CaseCategories/CreateCaseCategoryForm";
import CaseCategoryTable from "../../../Components/CasesManagmentComponents/CaseCategories/CaseCategoryTable";
import { useCasesCategories } from "../../../Hooks/useCasesCategories";
import LogoLoader from "../../../helpers/loader";
import ErrorComponents from "../../../Components/SharedComponents/ErrorComponent";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const CasesCategories = () => {
  const { t } = useTranslation();
  const {
    fetchCasesCategories,
    removeCaseCategory,
    editCaseCategoryState,
    loading,
    error,
  } = useCasesCategories();
  const { hasPermission } = useHasPermission();
  const [casesCategories, setCasesCategories] = useState([]);
  const hasAddPermission = hasPermission(permissionsNames.office.create);
  const hasViewPermission = hasPermission(permissionsNames.office.view);
  const hasEditPermission = hasPermission(permissionsNames.office.edit);
  const hasDeletePermission = hasPermission(permissionsNames.office.delete);

  useEffect(() => {
    const fetchData = async () => {
      const response =await fetchCasesCategories();
      setCasesCategories(response)
    };
    fetchData();
  }, []);

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("case_categories")}
          icon="TbHotelService"
          listItem1={t("Office_information")}
          listItem2={t("case_categories")}
        />
        <div className="card  bg-transparent shadow-none">
          <div className="card-body bg-transparent">
            <div className="row">
              {hasAddPermission && (
                <div
                  className={
                    hasViewPermission ? "col-12 col-lg-5 col-xl-4" : "col-12"
                  }
                >
                  <CreateCaseCategoryForm  />
                </div>
              )}
              {hasViewPermission && (
                <div
                  className={
                    hasAddPermission ? "col-12 col-lg-7 col-xl-8 " : "col-12"
                  }
                >
                  <CaseCategoryTable
                    data={casesCategories}
                    setData={setCasesCategories}
                    removeCaseCategory={removeCaseCategory}
                    editCaseCategoryState={editCaseCategoryState}
                    editPermission={hasEditPermission}
                    deletePermission={hasDeletePermission}
                    viewPermission={hasViewPermission}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CasesCategories;
