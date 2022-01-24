import React from "react";
import retry from "./retry";

const Profile = React.lazy(() =>
  retry(() => import("./views/Pages/Profile/Profile"))
);
const ChangePassword = React.lazy(() =>
  retry(() => import("./views/Pages/ChangePassword/ChangePassword"))
);
const Home = React.lazy(() =>
  retry(() => import("./views/Pages/Dashboard/Dashboard"))
);
const Information = React.lazy(() =>
  retry(() => import("./views/Pages/Information/Information"))
);
const Announcement = React.lazy(() =>
  retry(() => import("./views/Pages/Announcement/Announcement"))
);
const Payslip = React.lazy(() =>
  retry(() => import("./views/Pages/Payslip/Payslip"))
);
const AnnouncementList = React.lazy(() =>
  retry(() => import("./views/Announcement/List"))
);
const AnnouncementForm = React.lazy(() =>
  retry(() => import("./views/Announcement/Edit"))
);
const InformationList = React.lazy(() =>
  retry(() => import("./views/Information/List"))
);
const InformationForm = React.lazy(() =>
  retry(() => import("./views/Information/Edit"))
);
const UserList = React.lazy(() => retry(() => import("./views/User/List")));
const UserListBySite = React.lazy(() =>
  retry(() => import("./views/User/ListBySite"))
);
const UserForm = React.lazy(() => retry(() => import("./views/User/Edit")));
const UserForm2 = React.lazy(() => retry(() => import("./views/User/Edit2")));

const UserChangePassword = React.lazy(() =>
  retry(() => import("./views/User/ChangePassword"))
);
const PayslipList = React.lazy(() =>
  retry(() => import("./views/Payslip/List"))
);
const PayslipUpload = React.lazy(() =>
  retry(() => import("./views/Payslip/Upload"))
);
const FileList = React.lazy(() => retry(() => import("./views/Files/List")));
const FileUpload = React.lazy(() =>
  retry(() => import("./views/Files/Upload"))
);
const PrivacyPolicy = React.lazy(() =>
  retry(() => import("./views/Pages/PrivacyPolicy/PrivacyPolicy"))
);
const Survey = React.lazy(() =>
  retry(() => import("./views/Survey/SurveyForm"))
);
const SurveyReport = React.lazy(() =>
  retry(() => import("./views/Survey/Report"))
);
// DEBUG
const UserChangePassword_DEV = React.lazy(() =>
  retry(() => import("./views/User/ChangePwd"))
);

//ideabox routes
const IdeaboxDashboard = React.lazy(() =>
  retry(() => import("./views/Ideabox/Dashboard/Dashboard"))
);

const IdeaboxApprovalList = React.lazy(() =>
  retry(() => import("./views/Ideabox/Approval/ApprovalMappingList"))
);

const IdeaboxSubmitForm = React.lazy(() =>
  retry(() => import("./views/Ideabox/Form/SubmitForm"))
);

const IdeaboxViewForm = React.lazy(() =>
  retry(() => import("./views/Ideabox/Form/ViewForm"))
);

const IdeaboxEditForm = React.lazy(() =>
  retry(() => import("./views/Ideabox/Form/EditForm"))
);

const IdeaboxNotification = React.lazy(() =>
  retry(() => import("./views/Ideabox/Notification/NotificationMappingList"))
);

const IdeaboxNotificationAdmin = React.lazy(() =>
  retry(() =>
    import("./views/Ideabox/Notification/NotificationMappingListAdmin")
  )
);

const IdeaboxNotificationReport = React.lazy(() =>
  retry(() => import("./views/Ideabox/Notification/Report"))
);

