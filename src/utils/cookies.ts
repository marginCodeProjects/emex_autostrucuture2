import Cookies from "js-cookie"

export const getCookie = (name:string) => Cookies.get(name);