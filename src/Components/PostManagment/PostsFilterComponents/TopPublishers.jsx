import React, { useEffect, useState } from "react";
import PublisherCard from "./PublisherCard";
import { useTranslation } from "react-i18next";
import Search from "../../SharedComponents/Search";
import "../../../Assets/Css/postsManangemnt.css";
import { usePosts } from "../../../Hooks/usePosts";
import { PulseLoader } from "react-spinners";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const TopPublishers = () => {
  const { t } = useTranslation();
  const [publishers, setPublishers] = useState();
  const { FetchTopPublishers, loading, error } = usePosts();
  const { hasPermission } = useHasPermission();
  const hasViewUserPermission = hasPermission(permissionsNames.users.view);
  const hasViewChatPermission = hasPermission(permissionsNames.chat.view);
  const hasDeleteUserPermission = hasPermission(permissionsNames.users.delete);

  useEffect(() => {
    const handleTopPublisher = async () => {
      const publisherData = await FetchTopPublishers();
      setPublishers(publisherData);
    };
    handleTopPublisher();
  }, []);
  if (error) {
    return <div className="text-danger fs-6">{error.message}</div>;
  }
  return (
    <div className="top-publishers-wrapper">
      <div className="header-wrapper d-flex flex-wrap gap-3 align-items-center justify-content-between">
        <h4 className="posts-filter-section-sub-header position-relative text-capitalize  fw-semibold">
          {t("top_publishers")}
        </h4>
      </div>
      <div className="my-4 py-1">
        {publishers ? (
          publishers.map((publisher) => (
            <PublisherCard
              key={publisher.id}
              data={publisher}
              setData={setPublishers}
              hasDeleteUserPermission={hasDeleteUserPermission}
              hasViewChatPermission={hasViewChatPermission}
              hasViewUserPermission={hasViewUserPermission}
            />
          ))
        ) : (
          <PulseLoader
            color="var(--mc-1)"
            loading={loading}
            size={7}
            speedMultiplier={0.5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
    </div>
  );
};

export default TopPublishers;
