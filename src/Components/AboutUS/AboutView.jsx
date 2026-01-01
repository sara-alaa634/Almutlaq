import React from "react";
import { useTranslation } from "react-i18next";
const AboutView = ({ data }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <div className="card w-100 mb-3 ms-md-3 ms-0 overflow-hidden rounded-4">
        <div className="row g-0">
          <div className="col-6">
            <img src={data.image} className="w-100" alt="..." />
          </div>
          <div className="col-6">
            <div className="card-body">
              <p className={`card-text fw-semibold  ${isRTL ? "text-end" : "text-start"}`}>
                {data.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
