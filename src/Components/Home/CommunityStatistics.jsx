import React from 'react'
import { useTranslation } from "react-i18next";
import StatisticCard from '../../Components/SharedComponents/StatisticCard'
const CommunityStatistics = ({statistics}) => {
  const { t } = useTranslation();

  return (
    <div className="card">
    <div className="card-body">
      <h2 className="home-card-header text-capitalize">{t("Omar Haridy Community Statistics")}</h2>
      <div className="row mt-md-4 mb-3 mt-3 pt-1">
          <div className="col-12 col-md-6">
            <StatisticCard
              className=" mb-md-0 mb-2 w-100 "
              color="var(--statistic-c1)"
              backgroundColor="var(--statistic-bg1)"
              name={t("new_post")}
              value={statistics.newest_posts_count}
              icon="TbFileLike"
              href='/posts'
            />
          </div>
          <div className="col-12 col-md-6 ">
            <StatisticCard
              className=" mb-md-0 mb-2 w-100 "
              color="var(--statistic-c1)"
              backgroundColor="var(--statistic-bg1)"
              name={t("new_message")}
              value={statistics.unseen_messages_count}
              icon="TbBrandHipchat"
               href='/posts'
            />
          </div>
        </div>
    </div>
  </div>
  )
}

export default CommunityStatistics