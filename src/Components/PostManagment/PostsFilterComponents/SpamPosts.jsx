import { useTranslation } from "react-i18next";
import "../../../Assets/Css/postsManangemnt.css";
import SpamPostsCard from "./SpamPostsCard";
import { useState, useEffect } from "react";
import { usePosts } from "../../../Hooks/usePosts";
import { PulseLoader } from "react-spinners";
import { useHasPermission } from "../../../Hooks/usePermissions";
import { permissionsNames } from "../../../helpers/constants";

const SpamPosts = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState();
  const { FetchUnsolicitedPosts, removePost, loading, error } = usePosts();
  const { hasPermission } = useHasPermission();
  const hasDeletePermission = hasPermission(permissionsNames.posts.delete);

  useEffect(() => {
    const handleUnsolicitedPosts = async () => {
      const postsData = await FetchUnsolicitedPosts();
      setPosts(postsData);
    };
    handleUnsolicitedPosts();
  }, []);
  if (error) {
    return <div className="text-danger fs-6">{error.message}</div>;
  }

  return (
    <div className="my-4">
      <h4 className="posts-filter-section-header position-relative mb-4 text-capitalize  fw-semibold">
        {t("spam_posts")}
      </h4>
      <div className=" custom-scroll-small pe-3">
        {posts ? (
          posts.map((spamPost) => (
            <SpamPostsCard
              key={spamPost.id}
              data={spamPost}
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

export default SpamPosts;
