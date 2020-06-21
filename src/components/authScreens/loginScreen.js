import * as React from "react";
import {Link} from "react-router-dom"
import UserStore from "../../repositories/local/store/userStore";

let userData_ = {
    "email":"",
    "password" : ""
}

export class LoginScreen extends React.Component{
    ChangeEmail(event) {
        UserStore.saveEmail(event.target.value)
    }
    ChangePassword(event){
        UserStore.savePassword(event.target.value)
    }

    render() {
        return(
            <form className="form">
                <input type="text" placeholder="Email" onChange={this.ChangeEmail}/>
                <input type="text" placeholder="Password" onChange={this.ChangePassword}/>
                <Link onClick={UserStore.authUser} to="/home">Залогиниться</Link>
            </form>
        );
    }
}

