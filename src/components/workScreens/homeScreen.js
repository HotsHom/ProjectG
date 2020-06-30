import * as React from "react";
import HomeNavigation from "../navigationModules/homeNavigation";
import TasksStore from "../../repositories/local/store/tasksStore";
import {observer} from "mobx-react";
import {TaskView} from "./taskView";
import styles from "../../style/homeScreen.module.css"

class HomeScreen extends React.Component{

    AbortController = new AbortController()

    componentWillUnmount() {
        this.AbortController.abort()
    }

    componentDidMount() {
        TasksStore.LoadTasks(this.AbortController.signal)
    }

    render() {
        return(
            <div className="mainscreen">
                <HomeNavigation/>
                <div className={styles.tasks + " mainscreen"}>
                    {Array.isArray(TasksStore.getTasksListStore) ? TasksStore.getTasksListStore.map((value, index) => {
                        return <TaskView key={value.id} className={styles.task} title={value.title} body={value.body} id={value.id} done={value.done}/>
                    }) : ""}
                </div>
            </div>
        );
    }
}

export default observer(HomeScreen)