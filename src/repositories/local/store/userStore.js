import {action, computed, decorate, observable} from "mobx";

class userStore {
    isFlagAuth = observable({
        Flag : false
    })
    userData = observable({
        id : 0,
        email: "",
        token: "",
        tasksCount: 0
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
    get getToken(){
        return this.userData.token
    }
}
decorate(userStore, {
    changeFlagAuth : action,
    saveData : action,
    saveTasksCount : action,
    getToken : computed

})
const UserStore = new userStore();
export default UserStore