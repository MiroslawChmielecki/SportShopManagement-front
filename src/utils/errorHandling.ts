import {Dispatch, SetStateAction} from "react";

export const errorHandling = (res: Response, setError: Dispatch<SetStateAction<string>>) => {
    if ([400 || 500 || 404].includes(res.status)) {
      (async () => {
            const error = await res.json();
            setError(error.message);
        })()
        return;
    }
}