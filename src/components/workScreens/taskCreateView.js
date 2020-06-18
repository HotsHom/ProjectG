import * as React from "react";
import {Link, Prompt} from "react-router-dom";
import TasksStore from "../../repositories/local/store/tasksStore";
import {useState} from "react";
import {createTask} from "../../repositories/rest/apiService";

let task = {
    title : "",
    body : ""
}

export const TaskCreateView = props => {
    let [isBlocking, setIsBlocking] = useState(false)
    if (props.match.params.id !== undefined){
        task.title = TasksStore.getTitle(props.match.params.id)
        task.body = TasksStore.getBody(props.match.params.id)
    }

    const ChangeTitle = event => {
        let text = event.target.value === null ? event.target.defaultvalue : event.target.value
        task.title = text
        setIsBlocking(text.length > 0)
    }

    const ChangeBody = event => {
        let text = event.target.value === null ? event.target.defaultvalue : event.target.value
        task.body = text
        setIsBlocking(text.length > 0)
    }

    return(
        <form className="formTask">
            <Prompt message={(location) => {
                return location.pathname === "/home/" || !isBlocking  ?
                    true
                    : `Вы уверены, что хотите перейти на ${location.pathname} без сохранения?`
            }}/>
            <input type="text" placeholder="Заголовок" onChange={ChangeTitle}
                   defaultValue={props.match.params.id !== undefined ? TasksStore.getTitle(props.match.params.id) : ""}/>
            <textarea placeholder="Текст" onChange={ChangeBody}
                   defaultValue={props.match.params.id !== undefined ? TasksStore.getBody(props.match.params.id) : ""}/>
            <Link to="/home/" onClick={() => (createTask(task, props.match.params.id))}>Сохранить</Link>
        </form>
    );
}
