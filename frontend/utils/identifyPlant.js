export const identifyPlant = ({ base64 }) => {
    try {
        let apiUrl = `http://localhost:3000/identify`

        const data = JSON.stringify({ "data": base64 })

        let options = {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
        
        return fetch(apiUrl, options);

    } catch (error) {
        console.log("error: ", error)
    }

}