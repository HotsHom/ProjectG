import * as React from "react";
import {Link} from "react-router-dom";
import {RegistrationUser} from "../../repositories/rest/apiService";

let userData_ = {
    "email":"",
    "password" : ""
}

export class RegisterScreen extends React.Component{
    ChangeEmail(event) {
        userData_.email = event.target.value
    }
    ChangePassword(event){
        userData_.password = event.target.value
    }

    render() {
        return(
            <form className="form">
                <input type="text" placeholder="Email" onChange={this.ChangeEmail}/>
                <input type="text" placeholder="Password" onChange={this.ChangePassword}/>
                <Link onClick={() => RegistrationUser(userData_)} to="login">Зарегистрироваться</Link>
            </form>
        );
    }
}