import { useTranslation } from "react-i18next";
import Layout from "../Layout/Layout";
import BreadCrumb from "../Components/SharedComponents/BreadCrumb";
import SupportMainWrapper from "../Components/SupportTeam/SupportMainWrapper";
import { useGeneral } from "../Hooks/useGeneral";
import LogoLoader from "../helpers/loader";
import ErrorComponents from "../Components/SharedComponents/ErrorComponent";
import { useHasPermission } from "../Hooks/usePermissions";
import { permissionsNames } from "../helpers/constants";

const SupportTeam = () => {
  const { t } = useTranslation();
  const { fetchSupportMessage, removeSupportMessage, loading, error } =
    useGeneral();
  const { hasPermission } = useHasPermission();
  const hasViewPermission = hasPermission(permissionsNames.users.view);
  const hasChatPermission = hasPermission(permissionsNames.chat.view);
  const hasDeletePermission = hasPermission(permissionsNames.users.delete);

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}

      <div className="container">
        <BreadCrumb
          icon="FiHeadphones"
          listItem1={t("Technical_support_requests")}
          header={t("Technical_support_requests")}
          arrow={false}
        />
        {hasViewPermission ? (
          <SupportMainWrapper
            onDelete={removeSupportMessage}
            onFetch={fetchSupportMessage}
            hasDeletePermission={hasDeletePermission}
            hasChatPermission={hasChatPermission}
            hasViewPermission={hasViewPermission}
          />
        ) : (
          <div className="fw-bold fs-4 text-center text-capitalize py-3">
            {t("you are not allowed to see this page")}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SupportTeam;
