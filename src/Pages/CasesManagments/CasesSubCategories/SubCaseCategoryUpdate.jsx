import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Layout from "../../../Layout/Layout";
import BreadCrumb from "../../../Components/SharedComponents/BreadCrumb";
import UpdateCaseSubCategory from "../../../Components/CasesManagmentComponents/CaseSubCategory/UpdateCaseSubCategory";
import { useCasesSubCategories } from "../../../Hooks/useCasesSubCategories";
import ErrorComponents from "../../../Components/SharedComponents/ErrorComponent";
import LogoLoader from "../../../helpers/loader";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const SubCaseCategoryUpdate = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { fetchCaseSubCategory, loading, error } = useCasesSubCategories();
  const [singleSubCategoryData, setSingleSubCategoryData] = useState({});
  const { hasPermission } = useHasPermission();
  const hasEditPermission = hasPermission(permissionsNames.office.edit);

  useEffect(() => {
    const fetchSubCategoryData = async () => {
      const data = await fetchCaseSubCategory(id);
      if (data) {
        setSingleSubCategoryData(data);
      }
    };

    fetchSubCategoryData();
  }, []);

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("case_type_update")}
          icon="TbHotelService"
          listItem1={t("Office_information")}
          listItem2={t("case_type_update")}
        />
        <div className="card bg-transparent shadow-none">
          <div className="card-body">
            {hasEditPermission ? (
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  {Object.keys(singleSubCategoryData).length > 0 ? (
                    <UpdateCaseSubCategory
                      id={id}
                      oldCaseSubCategory={singleSubCategoryData}
                    />
                  ) : (
                   null
                  )}
                </div>
              </div>
            ) : (
              <div className="fw-bold fs-4 text-center text-capitalize py-3">
                {t("you are not allowed to see this page")}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubCaseCategoryUpdate;
