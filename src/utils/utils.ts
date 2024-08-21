import Cookies from "js-cookie"

export const getCookie = (name:string) => Cookies.get(name);

export const calculateMarginPercent = (inputPercent: number) => {
    const minLeft = -10;
    const leftOffset = 930 * (inputPercent / 100);
    return minLeft + leftOffset;
};