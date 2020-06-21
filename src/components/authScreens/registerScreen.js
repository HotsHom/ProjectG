import * as React from "react";
import {Link} from "react-router-dom";
import UserStore from "../../repositories/local/store/userStore";
import styles from "../../style/registerScreen.module.css"

export class RegisterScreen extends React.Component{
    ChangeEmail(event) {
        UserStore.saveEmail(event.target.value)
    }
    ChangePassword(event){
        UserStore.savePassword(event.target.value)
    }

    render() {
        return(
            <form className={styles.form}>
                <input className={styles.form_Input} type="text" placeholder="Email" onChange={this.ChangeEmail}/>
                <input className={styles.form_Input} type="text" placeholder="Password" onChange={this.ChangePassword}/>
                <Link className={styles.form_Link} onClick={UserStore.RegistrationUser} to="/login">Зарегистрироваться</Link>
            </form>
        );
    }
}