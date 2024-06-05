"use strict";
const redirect = () => {
    if (!sessionStorage.getItem('ges')) {
        window.location.href = '/login';
        return;
    }
};
redirect();
