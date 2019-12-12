export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info"
      }
    },
    {
      name: "Informasi",
      url: "/pages/information",
      icon: "icon-book-open"
    },
    {
      name: "Pengumuman",
      url: "/pages/announcement",
      icon: "icon-bell"
    },
    {
      divider: true
    }
  ]
};

const adminNavigation = {
  name: "Administration",
  url: "/admin",
  icon: "icon-settings",
  children: [
    {
      name: "User",
      url: "/admin/user",
      icon: "icon-user"
    },
    {
      name: "Pengumuman",
      url: "/admin/announcement",
      icon: "icon-bell"
    },
    {
      name: "Informasi",
      url: "/admin/information",
      icon: "icon-book-open"
    },
    {
      name: "Payslip",
      url: "/admin/payslip",
      icon: "icon-doc"
    },
    {
      name: "Files",
      url: "/admin/files",
      icon: "fa fa-file"
    }
  ]
};

export { adminNavigation };
