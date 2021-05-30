import React from "react";
import { AuthProvider } from "./AuthContext";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Signup from "./Components/Authentication/Signup";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Authentication/Login";
import UpdateEmail from "./Components/Authentication/UpdateEmail";
import UpdateUser from "./Components/Authentication/UpdateUser";
import Profile from "./Components/Authentication/Profile";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import Navbar from "./Components/Navbar";


function App() {
  return (
    <Container>
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard}/>
            <PrivateRoute path="/update-email" component={UpdateEmail} />
            <PrivateRoute path="/update-profile" component={UpdateUser} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;