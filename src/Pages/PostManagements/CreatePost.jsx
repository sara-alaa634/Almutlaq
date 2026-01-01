import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../../src/Components/SharedComponents/BreadCrumb";
import "../../Assets/Css/postsManangemnt.css";
import CreatePostForm from "../../Components/PostManagment/CreatePostForm";
import { usePosts } from "../../Hooks/usePosts";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";
import LogoLoader from "../../helpers/loader";
import { useHasPermission } from "../../Hooks/usePermissions";
import { permissionsNames } from "../../helpers/constants";

const CreatePost = () => {
  const { t } = useTranslation();
  const { addPost, fetchTags, loading, error } = usePosts();
  const { hasPermission } = useHasPermission();
  const hasCreatePermission = hasPermission(permissionsNames.posts.create);

  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}

      <div className="container">
        <BreadCrumb
          header={t("create_post")}
          icon="LuFileCheck2"
          listItem1={t("Post_Management")}
          listItem2={t("create_post")}
        />
        <div className="card l-d-bg shadow-none p-4 py-md-4 py-3">
          {hasCreatePermission ? (
            <CreatePostForm addPost={addPost} fetchTags={fetchTags} />
          ) : (
            <div className="fw-bold fs-4 text-center text-capitalize py-3">
              {t("you are not allowed to see this page")}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
