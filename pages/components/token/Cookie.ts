import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = ({name, value}: { name: any, value: any}) => {
    return cookies.set(name, value);
};

export const getCookie = ({name}: { name: any }) => {
    return cookies.get(name);
};

export const removeCookie = ({name, option}: { name: any, option: any }) => {
    return cookies.remove(name, { ...option });
};