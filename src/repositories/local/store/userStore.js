import {action, computed, decorate, observable} from "mobx";
import {RestService} from "../../rest/apiService";
import {getLocalToken, setLocalToken} from "../localStorageService";
import ErrorStore from "./errorStore";

class userStore {
    isFlagAuth = observable({
        Flag : !!getLocalToken()
    })

    userData = observable({
        id : 0,
        email : "",
        password : "",
        token : ""
    })

    changeFlagAuth = () => {
        this.isFlagAuth.Flag = !this.isFlagAuth.Flag
    }
    saveData = (id_, token) => {
        this.userData.id = id_;
        this.userData.token = token;
        setLocalToken(token)
        this.changeFlagAuth()
    }
    get getEmail(){
        return this.userData.email
    }
    get getPassword(){
        return this.userData.password
    }
    saveEmail = (email_) => {
        this.userData.email = email_
    }
    savePassword = (password_) => {
        this.userData.password = password_
    }
    AuthUser = () => {
        RestService({
            url : "/Users/login",
            method : "POST",
            body : {
                email : this.getEmail,
                password : this.getPassword
            }
        }).then(response => {
                this.saveData(response.userId, response.id)
                window.location.href = "/home"
        }, reason => {
            this.error(reason, "login")
        })
    }
    RegistrationUser = () => {
        RestService({
            url : "/Users",
            method: "POST",
            body: {
                email : this.getEmail,
                password : this.getPassword
            }
        }).then(() => {
            window.location.href="/login"
        }, reason => {
            this.error(reason, "register")
        })
    }
    error = (errorMessage, location) => {
        ErrorStore.setError(errorMessage, location)
    }
}
decorate(userStore, {
    changeFlagAuth : action,
    saveData : action,
    saveEmail : action,
    savePassword : action,
    AuthUser : action,
    getPassword : computed,
    getEmail : computed,
    RegistrationUser : action
})
const UserStore = new userStore();
export default UserStore