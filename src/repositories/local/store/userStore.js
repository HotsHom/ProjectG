import {action, computed, decorate, observable} from "mobx";
import {RestService} from "../../rest/apiService";
import {getLocalToken, setLocalToken} from "../localStorageService";

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
        let result = RestService({
            url : "/Users/login",
            method : "POST",
            body : {
                email : this.getEmail,
                password : this.getPassword
            }
        })
        result.then(res => {
            res ? this.saveData(res.userId, res.id)
                : window.location.href = "/login"
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
        }).then(response => {
            console.log(response)
            if (response === undefined){
                window.location.href = "/register"
            }
        })
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