import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Carrousel from "./components/Carrousel.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./components/Profile.jsx";
import EditProfile from "./components/EditProfile.jsx";
import ModalUsers from "./components/modalUsers.jsx";
import { getIdUser, getAllUsers, getAllPms, getAllInstructors,  getAllCohortes,  getAllStudents, } from "./actions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sidebar from "./components/sidebar";

function App(props) {
  const isAutenticated = () => {
    const token = localStorage.getItem("username");

    if (token) {
      return true;
    }
    return false;
  };

  const idUser = localStorage.getItem("idUser");

  useEffect(() => {
    props.getIdUser(idUser);
    props.getAllUsers();
    props.getAllPms();
    props.getAllInstructors();
    props.getAllCohortes()
    props.getAllStudents();
  }, []);

  console.log('a ver el estado de USER ',props.id_user)

  const PvRoute = (props) =>
    isAutenticated() ? <Route {...props} /> : <Redirect to="./login" />;

  return (
    <div>
      <Router>
        <PvRoute path="/" component={Navbar} />
        <PvRoute path="/" >
          <Sidebar user={props.id_user} />
        </PvRoute>
        <PvRoute exact path="/profile" component={Profile} />
        <PvRoute exact path="/editprofile" component={EditProfile} />
        {/*Ruta provisoria señor*/}
        <PvRoute
          exact
          path="/modal"
          render={() => <ModalUsers users={props.all_users} />}
        />
      </Router>
      {isAutenticated() === false ? (
        <Route exact path="/login" component={Login} />
        
      ) : (
        ""
      )}
      
       
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getIdUser: (idUser) => dispatch(getIdUser(idUser)),
    getAllUsers: () => dispatch(getAllUsers()),
    getAllPms: () => dispatch(getAllPms()),
    getAllInstructors: () => dispatch(getAllInstructors()),
    getAllStudents: () => dispatch(getAllStudents()),
    getAllCohortes: () => dispatch(getAllCohortes()),
  };
};

const mapStateToProps = (state) => {
  return {
    id_user: state.id_user,
    all_users: state.all_users,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
