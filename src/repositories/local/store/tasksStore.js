import {action, computed, decorate, observable} from "mobx";
import {RestService} from "../../rest/apiService";

class tasksStore {
    tasksData = observable({
        tasks : [],
        count : 0
    })
    task = observable({
        title : "",
        body : ""
    })
    setTitle = (title) => {
        this.task.title = title
    }
    setBody = (body) => {
        this.task.body = body
    }
    setTasks = (tasks) => {
        this.tasksData.tasks = tasks
        this.changeCountTasks(!!tasks && tasks)
    }
    changeCountTasks = (count) => {
        this.tasksData.count = count ? count : this.tasksData.count - 1
    }
    getTitle = (id) => {
        let index = this.tasksData.tasks.findIndex((element) => {
            return (+element.id === +id)
        })
        return this.tasksData.tasks[index].title
    }
    getBody = (id) => {
        let index = this.tasksData.tasks.findIndex((element) => {
            return (+element.id === +id)
        })
        return this.tasksData.tasks[index].body
    }
    get getTasksListStore (){
        return this.tasksData.tasks.slice().sort((a, b) => {
            return (+a.done - +b.done)
        })
    }
    CreateOrChangeTask = (id) => {
        RestService({
            url: `/tasks${id ? `/${id}` : ''}`,
            method : id ? 'PATCH' : 'POST',
            body : this.task
        }).then(() => this.LoadTasks())
    }
    LoadTasks = (signal) => {
        RestService({
            url : "/tasks",
            method: "GET",
            signal: signal
        }).then(response => {
            this.setTasks(response)
        })
    }
    DeleteTask = id => {
        RestService({
            url : `/tasks/${id}`,
            method : "DELETE"
        }).then(() => this.LoadTasks())
    }
    ChangeStatusTask = (id, status) => {
        RestService({
            url : `/tasks/${id}`,
            method : "PATCH",
            body : {"done" : !status}
        }).then(() => this.LoadTasks())
    }
}
decorate(tasksStore, {
    setTasks : action,
    ChangeStatusTask : action,
    getTasksListList : computed,
    LoadTasks : action,
    CreateOrChangeTask : action,
    DeleteTask : action,
    setTitle : action,
    setBody : action
})
const TasksStore = new tasksStore();
export default TasksStore