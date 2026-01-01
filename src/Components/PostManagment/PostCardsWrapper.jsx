import { useState } from "react";
import PostsCard from "./PostsCard";
import { PulseLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const PostCardsWrapper = ({ posts,setPosts, loading}) => {
  const { t } = useTranslation();
  return (
    <div className="row mt-4 custom-scroll">
      {loading ? (
        <div
          colSpan="5"
          className="d-flex align-items-center justify-content-center gap-1 w-100"
        >
          <PulseLoader
            color="var(--mc-1)"
            loading={loading}
            size={7}
            speedMultiplier={0.5} // Decrease this value to slow down the loader
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <span className="d-inline-block me-4">{t("searching")}</span>
        </div>
      ) : posts && posts ? (
        posts.map((post) => (
          <div
             className={`col-12 mb-4`}
            key={post.id}
          >
            <PostsCard data={post} setData={setPosts}/>
          </div>
        ))
      ) : (
        <div className="fw-bold text-center fs-6 text-capitalize">
          {t("no posts available")}{" "}
        </div>
      )}
    </div>

  );
};

export default PostCardsWrapper;
