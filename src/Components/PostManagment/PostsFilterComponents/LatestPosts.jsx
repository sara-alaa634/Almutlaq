import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../../Assets/Css/postsManangemnt.css";
import LatestPostsCard from "./LatestPostsCard";
import { usePosts } from "../../../Hooks/usePosts";
import { PulseLoader } from "react-spinners";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const LatestPosts = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState();
  const { FetchLatestPosts, removePost, loading, error } = usePosts();
  const { hasPermission } = useHasPermission();
  const hasDeletePermission = hasPermission(permissionsNames.posts.delete);

  useEffect(() => {
    const handleLatestPosts = async () => {
      const postsData = await FetchLatestPosts();
      setPosts(postsData);
    };
    handleLatestPosts();
  }, []);

  if (error) {
    return <div className="text-danger fs-6">{error.message}</div>;
  }
  return (
    <div className="my-4">
      <h4 className="posts-filter-section-header position-relative text-capitalize  fw-semibold">
        {t("latest_posts")}
      </h4>
      <div className="my-4 py-1">
        {posts ? (
          posts.map((post) => (
            <LatestPostsCard
              key={post.id}
              data={post}
              setData={setPosts}
              removePost={removePost}
              deletePermission={hasDeletePermission}
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

export default LatestPosts;
