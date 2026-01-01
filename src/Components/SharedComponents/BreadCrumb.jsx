import React from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineHome } from "react-icons/hi";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { TbUsers } from "react-icons/tb";
import { TbFileDollar } from "react-icons/tb";
import { LuFileCheck2 } from "react-icons/lu";
import { TbHotelService } from "react-icons/tb";
import { TbDashboard } from "react-icons/tb";
import { TbBrandHipchat } from "react-icons/tb";
import { FiHeadphones } from "react-icons/fi";

const BreadCrumb = ({ listItem1, listItem2, icon, header, arrow = true }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  return (
    <div>
      <ul className="breadcrumb" dir={isRTL ? "rtl" : "ltr"}>
        <li className="text-capitalize d-flex align-items-center fw-medium">
          {icon === "HiOutlineHome" ? (
            <HiOutlineHome className={`fw-bold fs-5 ${isRTL?"ms-2":"me-2"}`}  />
          ) : icon === "TbUsers" ? (
            <TbUsers className={`fw-bold fs-5 ${isRTL?"ms-2":"me-2"}`} />
          ) : icon === "TbFileDollar" ? (
            <TbFileDollar className={`fw-bold fs-5 ${isRTL?"ms-2":"me-2"}`} />
          ) : icon === "LuFileCheck2" ? (
            <LuFileCheck2 className={`fw-bold fs-5 ${isRTL?"ms-2":"me-2"}`} />
          ) : icon === "TbHotelService" ? (
            <TbHotelService className={`fw-bold fs-5 ${isRTL?"ms-2":"me-2"}`} />
          ) : icon === "TbDashboard" ? (
            <TbDashboard className={`fw-bold fs-5 ${isRTL?"ms-2":"me-2"}`} />
          ) : icon === "TbBrandHipchat" ? (
            <TbBrandHipchat className={`fw-bold fs-5 ${isRTL?"ms-2":"me-2"}`} />
          ) : icon === "FiHeadphones" ? (
            <TbBrandHipchat className={`fw-bold fs-5 ${isRTL?"ms-2":"me-2"}`} />
          ) : (
            ""
          )}
          {listItem1}
        </li>
        {arrow && (
          <li className="mx-3 fw-medium">
            {isRTL ? <FaAngleLeft /> : <FaAngleRight />}
          </li>
        )}
        <li className={`text-capitalize fw-medium ${isRTL?"ms-3":"me-3" }`}>{listItem2}</li>
      </ul>
      {header && (
        <h4
          className="h2 text-capitalize fw-semibold my-4 pb-2 "
          dir={isRTL ? "rtl" : "ltr"}
        >
          {header}
        </h4>
      )}
    </div>
  );
};

export default BreadCrumb;
