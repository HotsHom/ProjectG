import * as React from "react";
import {Link} from "react-router-dom";
import {changeTaskStatus, deleteTask} from "../../repositories/rest/apiService";

export class TaskView extends React.Component{
    render() {
        return(
                <div className="task-conteiner">
                    <div className="task-div">
                        <h2>{this.props.title}</h2>
                        <div className="task-body">
                            {this.props.body}
                        </div>
                    </div>
                    <div className="task-action">
                        {this.props.done ?
                            <div className="task-btn-status-done"> <Link to="/home" className="task-btn-status-done action-btn" onClick={() => (changeTaskStatus(this.props.id, this.props.done))}>Завершено</Link></div>
                            : <div className="task-btn-status hover"><Link to="/home" className="task-btn-status action-btn" onClick={() => (changeTaskStatus(this.props.id, this.props.done))}>Завершить</Link></div>}
                        <div className="task-btn-edit hover"><Link to={"/edittask/" + this.props.id} className="task-btn-edit action-btn">Изменить</Link></div>
                        <div className="task-btn-delete hover"><Link to="/home" onClick={() => (deleteTask(this.props.id))} className="task-btn-delete action-btn">Удалить</Link></div>
                    </div>
                </div>
        );
    }
}