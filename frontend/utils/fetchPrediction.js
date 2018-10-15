import { identifyPlant } from './identifyPlant'

export const fetchPrediction = async (selectedImage) => {

    if (Object.keys(selectedImage).length === 0) {
        alert("No Image Selected")
        return false
    }

    try {

        if (!selectedImage.cancelled && selectedImage.base64) {
            const prediction = await (await identifyPlant(selectedImage)).json();

            console.log('upload result: ', prediction)

            return { prediction }
        }
    } catch (error) {
        throw new Error("error: ", error);
    }
}
