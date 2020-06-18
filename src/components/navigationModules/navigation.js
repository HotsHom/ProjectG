import React from "react";
import {observer} from "mobx-react";
import UserStore from "../../repositories/local/store/userStore"
import {BrowserRouter, Link, Route} from "react-router-dom";
import HomeScreen from "../workScreens/homeScreen";
import {TaskCreateView} from "../workScreens/taskCreateView";
import {LoginScreen} from "../authScreens/loginScreen";
import {RegisterScreen} from "../authScreens/registerScreen";
import Main from "../authScreens/mainScreen";

const UrlList = observer(() => (
     UserStore.isFlagAuth.Flag?
         <BrowserRouter>
             <div className="nav-bar">
                 <Link className="nav-but" to="/home">HOME</Link>|
                 <a className="nav-but" href="/">LOGOUT</a>
             </div>
             <div className="mainscreen">
                 <Route path="/home" component={HomeScreen}/>
                 <Route exact path="/createtask" component={TaskCreateView}/>
                 <Route exact path="/edittask/:id" component={TaskCreateView}/>
             </div>
         </BrowserRouter>
        :
         <BrowserRouter>
             <div className="nav-bar">
                 <Link className="nav-but" to="/">HOME</Link>|
                 <Link className="nav-but" to="/login">LOGIN</Link>|
                 <Link className="nav-but" to="/register">REGISTRATION</Link>
             </div>
             <div className="mainscreen">
                 <Route exact path="/login" component={LoginScreen}/>
                 <Route exact path="/register" component={RegisterScreen}/>
                 <Route exact path="/" component={Main}/>
             </div>
         </BrowserRouter>
))

export default UrlList