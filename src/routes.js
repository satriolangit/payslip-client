import React from "react";

const Profile = React.lazy(() => import("./views/Pages/Profile/Profile"));
const ChangePassword = React.lazy(() =>
  import("./views/Pages/ChangePassword/ChangePassword")
);
const Home = React.lazy(() => import("./views/Pages/Dashboard/Dashboard"));
const Information = React.lazy(() =>
  import("./views/Pages/Information/Information")
);
const Announcement = React.lazy(() =>
  import("./views/Pages/Announcement/Announcement")
);
const Payslip = React.lazy(() => import("./views/Pages/Payslip/Payslip"));
const AnnouncementList = React.lazy(() => import("./views/Announcement/List"));
const AnnouncementForm = React.lazy(() => import("./views/Announcement/Edit"));
const InformationList = React.lazy(() => import("./views/Information/List"));
const InformationForm = React.lazy(() => import("./views/Information/Edit"));
const UserList = React.lazy(() => import("./views/User/List"));
const UserForm = React.lazy(() => import("./views/User/Edit"));
const UserChangePassword = React.lazy(() =>
  import("./views/User/ChangePassword")
);
const PayslipList = React.lazy(() => import("./views/Payslip/List"));
const PayslipUpload = React.lazy(() => import("./views/Payslip/Upload"));
const FileList = React.lazy(() => import("./views/Files/List"));
const FileUpload = React.lazy(() => import("./views/Files/Upload"));
const PrivacyPolicy = React.lazy(() =>
  import("./views/Pages/PrivacyPolicy/PrivacyPolicy")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Home },
  { path: "/profile", exact: true, name: "Profile", component: Profile },
  {
    path: "/changepwd",
    exact: true,
    name: "Change Password",
    component: ChangePassword
  },
  { path: "/home", exact: true, name: "Home", component: Home },
  {
    path: "/pages/information",
    exact: true,
    name: "Information",
    component: Information
  },
  {
    path: "/pages/information/:id",
    name: "Information",
    component: Information
  },
  {
    path: "/pages/announcement",
    exact: true,
    name: "Announcement",
    component: Announcement
  },
  {
    path: "/pages/announcement/:id",
    name: "Announcement",
    component: Announcement
  },
  { path: "/pages/payslip/:employeeId", name: "Payslip", component: Payslip },
  {
    path: "/privacy-policy",
    exact: true,
    name: "PrivacyPolicy",
    component: PrivacyPolicy
  },
  {
    path: "/admin/announcement",
    exact: true,
    name: "Announcement",
    component: AnnouncementList
  },
  {
    path: "/admin/announcement/:id",
    name: "Edit",
    component: AnnouncementForm
  },
  {
    path: "/admin/information",
    exact: true,
    name: "Information",
    component: InformationList
  },
  {
    path: "/admin/information/:id",
    name: "Edit",
    component: InformationForm
  },
  {
    path: "/admin/user",
    exact: true,
    name: "User",
    component: UserList
  },
  {
    path: "/admin/user/cp/:id",
    name: "Change Password",
    exact: true,
    component: UserChangePassword
  },
  {
    path: "/admin/user/:id",
    exact: true,
    name: "Edit",
    component: UserForm
  },
  {
    path: "/admin/payslip",
    exact: true,
    name: "Payslip",
    component: PayslipList
  },
  {
    path: "/admin/payslip/upload",
    exact: true,
    name: "Upload",
    component: PayslipUpload
  },
  {
    path: "/admin/files",
    exact: true,
    name: "Files",
    component: FileList
  },
  {
    path: "/admin/files/upload",
    exact: true,
    name: "Upload",
    component: FileUpload
  }
];

export default routes;
