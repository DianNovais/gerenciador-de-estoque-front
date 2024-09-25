export const setCookies = (cookie: string) => {
    document.cookie = `${cookie}; path=/; domain=${window.location.hostname}`
}

export const getTokenAuthorization = (): string => {
    const cookies: string[] = document.cookie.split(';');

    for(let cookie in cookies){
        if(cookie.includes('token')){
            return cookie;
        }
    }

    return '';
};