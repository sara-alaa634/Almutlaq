import apiClient from "./apiClient";
// ====== Cases ======

export const getCases = (page) => {
  return apiClient.get(`/cases?page=${page}`);
};
export const getfilteredCases = (param) => {
  return apiClient.get(`/cases`, {params: param});
};
export const getCase = (caseId) => {
  return apiClient.get(`/cases/${caseId}`);
};
export const ExportCasesData=()=>{
  return apiClient.get(`/all-cases`);
}

export const getCasesCount = () => {
  return apiClient.get("/cases/counts");
};

export const createCase = (
  title,
  description,
  caseType,
  subcategoryID,
  clientID
) => {
  return apiClient.post("/cases", {
    title: title,
    description: description,
    case_type: caseType,
    subcategory_id: subcategoryID,
    client_id: clientID,
  });
};

export const updateCase = (caseId, caseData) => {
  return apiClient.put(`/cases/${caseId}`, {
    title: caseData.title,
    description: caseData.description,
    case_type: caseData.caseType,
    subcategory_id: caseData.subcategoryID,
    client_id: caseData.clientID,
  });
};

export const updateCaseState = (caseId, caseState) => {
  return apiClient.put(`cases/${caseId}/status`, {
    status: caseState,
  });
};

export const deleteCase = (caseId) => {
  return apiClient.delete(`/cases/${caseId}`);
};

// ====== Case status ======
export const getCaseStates = (Params) => {
  return apiClient.get(`/case_states`,{params: Params});
};

export const createCaseState = (caseID, title, description, lawyerID) => {
  return apiClient.post("/case_states", {
    case_id: caseID,
    title: title,
    description: description,
    lawyer_id: lawyerID,
  });
};

export const updateCaseStates = (
  caseStateId,
  caseID,
  title,
  description,
  lawyerID
) => {
  return apiClient.put(`/case_states/${caseStateId}`, {
    case_id: caseID,
    title: title,
    description: description,
    lawyer_id: lawyerID,
  });
};

export const updateCaseStateStatus = (caseId, caseFileState) => {
  return apiClient.put(`case_states/${caseId}/status`, {
    status: caseFileState,
  });
};

export const deleteCaseState = (caseFileId) => {
  return apiClient.delete(`/case_states/${caseFileId}`);
};

// ====== Case Files ======

export const getCaseFiles = (Params) => {
  return apiClient.get(`/case-files`, {
    params: Params
  });
};

export const createCaseFile = (caseID, fileName, uploadDate, file, action) => {
  const formData = new FormData();
  formData.append("case_id", caseID);
  formData.append("file_name", fileName);
  formData.append("action", action);
  if (action === "upload") {
    formData.append("file_upload_date", uploadDate);
    formData.append("file", file);
  }
  return apiClient.post("/case-files", formData);
};

export const updateCaseFileState = (caseId, caseFileState) => {
  return apiClient.put(`case-files/${caseId}/status`, {
    status: caseFileState,
  });
};

export const deleteCaseFile = (caseFileId) => {
  return apiClient.delete(`/case-files/${caseFileId}`);
};

export const downloadCaseFile = (caseFileId) => {
  return apiClient.get(`/case-files/download/${caseFileId}`,{
    responseType: "blob",
  });
};

// ====== Case Payments ======
export const getCasePayments = (Params) => {
  return apiClient.get(`/case_payments`, {
    params: Params
  });
};
export const getCasePaymentsTotal = (caseID) => {
  return apiClient.get(`/case_payments/totals/${caseID}`);
};
export const createCasePayment = (
  caseID,
  requiredAmount,
  paymentDetails,
  paymentDate,
  paidAmount,
  paymentMethod,
  action
) => {
  return apiClient.post("/case_payments", {
    case_id: caseID,
    required_amount: requiredAmount,
    payment_details: paymentDetails,
    payment_date: paymentDate,
    paid_amount: paidAmount,
    payment_method: paymentMethod,
    action: action,
  });
};

export const updateCasePayment = (casePaymentId,updateData) => {
  return apiClient.put(`/case_payments/${casePaymentId}`, updateData);
};

export const deleteCasePayment = (casePaymentId) => {
  return apiClient.delete(`/case_payments/${casePaymentId}`);
};

// ====== Cases Categories ======
export const getCasesCategories = () => {
  return apiClient.get("/case-categories");
};
export const getAllCasesCategoriesIDs = () => {
  return apiClient.get("/case-categories/get-all-categories");
};
export const getCaseCategory = (caseId) => {
  return apiClient.get(`case-categories/${caseId}`);
};

export const createCaseCategory = (title, image) => {
  // Create FormData object
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  return apiClient.post("/case-categories", formData);
};

export const updateCaseCategory = (caseId, caseData) => {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("title", caseData.title);
  if (caseData.image instanceof File) {
    formData.append("image", caseData.image);
  }
  return apiClient.post(`/case-categories/${caseId}`, formData);
};

export const updateCaseCategoryState = (caseId, caseData) => {
  return apiClient.put(`case-categories/${caseId}/status`, {
    status: caseData,
  });
};

export const deleteCaseCategory = (caseId) => {
  return apiClient.delete(`/case-categories/${caseId}`);
};

// ====== Cases Sub Categories ======

export const getCasesSubCategories = () => {
  return apiClient.get("/case-subcategories");
};
export const getAllCasesSubCategoriesIDs = () => {
  return apiClient.get("/case-subcategories/get-all-subcategories");
};
export const getCaseSubCategory = (caseId) => {
  return apiClient.get(`case-subcategories/${caseId}`);
};

export const createCaseSubCategory = (caseCategory_ID, title, image) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category_id", caseCategory_ID);
  return apiClient.post("/case-subcategories", formData);
};

export const updateCaseSubCategory = (caseId, caseCategoryID, title, image) => {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("title", title);
  formData.append("category_id", caseCategoryID);
  if (image instanceof File) {
    formData.append("image", image);
  }
  return apiClient.post(`/case-subcategories/${caseId}`, formData);
};

export const updateCaseSubCategoryState = (caseId, caseData) => {
  return apiClient.put(`case-subcategories/${caseId}/status`, {
    status: caseData,
  });
};

export const deleteCaseSubCategory = async (caseId) => {
  await apiClient.delete(`/case-subcategories/${caseId}`);
};
