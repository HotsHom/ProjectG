import * as React from "react";
import HomeNavigation from "../navigationModules/homeNavigation";
import TasksStore from "../../repositories/local/store/tasksStore";
import {observer} from "mobx-react";
import {getTasks} from "../../repositories/rest/apiService";

class HomeScreen extends React.Component{
    AbortController = new AbortController()

    componentDidMount() {
        getTasks(this.AbortController.signal)
    }

    componentWillUnmount() {
        this.AbortController.abort()
    }

    render() {
        return(
            <div className="mainscreen">
                <HomeNavigation/>
                <div className="tasks mainscreen">
                    {TasksStore.getTasksList}
                </div>
            </div>
        );
    }
}

export default observer(HomeScreen)