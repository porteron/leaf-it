# leaf-it

Snap a photo or grab it from your camera roll.

You can upload a picture of a plant to S3 (`/upload?plantName={plantName}`) or send it to python API Gateway/Lambda function (`/identify`) that will run it through Tensorflow model and return a prediction on plant type.


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
cd leaf-t/backend
npm install
npm start
```


### Chalice

To deploy to API Gateway/Lambda on AWS

``` sh
cd leaf-t/chalice
chalice deploy --profile {PROFILE NAME}
```

To deploy locally

``` sh
cd leaf/chalice
 chalice local --port=8001
 ```

 ### Jupyter Notebook

 Python TensorFlow Model 

 Endpoint it exposed through *AWS Sagemaker*

 `/leaf-it.ipynb`



