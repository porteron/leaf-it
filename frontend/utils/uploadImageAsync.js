
export const uploadImageAsync = async (uri, plantName) => {
    console.log("Upload Image Request")
 
    let apiUrl = `http://localhost:3000/upload?plantName=${plantName}`
    // let apiUrl = `http://a8944446.ngrok.io/upload?plantName=${plantName}`

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    });

    let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };

    return fetch(apiUrl, options);
}
