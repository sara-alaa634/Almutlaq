import apiClient from "./apiClient";


// get users + clients data for dropdown
export const getUsersAndClients = () => {
  return apiClient.get("/getAllClients");
};


// for dropdowns as lawyers and exports  
export const filterUsers = (userType) => {
  return apiClient.get("/all-users-filter", {
    params: {
      user_type:userType
    }
  });
};

export const filterUsersCount = (userType) => {
  return apiClient.get("/users-filter-count", {
    params: {
      user_type:userType
    }
  });
};

// for the get api tables  with paginations
export const filterUsersPage = (Params) => {
  return apiClient.get("/users-filter", { params:Params });
};
export const getUserProfileData=(id)=>{
  return apiClient.get(`/users/${id}/profile`)
}
export const getUserProfileAdminPermission=(id)=>{
  return apiClient.get(`/users/${id}/profile-without-permition`)
}
export const getLoggedUserProfile=()=>{
  return apiClient.get("/users/dashboard-profile")
}
export const getUserProfileCases=(id)=>{
  return apiClient.get(`/users/${id}/profile-case`)
}
export const createUserByAdmin = (data) => {
  return apiClient.post("/registerByAdmin", data);
};
export const updateUserProfileByAdmin=(data) =>{
  return apiClient.post("/user-profile/profile/update",data)
}
export const updateLoggedUserProfile=(data) =>{
  return apiClient.post("/dashboard-update",data)
}
export const updateUserStatus = (data) => {
  return apiClient.post("/user/update-status",data );
};

export const userDelete = (userID) => {
  return apiClient.delete(`/users/${userID}`);
};
export const userBlock=(userId)=>{
  return apiClient.post("/block-user",{
    blocked_user_id:userId
  })
}
export const userUnBlock=(userId)=>{
  return apiClient.post("/unblock-user",{
    blocked_user_id:userId
  })
}

export const createRole = (data) => {
  return apiClient.post("/permissions/assign",data);
};
export const getRoles=()=>{
  return apiClient.get("/roles")
}



