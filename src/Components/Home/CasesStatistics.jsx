import React from 'react'
import { useTranslation } from "react-i18next";
import StatisticCard from "../../Components/SharedComponents/StatisticCard";

const CasesStatistics = ({statistics}) => {
  const { t } = useTranslation();

  return (
    <div className="card mb-2">
    <div className="card-body">
      <h2 className="home-card-header text-capitalize">{t("Case statistics")}</h2>
      <div className="row mt-md-4 mb-3 mt-3 pt-1">
          <div className="col-12 col-md-6 col-lg-6 col-xl-4">
            <StatisticCard
              className=" mb-md-0 mb-2 w-100 "
              color="var(--statistic-c1)"
              backgroundColor="var(--statistic-bg1)"
              name={t("Ongoing_issues")}
              value={statistics.ongoing_cases}
              icon="TbFileDollar"
              href="/cases/all-cases"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-4 mt-md-0 mt-3">
            <StatisticCard
              className=" mb-md-0 mb-2 w-100 "
              color="var(--statistic-c2)"
              backgroundColor="var(--statistic-bg2)"
              name={t("Inactive_Issues")}
              value={statistics.inactive_cases}
              icon="FiFileMinus"
              href="/cases/all-cases"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-4 mt-xl-0 mt-3">
            <StatisticCard
              className=" mb-md-0 mb-2 w-100 "
              color="var(--statistic-c3)"
              backgroundColor="var(--statistic-bg3)"
              name={t("completed_issues")}
              value={statistics.expired_cases}
              icon="LuFileCheck"
              href="/cases/all-cases"
            />
          </div>
        </div>
    </div>
  </div>
  )
}

export default CasesStatistics