import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Clients from "../Pages/UsersManagments/Clients";
import APPUsers from "../Pages/UsersManagments/APPUsers";
import OurTeam from "../Pages/UsersManagments/OurTeam";
import CreateUser from "../Pages/UsersManagments/CreateUser";
import UserView from "../Pages/UsersManagments/UserView";
import ErrorPage from "../Pages/ErrorPage";
import Cases from "../Pages/CasesManagments/Cases";
import CaseView from "../Pages/CasesManagments/CaseVIew";
import CaseUpdate from "../Pages/CasesManagments/CaseUpdate";
import CreateCase from "../Pages/CasesManagments/CreateCase";
import Posts from "../Pages/PostManagements/Posts";
import CreatePost from "../Pages/PostManagements/CreatePost";
import Login from "../Pages/Login";
import ProtectedRoute from "./ProtectedRoutes";
import CasesCategories from "../Pages/CasesManagments/CaseCategories/CasesCategories";
import CaseCategoryUpdate from "../Pages/CasesManagments/CaseCategories/CaseCategoryUpdate";
import CaseCategoryView from "../Pages/CasesManagments/CaseCategories/CaseCategoryView";
import CasesSubCategories from "../Pages/CasesManagments/CasesSubCategories/CasesSubCategories";
import SubCategoryView from "../Pages/CasesManagments/CasesSubCategories/SubCategoryView";
import SubCaseCategoryUpdate from "../Pages/CasesManagments/CasesSubCategories/SubCaseCategoryUpdate";
import Roles from "../Pages/UsersManagments/Roles";
import { permissionsNames } from "../helpers/constants";
import Notifications from '../Pages/Notifications/Notifications'
import UpdateUser from '../Pages/UsersManagments/UpdateUser'
import UserProfile from '../Pages/UserProfile'
import Chat from '../Pages/Chat'
import SupportTeam from '../Pages/SupportTeam'
import UpdateNotification from '../Pages/Notifications/UpdateNotification'
import ViewNotification from '../Pages/Notifications/ViewNotification'
import AboutUs from '../Pages/AboutUs'
const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* =====Users Routes===== */}
      <Route
        path="/user-profile"
        element={
          <ProtectedRoute >
            <UserProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/clients"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.users.view}>
            <Clients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/app-users"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.users.view}>
            <APPUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/our-team"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.users.view}>
            <OurTeam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/create-user"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.users.create}>
            <CreateUser />
          </ProtectedRoute>
        }
      />
       <Route
        path="/users/update-user/:id"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.users.edit}>
            <UpdateUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.users.view}>
            <UserView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/roles"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.role.create}>
            <Roles />
          </ProtectedRoute>
        }
      />

      {/* ======Cases Routes===== */}

      <Route
        path="/cases/all-cases"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.cases.view}>
            <Cases />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/case-view/:id"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.cases.view}>
            <CaseView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/case-update/:id"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.cases.edit}>
            <CaseUpdate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/create-case"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.cases.create}>
            <CreateCase />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/create-categories"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.office.view}>
            <CasesCategories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/case-category/:id"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.office.edit}>
            <CaseCategoryUpdate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/case-category-view/:id"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.office.view}>
            <CaseCategoryView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cases/create-subCategory"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.office.view}>
            <CasesSubCategories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/subCategory/:id"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.office.edit}>
            <SubCaseCategoryUpdate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/subCategory-view/:id"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.office.view}>
            <SubCategoryView />
          </ProtectedRoute>
        }
      />
       <Route
        path="/about-office"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.office.view}>
            <AboutUs />
          </ProtectedRoute>
        }
      />
      
      {/* =====Chat Routes===== */}
      <Route
        path="/chat/:reciverId?"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.chat.view}>
            <Chat />
          </ProtectedRoute>
        }
      />

      {/* =====Posts Routes===== */}

      <Route
        path="/posts"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.posts.view}>
            <Posts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-post"
        element={
          <ProtectedRoute requiredPermission={permissionsNames.posts.create}>
            <CreatePost />
          </ProtectedRoute>
        }
      />

      {/* Email Notifications */}
      <Route
        path="/notifications"
        element={
         <ProtectedRoute
          requiredPermission={permissionsNames.notifications.view}
          >
            <Notifications />
          </ProtectedRoute>
        }
      />
       <Route
        path="/notification-update/:id"
        element={
         <ProtectedRoute
          requiredPermission={permissionsNames.notifications.edit}
          >
            <UpdateNotification />
          </ProtectedRoute>
        }
      />
       <Route
        path="/notification/:id"
        element={
         <ProtectedRoute
          requiredPermission={permissionsNames.notifications.view}
          >
            <ViewNotification />
          </ProtectedRoute>
        }
      />
       {/*  Support Team */}
       <Route
        path="/support-team"
        element={
         <ProtectedRoute
          requiredPermission={permissionsNames.users.view}
          >
            <SupportTeam />
          </ProtectedRoute>
        }
      />

      {/* =====Other Routes===== */}

      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
