import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../SharedComponents/Buttons/Button";
import { defaultAlert } from "../../../helpers/Alert";
import { useCases } from "../../../Hooks/useCases";
const CaseViewInteractionBtns = ({
  userID,
  caseID,
  hasViewPermission,
  hasEditPermission,
  hasDeletePermission,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { removeCase } = useCases();

  const handleDelete = async () => {
    const result = await defaultAlert(
      t("Are you sure?"),
      t("You won't be able to get the data of this case  again !"),
      t("yes delete it"),
      t("cancel"),
      "warning"
    );

    if (result) {
      await removeCase(caseID);
      setTimeout(() => {
        navigate("/cases/all-cases");
      }, 1000);
    }
  };
  return (
    <div className="view-action-btns d-flex flex-wrap justify-content-end align-items-center gap-3">
      {hasViewPermission ? (
        <Button
          customClass="fs-6"
          value={t("user_view")}
          icon="TbUserSearch"
          iconClass="create-btn-clr fs-6"
          buttonType="main"
          type="link"
          href={`/users/${userID}`}
        />
      ) : null}
      {hasEditPermission ? (
        <Button
          customClass="fs-6"
          value={t("update")}
          icon="FiEdit"
          iconClass="create-btn-clr fs-6"
          buttonType="main"
          type="link"
          href={`/cases/case-update/${caseID}`}
          typeAttribute="submit"
        />
      ) : null}
      {hasDeletePermission ? (
        <Button
          customClass="fs-6"
          value={t("delete")}
          icon="GoTrash"
          iconClass="create-btn-clr fs-6"
          buttonType="main"
          type="button"
          typeAttribute="submit"
          onClick={handleDelete}
        />
      ) : null}
    </div>
  );
};

export default CaseViewInteractionBtns;
