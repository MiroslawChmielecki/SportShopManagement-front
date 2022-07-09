
export const errorHandling = async (res: Response, setErrorInfo: any) => {
    if ([400 || 500 || 404].includes(res.status)) {
        const err = await res.json();
        setErrorInfo(err.message);
        return;
    }
}