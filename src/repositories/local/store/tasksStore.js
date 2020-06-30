import {action, computed, decorate, observable} from "mobx";
import {RestService} from "../../rest/apiService";
import ErrorStore from "./errorStore";

class tasksStore {
    tasksData = observable({
        tasks : [],
        count : 0
    })
    task = observable({
        id : null,
        title : "",
        body : ""
    })
    setField = (fieldName, value) => {
        this.task[fieldName] = value
    }
    setTasks = (tasks) => {
        this.tasksData.tasks = tasks
        this.tasksData.count = this.tasksData.tasks.length
    }
    get getTasksListStore (){
        return this.tasksData.tasks.slice().sort((a, b) => {
            return (+a.done - +b.done)
        })
    }
    CreateOrChangeTask = () => {
        RestService({
            url: `/tasks${this.task.id ? `/${this.task.id}` : ''}`,
            method : this.task.id ? 'PATCH' : 'POST',
            body : this.task
        }).then((response) => {
            this.LoadTasks()
            window.location.href = "/home"
        }, (reason) => {
            this.error(reason)
        })
    }
    LoadTasks = (signal) => {
        RestService({
            url : "/tasks",
            method: "GET",
            signal: signal
        }).then(response => {
                this.setTasks(response)
        }, reason => {
            this.error(reason)
        })
    }
    DeleteTask = id => {
        RestService({
            url : `/tasks/${id}`,
            method : "DELETE"
        }).then(() => {
            this.LoadTasks()
        }, reason => {
            this.error(reason)
        })
    }
    ChangeStatusTask = (id, status) => {
        RestService({
            url : `/tasks/${id}`,
            method : "PATCH",
            body : {"done" : !status}
        }).then(() => {
            this.LoadTasks()
        }, reason => {
            this.error(reason)
        })
    }
    error = (errorMessage) => {
        ErrorStore.setError(errorMessage)
    }

    loadCurrentTask = (id) => {
        let index = this.getTaskIndex(id)
        this.task = this.tasksData.tasks[index]
        this.task.id = id
    }

    getTaskIndex = (id) => {
        return this.tasksData.tasks.findIndex((element) => {
            return (+element.id === +id)
        })
    }
}
decorate(tasksStore, {
    ChangeStatusTask : action,
    setTasks : action,
    getTasksListStore : computed,
    LoadTasks : action,
    CreateOrChangeTask : action,
    DeleteTask : action,
    setField : action,
    loadCurrentTask : action
})
const TasksStore = new tasksStore();
export default TasksStore