const IdeaboxApprovalMappingAdd = React.lazy(() =>
  retry(() => import("./views/Ideabox/Approval/ApprovalAdd"))
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/welcome", exact: true, name: "Welcome" },
  { path: "/dashboard", name: "Dashboard", component: Home },
  { path: "/profile", exact: true, name: "Profile", component: Profile },
  {
    path: "/changepwd",
    exact: true,
    name: "Change Password",
    component: ChangePassword,
  },
  { path: "/home", exact: true, name: "Home", component: Home },
  {
    path: "/pages/information",
    exact: true,
    name: "Information",
    component: Information,
  },
  {
    path: "/pages/information/:id",
    name: "Information",
    component: Information,
  },
  {
    path: "/pages/announcement",
    exact: true,
    name: "Announcement",
    component: Announcement,
  },
  {
    path: "/pages/announcement/:id",
    name: "Announcement",
    component: Announcement,
  },
  { path: "/pages/payslip/:employeeId", name: "Payslip", component: Payslip },
  {
    path: "/privacy-policy",
    exact: true,
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/admin/announcement",
    exact: true,
    name: "Announcement",
    component: AnnouncementList,
  },
  {
    path: "/admin/announcement/:id",
    name: "Edit",
    component: AnnouncementForm,
  },
  {
    path: "/admin/information",
    exact: true,
    name: "Information",
    component: InformationList,
  },
  {
    path: "/admin/information/:id",
    name: "Edit",
    component: InformationForm,
  },
  {
    path: "/admin/user",
    exact: true,
    name: "User",
    component: UserList,
  },
  {
    path: "/admin/user_by_site",
    exact: true,
    name: "User",
    component: UserListBySite,
  },
  {
    path: "/admin/user/cp/:id",
    name: "Change Password",
    exact: true,
    component: UserChangePassword,
  },
  {
    path: "/admin/user/cp_dev/:id",
    name: "Change Password",
    exact: true,
    component: UserChangePassword_DEV,
  },
  {
    path: "/admin/user/:id",
    exact: true,
    name: "Edit",
    component: UserForm,
  },
  {
    path: "/admin/user/site/:id",
    exact: true,
    name: "Edit",
    component: UserForm2,
  },
  {
    path: "/admin/payslip",
    exact: true,
    name: "Payslip",
    component: PayslipList,
  },
  {
    path: "/admin/payslip/upload",
    exact: true,
    name: "Upload",
    component: PayslipUpload,
  },
  {
    path: "/admin/files",
    exact: true,
    name: "Files",
    component: FileList,
  },
  {
    path: "/admin/files/upload",
    exact: true,
    name: "Upload",
    component: FileUpload,
  },
  {
    path: "/survey",
    exact: true,
    name: "Survey",
    component: Survey,
  },
  {
    path: "/admin/survey/report",
    exact: true,
    name: "SurveyReport",
    component: SurveyReport,
  },
  {
    path: "/ideabox/dashboard",
    exact: true,
    name: "Dashboard",
    component: IdeaboxDashboard,
  },
  {
    path: "/ideabox/administration/approval",
    exact: true,
    name: "Approval",
    component: IdeaboxApprovalList,
  },
  {
    path: "/ideabox/submit",
    exact: true,
    name: "Submit Ideabox",
    component: IdeaboxSubmitForm,
  },
  {
    path: "/ideabox/view/:id",
    exact: true,
    name: "Ideabox Detail",
    component: IdeaboxViewForm,
  },
  {
    path: "/ideabox/edit/:id",
    exact: true,
    name: "Edit Ideabox",
    component: IdeaboxEditForm,
  },
  {
    path: "/ideabox/notification",
    exact: true,
    name: "Notification Setting",
    component: IdeaboxNotification,
  },
  {
    path: "/ideabox/administration/notification",
    exact: true,
    name: "Notification Setting",
    component: IdeaboxNotificationAdmin,
  },
  {
    path: "/ideabox/administration/notification-report",
    exact: true,
    name: "Notification Report",
    component: IdeaboxNotificationReport,
  },
  {
    path: "/ideabox/approval/mapping",
    exact: true,
    name: "Approval Mapping",
    component: IdeaboxApprovalMappingAdd,
  },
];

export default routes;
