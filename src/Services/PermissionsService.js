const PERMISSONS = "per";

export const setUserPermissions = (permisssions) => {
  localStorage.setItem(PERMISSONS, JSON.stringify(permisssions));
};
export const getPermissons = () => {
  const permissions = localStorage.getItem(PERMISSONS);
  try {
    return permissions ? JSON.parse(permissions) : [];
  } catch (error) {
    // console.error("Failed to parse permissions from localStorage", error);
    return [];
  }
};

export const removePermissions = () => {
  localStorage.removeItem(PERMISSONS);
};
