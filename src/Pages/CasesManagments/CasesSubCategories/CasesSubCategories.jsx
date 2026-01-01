import React, { useEffect ,useState} from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../../Layout/Layout";
import BreadCrumb from "../../../Components/SharedComponents/BreadCrumb";
import CreateCaseSubCategoryForm from "../../../Components/CasesManagmentComponents/CaseSubCategory/CreateCaseSubCategoryForm";
import CaseSubCategoryTable from "../../../Components/CasesManagmentComponents/CaseSubCategory/CaseSubCategoryTable";
import { useCasesSubCategories } from "../../../Hooks/useCasesSubCategories";
import LogoLoader from "../../../helpers/loader";
import ErrorComponents from "../../../Components/SharedComponents/ErrorComponent";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const CasesSubCategories = () => {
  const { t } = useTranslation();
  const {
    fetchCasesSubCategories,
    editCaseSubCategoryState,
    removeSubCaseCategory,
    loading,
    error,
  } = useCasesSubCategories();
  const { hasPermission } = useHasPermission();
    const [casesSubCategories, setCasesSubCategories] = useState([]);
  const hasAddPermission = hasPermission(permissionsNames.office.create);
  const hasViewPermission = hasPermission(permissionsNames.office.view);
  const hasEditPermission = hasPermission(permissionsNames.office.edit);
  const hasDeletePermission = hasPermission(permissionsNames.office.delete);

  useEffect(() => {
    const fetchData = async () => {
      const response =await fetchCasesSubCategories();
      setCasesSubCategories(response)
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
          header={t("case_types")}
          icon="TbHotelService"
          listItem1={t("Office_information")}
          listItem2={t("case_types")}
        />
        <div className="card  bg-transparent shadow-none">
          <div className="card-body bg-transparent">
            <div className="row">
              {hasAddPermission && (
                <div
                  className={
                    hasViewPermission
                      ? "col-12 col-md-5 col-lg-4 col-xl-3"
                      : "col-12"
                  }
                >
                  <CreateCaseSubCategoryForm />
                </div>
              )}
              {hasViewPermission && (
                <div
                  className={
                    hasAddPermission
                      ? "col-12 col-md-7 col-lg-8 col-xl-9 "
                      : "col-12"
                  }
                >
                  <CaseSubCategoryTable
                    data={casesSubCategories}
                    setData={setCasesSubCategories}
                    removeSubCaseCategory={removeSubCaseCategory}
                    editCaseSubCategoryState={editCaseSubCategoryState}
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

export default CasesSubCategories;
