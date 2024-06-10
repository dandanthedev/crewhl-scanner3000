import { goto } from "$app/navigation";


export async function customFetch(url, options) {

    if (!options.headers) options.headers = {};
    if (localStorage.getItem('access') && localStorage.getItem('refresh')) {
        options.headers.accessToken = localStorage.getItem('access');
        options.headers.refreshToken = localStorage.getItem('refresh');
    }

    const res = await fetch(url, options);

    if (res.status === 401) {
        localStorage.clear();
        goto("/");
    }

    if (res.headers.get("accessToken")) localStorage.setItem('access', res.headers.get("accessToken"));
    if (res.headers.get("refreshToken")) localStorage.setItem('refresh', res.headers.get("refreshToken"));

    return res;
}