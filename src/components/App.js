import React from 'react';
import UrlList from "./navigationModules/navigation";
import {observer} from "mobx-react";
import 'mobx-react-lite/batchingForReactDom'

import '../style/App.css';

class App extends React.Component{
    render() {
        return (
            <div>
              <UrlList />
            </div>
        );
    }
}
export default observer(App)
