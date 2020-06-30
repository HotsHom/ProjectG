import * as React from "react";
import {Prompt} from "react-router-dom";
import TasksStore from "../../repositories/local/store/tasksStore";
import {useState} from "react";
import styles from "../../style/taskCreateView.module.css"
import {Button} from "react-bootstrap";
import {observer} from "mobx-react";

export const TaskCreateView = observer((props) => {
    let [isBlocking, setIsBlocking] = useState(false)
    let [isLoaded, setLoading] = useState(false)

    const ChangeTitle = event => {
        let text = event.target.value === null ? event.target.defaultvalue : event.target.value
        TasksStore.setField("title", text)
        setIsBlocking(text.length > 0)
    }

    const ChangeBody = event => {
        let text = event.target.value === null ? event.target.defaultvalue : event.target.value
        TasksStore.setField("body", text)
        setIsBlocking(text.length > 0)
    }

    if (props.match.params.id !== undefined && !isLoaded){
        TasksStore.LoadTasks()
        if(TasksStore.tasksData.count > 0) {
            TasksStore.loadCurrentTask(props.match.params.id)
            setLoading(true)
        }
    }

    return(
            <form className={styles.formTask}>
                <Prompt message={(location) => {
                    return !isBlocking  ? true
                        : `Вы уверены, что хотите перейти на ${location.pathname} без сохранения?`
                }}/>
                <input type="text" placeholder="Заголовок" onChange={ChangeTitle}
                       defaultValue={TasksStore.task.title}/>
                <textarea placeholder="Текст" onChange={ChangeBody}
                          defaultValue={TasksStore.task.body}/>
                <Button onClick={() => (TasksStore.CreateOrChangeTask())}>Сохранить</Button>
            </form>
    );
})
