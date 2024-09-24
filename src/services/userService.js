import tokenService from "../services/tokenService"
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/users/";

export function getAllUsers() {
  return fetch(BASE_URL, {
    headers: { Authorization: "Bearer " + tokenService.getToken() }
  }, { mode: "cors" })
    .then(res => res.json())
}