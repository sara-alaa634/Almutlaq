import { useState } from "react";
import {
  getCases,
  getfilteredCases,
  getCase,
  getCasesCount,
  createCase,
  updateCase,
  updateCaseState,
  deleteCase,
  ExportCasesData,
  getCaseFiles,
  updateCaseFileState,
  deleteCaseFile,
  createCaseFile,
  downloadCaseFile,
  getCaseStates,
  createCaseState,
  updateCaseStates,
  updateCaseStateStatus,
  deleteCaseState,
  getCasePayments,
  getCasePaymentsTotal,
  createCasePayment,
  updateCasePayment,
  deleteCasePayment,
} from "../Api/CasesApi";
import { Toast } from "../helpers/Toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { successMessages } from "../helpers/messages";
import { useHasPermission } from "../Hooks/usePermissions";

export const useCases = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handlePermsssionError } = useHasPermission();

  const fetchCases = async (params) => {
    try {
      const casesData = await getCases(params.currentPage);
      return casesData.data;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };
  const fetchFilteredCases = async (Params) => {
    try {
      const filterData = Object.fromEntries(
        Object.entries(Params).filter(([key, value]) => value !== null)
      );
      const casesData = await getfilteredCases(filterData);
      return casesData.data;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };

  const fetchExportCasesData = async () => {
    try {
      const exportCases = await ExportCasesData();
      return exportCases.data.data;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };

  const fetchCase = async (caseID) => {
    setLoading(true);
    try {
      const casesData = await getCase(caseID);
      setLoading(false);
      return casesData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
      if (err.response?.data?.message) {
        if (err.response.data.message === "Case not found") {
          setTimeout(() => {
            navigate("/cases/all-cases");
          }, 1000);
        }
      }
    }
  };

  const fetchCasesCounts = async () => {
    setLoading(true);
    try {
      const casesCounts = await getCasesCount();
      setLoading(false);
      return casesCounts.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const addCase = async (
    title,
    description,
    caseType,
    subcategoryID,
    clientID
  ) => {
    setLoading(true);
    try {
      await createCase(title, description, caseType, subcategoryID, clientID);
      setLoading(false);
      Toast("success", t(successMessages.createCase));
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const editCaseState = async (caseId, state) => {
    setLoading(true);
    try {
      await updateCaseState(caseId, state);
      Toast("success", t(successMessages.eidtCaseStatus));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const editCase = async (
    caseId,
    title,
    description,
    caseType,
    subcategoryID,
    clientID
  ) => {
    setLoading(true);
    try {
      const newData = {
        title: title,
        description: description,
        caseType: caseType,
        subcategoryID: subcategoryID,
        clientID: clientID,
      };
      await updateCase(caseId, newData);
      Toast("success", t(successMessages.eidtCase));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const removeCase = async (caseId) => {
    setLoading(true);
    try {
      await deleteCase(caseId);
      Toast("success", t(successMessages.deleteCase));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(error, setError, t);
    }
  };

  // ====== Case Status ======
  const fetchCaseStates = async (params) => {
    try {
      const filterData = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== null)
      );
      const caseStatusData = await getCaseStates(filterData);
      return caseStatusData.data;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };

  const addCaseState = async (caseID, title, description, lawyerID) => {
    setLoading(true);
    try {
    const response=  await createCaseState(caseID, title, description, lawyerID);
      setLoading(false);
      Toast("success", t(successMessages.createCaseState));
      return response;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const editCaseStates = async (
    caseStateId,
    caseID,
    title,
    description,
    lawyerID
  ) => {
    setLoading(true);
    try {
     const response= await updateCaseStates(caseStateId, caseID, title, description, lawyerID);
      Toast("success", t(successMessages.eidtCaseState));
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };
  const editCaseStateStatus = async (caseId, state) => {
    setLoading(true);
    try {
      await updateCaseStateStatus(caseId, state);
      Toast("success", t(successMessages.eidtCaseStateStatus));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const removeCaseState = async (caseId) => {
    setLoading(true);
    try {
      await deleteCaseState(caseId);
      Toast("success", t(successMessages.deleteCaseState));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };
  // ====== Case Attachments ======
  const fetchCaseFiles = async (params) => {
    setLoading(true);
    try {
      const filterData = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== null)
      );

      const caseFilesData = await getCaseFiles(filterData);

      setLoading(false);
      return caseFilesData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };
  const addCaseFile = async (caseID, fileName, uploadDate, file, action) => {
    setLoading(true);
    try {
      const resposne=await createCaseFile(caseID, fileName, uploadDate, file, action);
      setLoading(false);
      Toast("success", t(successMessages.createCaseFile));
      return resposne;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };
  const editCaseFileState = async (caseId, state) => {
    setLoading(true);
    try {
      await updateCaseFileState(caseId, state);
      Toast("success", t(successMessages.eidtCaseStatusFile));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const removeCaseFile = async (fileID) => {
    setLoading(true);
    try {
      await deleteCaseFile(fileID);
      Toast("success", t(successMessages.deleteCaseFile));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };
  const downloadSingleCaseFile = async (fileId) => {
    try {
      const response = await downloadCaseFile(fileId);
      return response;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };

  // ====== Case Payments ======
  const fetchCasePayments = async (params) => {
    setLoading(true);
    try {
      const filterData = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== null)
      );

      const casePaymentData = await getCasePayments(filterData);
      setLoading(false);
      return casePaymentData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };
  const fetchCasePaymentsTotal = async (caseID) => {
    setLoading(true);
    try {
      const casePaymentData = await getCasePaymentsTotal(caseID);
      setLoading(false);
      return casePaymentData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const addCasePayment = async (
    caseID,
    requiredAmount,
    paymentDetails,
    paymentDate,
    paidAmount,
    paymentMethod,
    action
  ) => {
    setLoading(true);
    try {
     const response= await createCasePayment(
        caseID,
        requiredAmount,
        paymentDetails,
        paymentDate,
        paidAmount,
        paymentMethod,
        action
      );
      setLoading(false);
      Toast("success", t(successMessages.createCasePayment));
      return response;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const editCasePayment = async (
    casePaymentId,
    requiredAmount,
    paymentDetails,
    paymentDate,
    paidAmount,
    paymentMethod,
    action
  ) => {
    var updateData = {};
    setLoading(true);
    try {
      if (action === "request") {
        updateData = {
          required_amount: requiredAmount,
          payment_details: paymentDetails,
          payment_date: paymentDate,
          action: action,
        };
      } else {
        updateData = {
          required_amount: requiredAmount,
          payment_details: paymentDetails,
          payment_date: paymentDate,
          paid_amount: paidAmount,
          payment_method: paymentMethod,
          action: action,
        };
      }
     const response= await updateCasePayment(casePaymentId, updateData);
      Toast("success", t(successMessages.eidtCasePayment));
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const removeCasePayment = async (caseId) => {
    setLoading(true);
    try {
      await deleteCasePayment(caseId);
      Toast("success", t(successMessages.deleteCasePayment));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  return {
    fetchCases,
    fetchFilteredCases,
    fetchCase,
    fetchExportCasesData,
    fetchCasesCounts,
    addCase,
    editCase,
    editCaseState,
    removeCase,
    addCaseFile,
    fetchCaseFiles,
    downloadSingleCaseFile,
    addCaseState,
    editCaseFileState,
    removeCaseFile,
    fetchCaseStates,
    editCaseStates,
    editCaseStateStatus,
    removeCaseState,
    fetchCasePayments,
    fetchCasePaymentsTotal,
    addCasePayment,
    editCasePayment,
    removeCasePayment,
    loading,
    error,
  };
};
