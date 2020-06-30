import React from "react";
import ErrorStore from "../../repositories/local/store/errorStore";
import {observer} from "mobx-react";
import {Alert} from "react-bootstrap";
import styles from "../../style/warning.module.css"

export const Warning = observer(() => {
    const error = ErrorStore.getError
    return (
        error != null ?
            <Alert variant="danger" className={styles.alert}>
                <Alert.Heading>Ошибка</Alert.Heading>
                <p>{error.text}</p>
            </Alert>
            : ""
    )
})