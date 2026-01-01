import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BsDownload } from "react-icons/bs";
import * as XLSX from "xlsx";
const ExportButton = ({
  fileName = "",
  customClass = "",
  CustomStyle = {},
  iconClass = "",
  value = "",
  data = [],
  onClick = () => {},
}) => {
  useEffect(() => {
    handleExport();
  }, [data]);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";  const handleExport = () => {
    if (data.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");

    // Generate the Excel file and trigger a download
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };
  return (
    <>
      <button
        onClick={onClick}
        className={`btn export-btn fw-medium text-capitalize ${customClass} `}
        style={CustomStyle}
      >
        {value}
        <BsDownload className={`fw-bold fs-6 fs-12-tablet statistic-c3  ${iconClass} ${isRTL?"me-2":"ms-2"}`} />
      </button>
    </>
  );
};

export default ExportButton;
