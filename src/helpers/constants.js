export const permissionsNames = {
  users: {
    view: "View Customer Management",
    create: "Create Customer Management",
    edit: "Edit Customer Management",
    delete: "Delete Customer Management",
  },
  cases: {
    view: "View Case Management",
    create: "Create Case Management",
    edit: "Edit Case Management",
    delete: "Delete Case Management",
  },
  posts: {
    view: "View Posts Management",
    create: "Create Posts Management",
    edit: "Edit Posts Management",
    delete: "Delete Posts Management",
  },
  chat: {
    view: "View Messages and Conversations Management",
    create: "Create Messages and Conversations Management",
    edit: "Edit Messages and Conversations Management",
    delete: "Delete Messages and Conversations Management",
  },
  notifications: {
    view: "View Notifications Management",
    create: "Create Notifications Management",
    edit: "Edit Notifications Management",
    delete: "Delete Notifications Management",
  },
  office: {
    view: "View About Office Management",
    create: "Create About Office Management",
    edit: "Edit About Office Management",
    delete: "Delete About Office Management",
  },
  role: {
    view: "View Team Management",
    create: "Role Permission",
  },
};

export const caseTypeData = [
  {
    id: 1,
    value: "1",
    name: "ongoing",
  },
  {
    id: 2,
    value: "2",
    name: "ended",
  },
  {
    id: 3,
    value: "",
    name: "all",
  },
];
export const caseStatusData = [
  {
    id: 1,
    value: 1,
    name: "active",
  },
  {
    id: 2,
    value: 0,
    name: "inactive",
  },
  {
    id: 3,
    value: "",
    name: "all",
  },
];

export const clientStatus = [
  {
    id: 1,
    value: 0,
    name: "ongoing",
  },
  {
    id: 2,
    value: 1,
    name: "ended",
  },
  {
    id: 3,
    value: "",
    name: "all",
  },
];
export const userStatus = [
  {
    id: 1,
    value: 1,
    name: "active",
  },
  {
    id: 2,
    value: 0,
    name: "inactive",
  },
  {
    id: 3,
    value: "",
    name: "all",
  },
];

export const usersType = [
  {
    id: 1,
    value: "1",
    name: "client",
  },
  {
    id: 2,
    value: "2",
    name: "user",
  },
  {
    id: 3,
    value: "3",
    name: "our team",
  },
];

export const usersTypeWithAll = [
  {
    id: 1,
    value: "1",
    name: "client",
  },
  {
    id: 2,
    value: "2",
    name: "user",
  },
  {
    id: 3,
    value: "3",
    name: "our team",
  },
  {
    id: 4,
    value: "0",
    name: "all",
  },
];
