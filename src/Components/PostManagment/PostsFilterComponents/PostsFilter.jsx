import React from "react";
import TopPublishers from "./TopPublishers";
import LatestPosts from "./LatestPosts";
import PostsTags from "./PostsTags";
import SpamPosts from "./SpamPosts";
import "../../../Assets/Css/postsManangemnt.css";
const PostsFilter = ({
  onFilterChange,
  selectedFilters,
  setSelectedFilters,
  fetchTags,
  addTag,
  removeTags,
}) => {
  return (
    <aside className="posts-filter-wrapper rounded-3 p-4">
      <TopPublishers />
      <LatestPosts />
      <PostsTags
        onFilterChange={onFilterChange}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        fetchTags={fetchTags}
        addTag={addTag}
        removeTags={removeTags}
      />
      <SpamPosts />
    </aside>
  );
};

export default PostsFilter;
