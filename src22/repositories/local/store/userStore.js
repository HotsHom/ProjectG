import {action, computed, decorate, observable} from "mobx";
import {LoginUser} from "../../rest/apiService";

class userStore {
    isFlagAuth = observable({
        Flag : false
    })
    userData = observable({
        id : 0,
        email: "",
        token: "",
        password: ""
    })
    SaveData = (id_, token) => {
        this.userData.id = id_;
        this.userData.token = token;
        this.isFlagAuth.Flag = true
    }
    Auth = () => {
        let result = LoginUser
        result ?
            this.SaveData(result.userId, result.id)
            : window.location.href = "/login"
    }
    get getToken(){
        return this.userData.token
    }
    setEmail = (email_) => {
        this.userData.email = email_
    }
    setPassword = (password_) => {
        this.userData.password = password_
    }
}
decorate(userStore, {
    SaveData : action,
    Auth : action,
    saveTasksCount : action,
    setEmail : action,
    setPassword: action,
    getToken : computed
})
const UserStore = new userStore();
export default UserStore