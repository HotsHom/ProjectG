import * as React from "react";
import {Link} from "react-router-dom";
import TasksStore from "../../repositories/local/store/tasksStore";
import styles from "../../style/taskView.module.css"

export class TaskView extends React.Component{
    render() {
        return (
            <div className={styles.taskConteiner}>
                <div className={styles.taskDiv}>
                    <h2>{this.props.title}</h2>
                    <div>
                        {this.props.body}
                    </div>
                </div>
                <div className={styles.taskAction}>
                    {this.props.done ?
                        <div className={styles.taskBtnStatusDone + " "+ styles.hover}>
                            <Link to="/home" className={styles.taskBtnStatusDone +" "+ styles.actionBtn} onClick={() => (TasksStore.ChangeStatusTask(this.props.id, this.props.done))}>Завершено</Link>
                        </div>
                        :
                        <div className={styles.taskBtnStatus + " " + styles.hover}>
                            <Link to="/home" className={styles.taskBtnStatus +" "+ styles.actionBtn} onClick={() => (TasksStore.ChangeStatusTask(this.props.id, this.props.done))}>Завершить</Link>
                        </div>
                    }
                    <div className={styles.taskBtnEdit + " " + styles.hover}><
                        Link to={"/edittask/" + this.props.id} className={styles.taskBtnEdit + " " + styles.actionBtn}>Изменить</Link>
                    </div>
                    <div className={styles.taskBtnDelete + " " + styles.hover}>
                        <Link to="/home" className={styles.taskBtnDelete +" "+ styles.actionBtn} onClick={() => (TasksStore.DeleteTask(this.props.id))}>Удалить</Link>
                    </div>
                </div>
            </div>
        );
    }
}