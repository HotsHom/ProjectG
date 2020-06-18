import UserStorage from "../local/store/userStore";
import TasksStore from "../local/store/tasksStore";
import UserStore from "../local/store/userStore";

const HOST = `http://127.0.0.1:3000`
const API_URL = `${HOST}/api`

//Регистрация
export const RegistrationUser = (userData) => {
    fetch(`${API_URL}/Users`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body : JSON.stringify({
            "email" : userData.email,
            "password" : userData.password
        })
    }).then(response => {
        if (response.status === 200) {
            alert("Регистрация прошла успешно")
        } else {
            alert(`Ошибка регистрации с кодом [${response.status}]`)
            window.location.href = "/register"
        }
    })
}

//Логин
export const LoginUser = (userData) => {
    fetch(`${API_URL}/Users/login`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body : JSON.stringify({
            "email" : userData.email,
            "password" : userData.password
        })
    }).then(response => {
        if (response.status === 200) {
            alert("Авторизация прошла успешно")
            response.json().then(result => {
                UserStorage.saveData(result.userId, userData.email, result.id)
            })
        } else {
            alert(`Ошибка авторизации с кодом [${response.status}]`)
            window.location.href = "/login"
        }
    })
}

//Получение тасков
export const getTasks = (signal) => {
    fetch(`${API_URL}/tasks?access_token=${UserStore.getToken}`, {
        signal : signal,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => {
        if (response !== undefined)
            if (response.status === 200) {
                response.json().then(result => {
                    result.sort(function (a, b) {
                        return (+a.done - +b.done)
                    })
                    TasksStore.setTasks(result)
                })
            }
    }).catch(e => {
        console.log(e.message)
    })
}

//Создание таска
 export const createTask = (task, id)  => {
     let requestString = `${API_URL}/tasks${id === undefined ? "" : `/${id}`}?access_token=${UserStore.getToken}`
     fetch(requestString, {
         method : id === undefined ? 'POST' : 'PATCH',
         headers : {
             'Content-Type': 'application/json;charset=utf-8'
         },
         body : JSON.stringify(task)
     }).then(request => {
         console.log(request.status === 200 ?
             "Таск создан"
             : `Что-то пошло не так со статусом ${request.status}`)
     })
 }

//Удаление таска
export const deleteTask = id => {
    fetch(`${API_URL}/tasks/${id}?access_token=${UserStore.getToken}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => {
        if (response.status === 200) {
            console.log("Пост успешно удалён")
            TasksStore.changeCountTasks()
            getTasks(null)
        }
    })
}

//Редактирование статуса
export const changeTaskStatus = (id, status) => {
    fetch(`${API_URL}/tasks/${id}?access_token=${UserStore.getToken}`, {
        method : "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body : JSON.stringify ({ "done" : !status })
    }).then(request => {
        if(request.status === 200){
            getTasks(null)
        }else{
            alert(`Что-то пошло не так. Статус ошибки: ${request.status}`)
        }
    })
}
