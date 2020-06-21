<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of db2b50d... Merge branch 'master' of https://github.com/HotsHom/ProjectG
import {getLocalToken} from "../local/localStorageService";

>>>>>>> parent of db2b50d... Merge branch 'master' of https://github.com/HotsHom/ProjectG
const PORT = `3000`
const HOST = `http://127.0.0.1:${PORT}`
const API_URL = `${HOST}/api`

export const RestService = ({ url, method, body, signal }) => {
    const token = getLocalToken() //window.localStorage.getItem("Token")
    const apiUrl = `${API_URL + url + (token ? ("?access_token="+token) : "")}`
    console.log(apiUrl)
    return fetch(apiUrl, {
        signal,
        method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (response.status === 200) {
            return response.json()
<<<<<<< HEAD
<<<<<<< HEAD
        }else {
            alert(`Ошибка авторизации с кодом [${response.status}]`)
            return
=======
        } else {
            return alert(`Что-то пошло не так. Статус ошибки: ${response.status}`)
>>>>>>> parent of db2b50d... Merge branch 'master' of https://github.com/HotsHom/ProjectG
=======
        } else {
            return alert(`Что-то пошло не так. Статус ошибки: ${response.status}`)
>>>>>>> parent of db2b50d... Merge branch 'master' of https://github.com/HotsHom/ProjectG
        }
    })
}