import axios from "axios";

function buildApiUrl() {
    const rawUrl =
        process.env.REACT_APP_BACKEND_URL ||
        process.env.REACT_APP_API_URL ||
        "http://localhost:3500";
    const trimmed = rawUrl.replace(/\/+$/, "");
    return trimmed.endsWith("/api/tasks") ? trimmed : `${trimmed}/api/tasks`;
}

const apiUrl = buildApiUrl();

export function getTasks() {
    return axios.get(apiUrl);
}

export function addTask(task) {
    return axios.post(apiUrl, task);
}

export function updateTask(id, task) {
    return axios.put(apiUrl + "/" + id, task);
}

export function deleteTask(id) {
    return axios.delete(apiUrl + "/" + id);
}
