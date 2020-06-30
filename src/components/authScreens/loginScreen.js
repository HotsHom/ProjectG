import * as React from "react";
import UserStore from "../../repositories/local/store/userStore";
import styles from "../../style/loginScreen.module.css"
import {Button} from "react-bootstrap";

export class LoginScreen extends React.Component{
    ChangeEmail(event) {
        UserStore.saveEmail(event.target.value)
    }
    ChangePassword(event){
        UserStore.savePassword(event.target.value)
    }

    render() {
        return(
            <form className={styles.form}>
                <input className={styles.formInput} type="text" placeholder="Email" onChange={this.ChangeEmail}/>
                <input className={styles.formInput} type="text" placeholder="Password" onChange={this.ChangePassword}/>
                <Button className={styles.formLink} onClick={UserStore.AuthUser}>Залогиниться</Button>
            </form>
        );
    }
}

