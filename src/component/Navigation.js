import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase';

import AuthUserContext from './AuthUserContext';
import * as routes from '../constants/routes';
const selectedStyle = {
    color: "black",
    fontWeight: 'bold'
}
const Navigation = () =>
  <nav className="navbar navbar-light">
    <div className="container">
    <a className="navbar-brand" href="/">Zimplistic</a>
        <AuthUserContext.Consumer>
          {authUser => authUser
            ? <NavigationAuth authUser={authUser}/>
            : <NavigationNonAuth />
          }
        </AuthUserContext.Consumer>
    </div>
  </nav>

const NavigationAuth = ({authUser}) =>

  <ul className="nav navbar-nav pull-xs-right">    
    <li className="nav-item"><NavLink to={routes.HOME} className="nav-link" activeStyle={selectedStyle}>Home</NavLink></li>
    <li className="nav-item"><NavLink to={routes.ACCOUNT} className="nav-link" activeStyle={selectedStyle}>Account</NavLink></li>
    <li className="nav-item"><NavLink exact to={routes.LANDING} className="nav-link" onClick={auth.doSignOut} activeStyle={selectedStyle}>Sign Out</NavLink></li>
    <li className="nav-item">{authUser.email}</li>
  </ul>


const NavigationNonAuth = () =>
  <ul className="nav navbar-nav pull-xs-right">
    <li className="nav-item"><NavLink exact to={routes.LANDING} className="nav-link" activeStyle={selectedStyle} >Landing</NavLink></li>
    <li className="nav-item"><NavLink exact to={routes.SIGN_IN} className="nav-link" activeStyle={selectedStyle}>Sign In</NavLink></li>
  </ul>
export default Navigation;