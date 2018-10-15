import { identifyPlant } from './identifyPlant'

export const fetchPrediction = async (selectedImage) => {

    if (Object.keys(selectedImage).length === 0) {
        alert("No Image Selected")
        return false
    }

    try {

        if (!selectedImage.cancelled && selectedImage.base64) {

            let prediction = await (await identifyPlant(selectedImage)).json();

            prediction = prediction.replace(/\)/g, '"');
            prediction = prediction.replace(/\(/g, '"');

            prediction = JSON.parse(prediction)

            console.log('Prediction: ', prediction)

            let plants = ['Cherry Tomato Leaf', 'Dusty Miller', 'Jade', 'Lantana - Flame', 'Mexican Oregano', 'Red', 'Rose']

            let predictedData = []
            for (let p of prediction) {
                let k = p.split(",")

                predictedData.push({
                    name: plants[k[0] - 1],
                    index: k[0] - 1,
                    percent: k[1],
                })
            }

            // console.log("Predicted Data: ", predictedData)

            return { prediction: predictedData }
        }
    } catch (error) {
        console.log("Error fetching prediction: ", error)
        throw new Error("error: ", error);
    }
}
