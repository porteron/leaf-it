# leaf-it

Snap a photo or grab it from your camera roll.

**Contribute to dataset**: Upload a picture of a plant to S3 (`/upload?plantName={plantName}`)
 

**Identify Picture of Plant**: Send base64 image to python API Gateway/Lambda function (`/identify`) that will run it through exposed Tensorflow model enpoint and return a prediction on plant type.


## Development

### Frontend

``` sh
cd leaf-it/frontend
yarn install

OR

npm install
```

### Backend

``` sh
cd leaf-it/backend
npm install
npm start
```


### Chalice

To deploy to API Gateway/Lambda on AWS

``` sh
cd leaf-it/chalice
chalice deploy --profile {PROFILE NAME}
```

To deploy locally

``` sh
 cd leaf-it/chalice
 chalice local --port=8001
 ```

 ### Jupyter Notebook

 Python TensorFlow Model 

 Endpoint it exposed through **AWS Sagemaker**

 ``` sh
 /leaf-it.ipynb
 ```



