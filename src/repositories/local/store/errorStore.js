import {action, computed, decorate, observable} from "mobx";

class errorStore {
    errors = []

    setError = (text, location) => {
        this.errors.push({
            text,
            "done" : false,
            location
        })
    }

    setStatus = (id) => {
        this.errors[id].done = !this.errors[id].done
    }

    get getError(){
        if (this.errors.length && !this.errors[this.errors.length - 1].done) {

            setTimeout(() => {
                this.setStatus(this.errors.length - 1)
                window.location.href = this.errors[this.errors.length - 1].location !== undefined ? this.errors[this.errors.length - 1].location : ""
            },3000)

            return !this.errors[this.errors.length - 1].done ?
                this.errors[this.errors.length - 1]
                : null

        }
        return null
    }
}
decorate(errorStore, {
    setError : action,
    getError : computed,
    errors : observable,
    setStatus : action
})
const ErrorStore = new errorStore()
export default ErrorStore