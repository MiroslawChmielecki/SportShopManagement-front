
export const errorHandling = async (res: Response) => {
    //wpisujemy wszystkie kody ktore obslugujemy
    if ([400 || 500 || 404].includes(res.status)) {
        console.log({res})
        const err = await res.json();
        alert(`błąd ${err.message}`)
        return;
    }
}