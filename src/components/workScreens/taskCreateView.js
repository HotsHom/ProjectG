import * as React from "react";
import {Link, Prompt} from "react-router-dom";
import TasksStore from "../../repositories/local/store/tasksStore";
import {useState} from "react";
import styles from "../../style/taskCreateView.module.css"

export const TaskCreateView = props => {
    let [isBlocking, setIsBlocking] = useState(false)

    if (props.match.params.id !== undefined){
        TasksStore.setTitle(TasksStore.getTitle(props.match.params.id))
        TasksStore.setBody(TasksStore.getBody(props.match.params.id))
    }

    const ChangeTitle = event => {
        let text = event.target.value === null ? event.target.defaultvalue : event.target.value
        TasksStore.setTitle(text)
        setIsBlocking(text.length > 0)
    }

    const ChangeBody = event => {
        let text = event.target.value === null ? event.target.defaultvalue : event.target.value
        TasksStore.setBody(text)
        setIsBlocking(text.length > 0)
    }

    return(
        <form className={styles.formTask}>
            <Prompt message={(location) => {
                return location.pathname === "/home/" || !isBlocking  ?
                    true
                    : `Вы уверены, что хотите перейти на ${location.pathname} без сохранения?`
            }}/>
            <input type="text" placeholder="Заголовок" onChange={ChangeTitle}
                   defaultValue={props.match.params.id !== undefined ? TasksStore.getTitle(props.match.params.id) : ""}/>
            <textarea placeholder="Текст" onChange={ChangeBody}
                   defaultValue={props.match.params.id !== undefined ? TasksStore.getBody(props.match.params.id) : ""}/>
            <Link to="/home/" onClick={() => (TasksStore.CreateOrChangeTask(props.match.params.id))}>Сохранить</Link>
        </form>
    );
}
