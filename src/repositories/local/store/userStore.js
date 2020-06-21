import {action, computed, decorate, observable} from "mobx";
import {LoginUser} from "../../rest/apiService";

class userStore{
    isFlagAuth = observable({
        Flag : false
    })
    userData = observable({
        id : 0,
        email: "",
        token: "",
        password: ""
    })
    changeFlagAuth() {
        this.isFlagAuth.Flag = !this.isFlagAuth.Flag
    }
    saveData(id_, email_, token){
        this.userData.email = email_;
        this.userData.id = id_;
        this.userData.token = token;
        this.changeFlagAuth()
    }
    saveEmail(email_){
        this.userData.email = email_
    }
    savePassword(password_){
        this.userData.password = password_
    }
    authUser(){
        let result = LoginUser({
            email : this.userData.email,
            password : this.userData.password
        })
        console.log(result)
    }
    get getToken(){
        return this.userData.token
    }
}
decorate(userStore, {
    changeFlagAuth : action,
    saveData : action,
    saveTasksCount : action,
    getToken : computed,
    saveEmail : action,
    savePassword : action,
    authUser : action
})
const UserStore = new userStore();
export default UserStore