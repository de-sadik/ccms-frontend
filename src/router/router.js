import { Drawer } from "@mui/material";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppBarComponet from "../components/appBar/appBar";
import Home from "../components/dashboard/home";
import TemporaryDrawer from "../components/sidebar/sidebar";
import Login from "../screens/authentecation/login";
import Dashboard from "../screens/user/dashboard";
import NotificationComponet from "../screens/user/notification";
import vendor from "../screens/user/vendorPage";

export default class RouterComponent extends React.Component {
  render() {
    return (
      <Router>
        {/* <Suspense fallback={<LoaderComponent/>}> */}
        <Switch>
          <Route path="/" component={Login} exact />

          <div>
            <AppBarComponet />
            {/* <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              <TemporaryDrawer anchor="left"/>
            </Drawer> */}
            <Route path="/vendor-page" component={Home} exact />
            <Route path="/dashboard" component={Dashboard} exact />
            <Route
              path="/notification"
              component={NotificationComponet}
              exact
            />
          </div>
        </Switch>
        {/* </Suspense> */}
      </Router>
    );
  }
}
