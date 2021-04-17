export const getQueryStrings = (history) => {
    let queryString = {};
    const params = history.location.search;

    if (params.includes('?')) {
        const paramString = params.split('?')[1];
        const keyValue = paramString.split('=');

        if(keyValue.length > 1) {
            queryString[keyValue[0]] = keyValue[1];
        }
    }

    return queryString;
}