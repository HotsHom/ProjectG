import React from "react";
import {observer} from "mobx-react";
import UserStore from "../../repositories/local/store/userStore"
import {BrowserRouter, Link, Route} from "react-router-dom";
import HomeScreen from "../workScreens/homeScreen";
import {TaskCreateView} from "../workScreens/taskCreateView";
import {LoginScreen} from "../authScreens/loginScreen";
import {RegisterScreen} from "../authScreens/registerScreen";
import Main from "../authScreens/mainScreen";
import {LogoutScreen} from "../authScreens/logoutScreen";
import styles from "../../style/navigation.module.css";
import {Warning} from "../warning/warning";

class UrlList extends React.Component{
    render() {
        return (
            UserStore.isFlagAuth.Flag ?
                <BrowserRouter>
                    <Warning />
                    <div className={styles.navBar}>
                        <Link className={styles.navBut} to="/home">HOME</Link>|
                        <Link className={styles.navBut} to="/logout">LOGOUT</Link>
                    </div>
                    <div className="mainscreen">
                        <Route path="/home" component={HomeScreen}/>
                        <Route exact path="/createtask" component={TaskCreateView}/>
                        <Route exact path="/edittask/:id" component={TaskCreateView}/>
                        <Route exact path="/logout" component={LogoutScreen}/>
                    </div>
                </BrowserRouter>
                :
                <BrowserRouter>
                    <Warning />
                    <div className={styles.navBar}>
                        <Link className={styles.navBut} to="/">HOME</Link>|
                        <Link className={styles.navBut} to="/login">LOGIN</Link>|
                        <Link className={styles.navBut} to="/register">REGISTRATION</Link>
                    </div>
                    <div className="mainscreen">
                        <Route exact path="/login" component={LoginScreen}/>
                        <Route exact path="/register" component={RegisterScreen}/>
                        <Route exact path="/" component={Main}/>
                    </div>
                </BrowserRouter>
        )
    }
}
export default observer(UrlList)