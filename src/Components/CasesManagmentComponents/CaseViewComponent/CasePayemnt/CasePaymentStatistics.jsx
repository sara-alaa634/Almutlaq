import React from 'react'
import { useTranslation } from 'react-i18next';

const CasePaymentStatistics = ({totalPaymentsData}) => {
    const { t } = useTranslation();

  return (
        <div className="payment-info_wrapper d-flex felx-wrap gap-3 justify-content-between align-items-center py-3 border-thick-bottom">
          <div className="payment-info d-flex gap-3 align-items-center">
            <span className="info-text sc-2-clr fw-bold fs-5">
              {t("Total_amount")}
            </span>
            <span className="info-value mc-1-clr fs-6 fw-semibold">
              {totalPaymentsData.total_required_amount} {t("egyptian_pound")}
            </span>
          </div>
          <div className="payment-info d-flex gap-3 align-items-center">
            <span className="info-text sc-2-clr fw-bold fs-5">
              {t("paid_value")}
            </span>
            <span className="info-value mc-1-clr fs-6 fw-semibold">
              {totalPaymentsData.total_paid_amount} {t("egyptian_pound")}
            </span>
          </div>
          <div className="payment-info d-flex gap-3 align-items-center">
            <span className="info-text sc-2-clr fw-bold fs-5">
              {t("remaining")}
            </span>
            <span className="info-value mc-1-clr fs-6 fw-semibold">
              {totalPaymentsData.total_remaining_amount} {t("egyptian_pound")}
            </span>
          </div>
        </div>
  
  )
}

export default CasePaymentStatistics