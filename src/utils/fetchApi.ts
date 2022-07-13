import {apiUrl} from "../config/api";

export const fetchApi = (
    urlPath: string,
    method: string,
    body: any,
) => (
      fetch(`${apiUrl}/${urlPath}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
);
