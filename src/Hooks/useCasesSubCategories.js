import { useState } from "react";
import {
  getCasesSubCategories,
  getAllCasesSubCategoriesIDs,
  getCaseSubCategory,
  createCaseSubCategory,
  updateCaseSubCategory,
  updateCaseSubCategoryState,
  deleteCaseSubCategory,
} from "../Api/CasesApi";
import { Toast } from "../helpers/Toast";
import { useTranslation } from "react-i18next";
import { successMessages } from "../helpers/messages";
import { useNavigate } from "react-router-dom";
import { useHasPermission } from "../Hooks/usePermissions";

export const useCasesSubCategories = () => {
  const [casesSubCategories, setCasesSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handlePermsssionError } = useHasPermission();

  const fetchCasesSubCategories = async () => {
    setLoading(true);
    try {
      const casesSubCategoriesData = await getCasesSubCategories();
      setCasesSubCategories(casesSubCategoriesData.data);
      setLoading(false);
      return casesSubCategoriesData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };
  const fetchAllCasesSubCategoriesIDs = async () => {
    setLoading(true);
    try {
      const casesSubCategoriesData = await getAllCasesSubCategoriesIDs();
      setLoading(false);
      return casesSubCategoriesData.data.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };

  const fetchCaseSubCategory = async (caseID) => {
    setLoading(true);
    try {
      const casesSubCategoriesData = await getCaseSubCategory(caseID);
      setLoading(false);
      return casesSubCategoriesData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };

  const addCaseSubCategories = async (caseCategory_ID, title, image) => {
    setLoading(true);
    try {
      await createCaseSubCategory(caseCategory_ID, title, image);
      setLoading(false);
      Toast("success", t(successMessages.createCaseSubCategory));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };

  const editCaseSubCategoryState = async (caseId, state) => {
    setLoading(true);
    try {
      await updateCaseSubCategoryState(caseId, state);
      Toast("success", t(successMessages.eidtCaseSubCategoryStatus));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };
  const editCaseSubCategory = async (caseId, caseCategoryID, title, image) => {
    setLoading(true);
    try {
      await updateCaseSubCategory(caseId, caseCategoryID, title, image);
      Toast("success", t(successMessages.eidtCaseSubCategory));
      setLoading(false);
    } catch (err) {
      handlePermsssionError(err,setError,t)
      setLoading(false);
    }
  };

  const removeSubCaseCategory = async (caseId) => {
    setLoading(true);
    try {
      await deleteCaseSubCategory(caseId);
      Toast("success", t(successMessages.deleteCaseSubCategory));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };

  return {
    fetchCasesSubCategories,
    fetchAllCasesSubCategoriesIDs,
    fetchCaseSubCategory,
    addCaseSubCategories,
    editCaseSubCategoryState,
    editCaseSubCategory,
    removeSubCaseCategory,
    casesSubCategories,
    loading,
    error,
  };
};
