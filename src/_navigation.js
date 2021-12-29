export default {
    items: [
        {
          name: "Dashboard",
          url: "/dashboard",
          icon: "icon-speedometer",
          site: "PAYSLIP",
          isAdmin: false,
          badge: {
            variant: "info"
          }
        },
        {
          name: "Informasi",
          url: "/pages/information",
          icon: "icon-book-open",
          site: "PAYSLIP",
          isAdmin: false
        },
        {
          name: "Pengumuman",
          url: "/pages/announcement",
          icon: "icon-bell",
          site: "PAYSLIP",
          isAdmin: false
        },
        {
          divider: true
        },
        {
            name: "Administration",
            url: "/admin",
            icon: "icon-settings",
            site: "PAYSLIP",
            isAdmin: true,
            children: [
              {
                name: "User",
                url: "/admin/user",
                icon: "icon-user",
                site: "PAYSLIP",
                isAdmin: true
              },
              {
                name: "Pengumuman",
                url: "/admin/announcement",
                icon: "icon-bell",
                site: "PAYSLIP",
                isAdmin: true
              },
              {
                name: "Informasi",
                url: "/admin/information",
                icon: "icon-book-open",
                site: "PAYSLIP",
                isAdmin: true
              },
              {
                name: "Payslip",
                url: "/admin/payslip",
                icon: "icon-doc",
                site: "PAYSLIP",
                isAdmin: true
              },
              {
                name: "Files",
                url: "/admin/files",
                icon: "icon-puzzle",
                site: "PAYSLIP",
                isAdmin: true
              }
            ]
          },
          {
            name: "Survey",
            url: "/survey",
            icon: "icon-bell",
            site: "SURVEY",
            isAdmin: false
          },
          {
            name: "Administration",
            url: "/admin",
            icon: "icon-settings",
            site: "SURVEY",
            isAdmin: true,
            children: [
              {
                name: "User",
                url: "/admin/user_by_site",
                icon: "icon-user",
                site: "SURVEY",
                isAdmin: true
              },
              {
                name: "Report Survey",
                url: "/admin/survey/report",
                icon: "icon-puzzle",
                site: "SURVEY",
                isAdmin: true
              }
            ]    
          },
          {
              name: "idbx-dashboard",
              url: "/ideabox/dashboard",
              icon: "icon-speedometer",
              site: "IDEABOX",
              isAdmin: false
          },
          {
            name: "idbx-administration",
            url: "/ideabox/admin",
            icon: "icon-settings",
            site: "IDEABOX",
            isAdmin: true,
            children: [
              {
                name: "approval-role",
                url: "/ideabox/approval",
                icon: "icon-user",
                site: "IDEABOX",
                isAdmin: true
              },
              {
                name: "notification",
                url: "/ideabox/notification",
                icon: "icon-puzzle",
                site: "IDEABOX",
                isAdmin: true
              },
              {
                name: "notification-report",
                url: "/ideabox/notification-report",
                icon: "icon-puzzle",
                site: "IDEABOX",
                isAdmin: true
              }
            ]    
          }
      ]
}