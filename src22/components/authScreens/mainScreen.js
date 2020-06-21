import * as React from "react";
import War from "../../images/warning.png"

const Main = () => {
    return(
        <div className="main">
            <img src={War} className="img-war" alt="Warning"/><br />
            Привет! Чтобы воспользоваться заметками - залогинься или зарарегистрируйся.
        </div>
    )
}

export default Main