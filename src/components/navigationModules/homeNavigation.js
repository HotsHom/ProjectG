import * as React from "react";
import {Link} from "react-router-dom";
import styles from "../../style/homeNavigation.module.css"

const HomeNavigation = () => (
    <div className={styles.navHome}>
            <Link className={styles.navHome_a} to="/createtask">Создать задачу</Link>
    </div>
)

export default HomeNavigation