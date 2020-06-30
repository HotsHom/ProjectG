import {getLocalToken} from "../local/localStorageService";

const PORT = `3000`
const HOST = `http://127.0.0.1:${PORT}`
const API_URL = `${HOST}/api`

export const RestService = ({ url, method, body, signal }) => {
    const token = getLocalToken() //window.localStorage.getItem("Token")
    const apiUrl = `${API_URL + url + (token ? ("?access_token="+token) : "")}`
    return fetch(apiUrl, {
        signal,
        method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (response.ok) {
            return response.json()
        }else {
            return Promise.reject("Вы ввели неверные данные")
        }
    }).catch(error => {
        return Promise.reject("Упс, кажется что-то не так: " + error)
    })
}
