import {deleteAllLocalData} from "../../repositories/local/localStorageService";

export const LogoutScreen = () => {
    deleteAllLocalData()
    window.location.href = "/"
}