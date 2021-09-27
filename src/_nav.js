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
    },
    {
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
          icon: "icon-puzzle"
        }
      ]
    }
  ]
};

const userNavigationSurvey = {
  items: [
    {
      name: "Survey",
      url: "/survey",
      icon: "icon-bell"
    }
  ]
};


const adminNavigationSurvey = {
  items:[
    {
      name: "Survey",
      url: "/survey",
      icon: "icon-bell"
    },
    {
      name: "Administration",
      url: "/admin",
      icon: "icon-settings",
      children: [
            {
          name: "Report Survey",
          url: "/admin/survey/report",
          icon: "icon-puzzle"
        }
      ]    
    }  
  ]  
};


export { adminNavigation, userNavigationSurvey, adminNavigationSurvey };
