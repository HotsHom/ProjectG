import * as React from "react";
import War from "../../images/warning.png"
import styles from "../../style/mainScreen.module.css"

const Main = () => {
    return(
        <div className={styles.main}>
            <img src={War} alt="Warning"/><br />
            Привет! Чтобы воспользоваться заметками - залогинься или зарарегистрируйся.
        </div>
    )
}

export default Main