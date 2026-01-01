import React from 'react'
import StatisticCard from '../../SharedComponents/StatisticCard'
const StatisticsSection = ({ casesCounts, t }) => {
  return (
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3">
            <StatisticCard
              className=" mb-md-0 w-100 "
              color="var(--statistic-c1)"
              backgroundColor="var(--statistic-bg1)"
              name={t("Ongoing_issues")}
              value={casesCounts.ongoing}
              icon="TbFileDollar"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3">
            <StatisticCard
              className=" mb-md-0 w-100"
              color="var(--statistic-c2)"
              backgroundColor="var(--statistic-bg2)"
              name={t("Inactive_Issues")}
              value={casesCounts.inactive}
              icon="FiFileMinus"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3">
            <StatisticCard
              className="mb-md-0 w-100"
              color="var(--statistic-c3)"
              backgroundColor="var(--statistic-bg3)"
              name={t("completed_issues")}
              value={casesCounts.complete}
              icon="LuFileCheck"
            />
          </div>
        </div>
  )
}

export default StatisticsSection