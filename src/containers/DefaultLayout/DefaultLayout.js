import React, { useContext, Suspense, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
import defaultNavigation, { adminNavigation } from "../../_nav";
// routes config
import routes from "../../routes";
import AuthContext from "./../../context/auth/authContext";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

const DefaultLayout = props => {
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated, user } = authContext;
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
    // if(props.location.pathname === "/" && !isAuthenticated) {
    //   props.history.push("/welcome")
    // } 
    // else if(!isAuthenticated && (props.location.pathname !== "/privacy-policy" || props.location.pathname !== "/welcome")) 
    // {
    //   props.history.push("/login");
    // }    

    if(!isAuthenticated) 
    {
      props.history.push("/login");
    }    

  }, [isAuthenticated, props.history, props.location]);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      //console.log(currentUser);
      //console.log(navigation);

      if (currentUser.role === "admin") {
        const adminNav = [...navigation.items, adminNavigation]; 
        const all = [...adminNav, logoutNav];
        setNavigation({ ...navigation, items: all });
      }

      if (currentUser.role === "employee") {
        const all = [...navigation.items, logoutNav];
        setNavigation({ ...navigation, items: all });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentUser]);

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e => signOut(e)} user={currentUser} />
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
          <AppBreadcrumb appRoutes={routes} router={router} />
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
