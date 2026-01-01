import { useTranslation } from "react-i18next";
import Layout from "../../Layout/Layout";
import BreadCrumb from "../../../src/Components/SharedComponents/BreadCrumb";
import "../../Assets/Css/postsManangemnt.css";
import PostsLayout from "../../Components/PostManagment/PostsLayout";
import LogoLoader from "../../helpers/loader";
import ErrorComponents from "../../Components/SharedComponents/ErrorComponent";
import { usePosts } from "../../Hooks/usePosts";

const Posts = () => {
  const { t } = useTranslation();
  const { fetchPosts,fetchTags,addTag,removeTags,loading, error } = usePosts();
  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <Layout>
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <BreadCrumb
          header={t("posts")}
          icon="LuFileCheck2"
          listItem1={t("Post_Management")}
          listItem2={t("posts")}
        />
        <div className="card bg-transparent shadow-none">
     <PostsLayout fetchPosts={fetchPosts} fetchTags={fetchTags} addTag={addTag} removeTags={removeTags} />
        </div>
      </div>
    </Layout>
  );
};

export default Posts;
