import { useState } from "react";
import {
  getCasesCategories,
  getAllCasesCategoriesIDs,
  getCaseCategory,
  createCaseCategory,
  updateCaseCategory,
  updateCaseCategoryState,
  deleteCaseCategory,
} from "../Api/CasesApi";
import { Toast } from "../helpers/Toast";
import { useTranslation } from "react-i18next";
import { successMessages } from "../helpers/messages";
import { useHasPermission } from "../Hooks/usePermissions";


export const useCasesCategories = () => {
  const [casesCategories, setCasesCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { handlePermsssionError } = useHasPermission();
  const fetchCasesCategories = async () => {
    setLoading(true);
    try {
      const casesCategoriesData = await getCasesCategories();
      setLoading(false);
      return casesCategoriesData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };
  const fetchAllCasesCategoriesIDs = async () => {
    setLoading(true);
    try {
      const casesCategoriesData = await getAllCasesCategoriesIDs();
      setLoading(false);
      return casesCategoriesData.data.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };

  const fetchCasesCategory = async (caseID) => {
    setLoading(true);
    try {
      const casesCategoriesData = await getCaseCategory(caseID);
      setLoading(false);
      return casesCategoriesData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };

  const addCaseCategories = async (title, image) => {
    setLoading(true);
    try {
     const response= await createCaseCategory(title, image);
      setLoading(false);
      Toast("success", t(successMessages.createCaseCategory));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return response;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };
  const editCaseCategoryState = async (caseId, state) => {
    setLoading(true);
    try {
      await updateCaseCategoryState(caseId, state);
      Toast("success", t(successMessages.eidtCaseCategoryStatus));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };
  const editCaseCategory = async (caseId, caseData) => {
    setLoading(true);
    try {
      await updateCaseCategory(caseId, caseData);
      Toast("success", t(successMessages.eidtCaseCategory));
      setLoading(false);
    } catch (err) {
      // console.error("Error updating case category:", err);
      handlePermsssionError(err,setError,t)
      setLoading(false);
    }
  };

  const removeCaseCategory = async (caseId) => {
    setLoading(true);
    try {
      await deleteCaseCategory(caseId);
      Toast("success", t(successMessages.deleteCaseCategory));
      
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };

  return {
    fetchCasesCategories,
    fetchAllCasesCategoriesIDs,
    fetchCasesCategory,
    addCaseCategories,
    editCaseCategory,
    editCaseCategoryState,
    removeCaseCategory,
    casesCategories,
    loading,
    error,
  };
};
