import Cookies from 'js-cookie';

export const setCookie = ({ name, value }: { name: string; value: string }) => {
    const isSecure = window.location.protocol === 'https:';
    console.log(isSecure, window.location.host);
    Cookies.set(name, value, {
        domain: import.meta.env.DEV ? 'localhost' : `${window.location.host}`,
        secure: false,
        // sameSite: 'none',
        path: '/',
    });
    return;
};

export const getCookie = (name: string): string | undefined => {
    return Cookies.get(name);
};

export const cookieNameSpace = {
    auth: {
        token: '_tms',
        userData: '_tmsusr',
    },
};
