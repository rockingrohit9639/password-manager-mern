import axios from "axios";
const isDev = true;

const url = isDev ? "http://localhost:8000" : "";

const instance = axios.create({
    baseURL: url,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    withCredentials: true
});

export const checkAuthenticated = () => instance.get("/authenticate");
export const loginUser = (data) => instance.post("/login", data); 
export const logoutUser = () => instance.get("/logout");
export const signupUser = (data) => instance.post("/register", data);
export const saveNewPassword = (data) => instance.post("/addnewpassword", data);
export const deleteAPassword = (id) => instance.post("/deletepassword", id);
export const decryptThePass = (data) => instance.post("/decrypt", data);