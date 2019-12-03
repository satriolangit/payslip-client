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
  { path: "/pages/payslip/:employeeId", name: "Payslip", component: Payslip }
];

export default routes;
