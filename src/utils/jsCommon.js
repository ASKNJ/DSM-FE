export const initCap = (stringVal) => {
    const strArr = stringVal.split("");
    let res = strArr[0].toUpperCase();
    for (let i = 1; i <= strArr.length - 1; i++) {
        res += (strArr[i]);
    }
    return res;
};
