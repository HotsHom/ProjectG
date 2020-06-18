import {action, computed, decorate, observable} from "mobx";
import {TaskView} from "../../../components/workScreens/taskView";
import * as React from "react";

class tasksStore {
    tasksData = observable({
        tasks : [],
        count : 0
    })
    setTasks(tasks){
        this.tasksData.tasks = tasks
        this.changeCountTasks(tasks.length)
    }
    changeCountTasks(count) {
        this.tasksData.count = count ? count : this.tasksData.count - 1
        //this.tasksData.count = -1
    }
    // changeStatus(id){
    //     let index = this.tasksData.tasks.findIndex((element) => {
    //         return element.id === id
    //     })
    //     this.tasksData.tasks[index].done = !this.tasksData.tasks[index].done
    //     return "Успешно"
    // }
    getTitle(id){
        let index = this.tasksData.tasks.findIndex((element) => {
            return (+element.id === +id)
        })
        return this.tasksData.tasks[index].title
    }
    getBody(id){
        let index = this.tasksData.tasks.findIndex((element) => {
            return (+element.id === +id)
        })
        return this.tasksData.tasks[index].body
    }
    get getTasksList(){
        return this.tasksData.tasks?
            this.tasksData.tasks.map((value, index) => {
                return <TaskView key={index} className="task" title={value.title} body={value.body} id={value.id} done={value.done}/>
            }) : ''
    }
}
decorate(tasksStore, {
    setTasks : action,
    changeCountTasks : action,
    changeStatus : action,
    getTasksListList : computed,
})
const TasksStore = new tasksStore();
export default TasksStore