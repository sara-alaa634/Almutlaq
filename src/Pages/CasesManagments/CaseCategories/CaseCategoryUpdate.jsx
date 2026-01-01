import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Layout from "../../../Layout/Layout";
import BreadCrumb from "../../../Components/SharedComponents/BreadCrumb";
import UpdateCaseCategoryForm from "../../../Components/CasesManagmentComponents/CaseCategories/UpdateCaseCategoryForm";
import { useCasesCategories } from "../../../Hooks/useCasesCategories";
import LogoLoader from "../../../helpers/loader";
import ErrorComponents from "../../../Components/SharedComponents/ErrorComponent";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const CaseCategoryUpdate = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { fetchCasesCategory, loading, error } = useCasesCategories();
  const [singleCategoryData, setSingleCategoryData] = useState({});
  const { hasPermission } = useHasPermission();
  const hasEditPermission = hasPermission(permissionsNames.office.edit);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const data = await fetchCasesCategory(id);
      if (data) {
        setSingleCategoryData(data);
      }
    };

    fetchCategoryData();
  }, []);

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("case_category_update")}
          icon="TbHotelService"
          listItem1={t("Office_information")}
          listItem2={t("case_category_update")}
        />
        <div className="card bg-transparent shadow-none">
          <div className="card-body">
            {hasEditPermission ? (
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  {Object.keys(singleCategoryData).length > 0 ? (
                    <UpdateCaseCategoryForm
                      id={id}
                      oldCaseCategoryName={singleCategoryData.title}
                      oldUploadedFiles={singleCategoryData.image}
                    />
                  ) : (
                    ""
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

export default CaseCategoryUpdate;
