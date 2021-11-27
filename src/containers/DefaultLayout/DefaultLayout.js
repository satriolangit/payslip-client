import React, { useContext, Suspense, useEffect, useState } from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import defaultNavigation, { adminNavigation, userNavigationSurvey, adminNavigationSurvey } from "../../_nav";
// routes config
import routes from "../../routes";
import AuthContext from "./../../context/auth/authContext";
import SiteContext from "../../context/site/siteContext";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

const DefaultLayout = props => {
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated, user } = authContext;
  const siteContext  = useContext(SiteContext);
  const { siteName } = siteContext;
  const [navigation, setNavigation] = useState(defaultNavigation);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
    role: "",
    photo: "",
    employee_id: ""
  });

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  const signOut = e => {
    e.preventDefault();
    logout();
  };

  const logoutNav = {
    name: "Logout",
    url: "/logout",
    icon: "icon-lock-open",
    attributes: {
      onClick: e => {
        logout();
      }
    }
  };

  useEffect(() => {    
    if(!isAuthenticated && props.location.pathname !== "/login") {
      props.history.push("/welcome");
    }

  }, [isAuthenticated, props.history, props.location]);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      //console.log(currentUser);
      //console.log(navigation);

      if(siteName === "PAYSLIP") {
        if (currentUser.role === "admin") {
          const all = [...adminNavigation.items, logoutNav];
          setNavigation({ ...navigation, items: all });
        }
  
        if (currentUser.role === "employee") {
          const all = [...defaultNavigation.items, logoutNav];
          setNavigation({ ...navigation, items: all });
        }
      } else if(siteName === "SURVEY") {
        if (currentUser.role === "admin") {
          const all = [...adminNavigationSurvey.items, logoutNav];
          setNavigation({ ...navigation, items: all });
        }
  
        if (currentUser.role === "employee") {
          const all = [...userNavigationSurvey.items, logoutNav];
          setNavigation({ ...navigation, items: all });
        }
      } else {
        //ideabox
      }

      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentUser]);

  const renderBreadcrumb = () => {
    if(siteName === "PAYSLIP") {
      return (
        <AppBreadcrumb appRoutes={routes} router={router} />
      );
    } 
  } 

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e => signOut(e)} user={currentUser} siteName={siteName}/>
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigation} {...props} router={router} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          {renderBreadcrumb()}
          <Container fluid>
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Suspense>
          </Container>
        </main>
        <AppAside fixed>
          <Suspense fallback={loading()}>
            <DefaultAside />
          </Suspense>
        </AppAside>
      </div>
      <AppFooter>
        <Suspense fallback={loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
};

export default DefaultLayout;
