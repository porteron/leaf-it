from chalice import Chalice
from chalice import BadRequestError
from pprint import pprint
import base64
import os
import boto3
import ast
import numpy as np

app = Chalice(app_name='predictor')


@app.route('/', methods=['POST'], content_types=['application/json'])
def index():
    try:
        body = app.current_request.json_body

        if 'data' not in body:
            raise BadRequestError(body)
        if 'ENDPOINT_NAME' not in os.environ:
            raise BadRequestError('Missing endpoint')

        image = base64.b64decode(body['data'])  # byte array
        endpoint = os.environ['ENDPOINT_NAME']

        if 'topk' not in body:
            topk = 257
        else:
            topk = body['topk']
        print("%s %d" % (endpoint, topk))

    except Exception as e:
        # pprint combined with vars, prints out object
        return {'error':  str(e)}

    runtime = boto3.Session().client(
        service_name='sagemaker-runtime', region_name='us-east-1')
    response = runtime.invoke_endpoint(
        EndpointName=endpoint, ContentType='application/x-image', Body=image)
    probs = response['Body'].read().decode()  # byte array

    probs = ast.literal_eval(probs)  # array of floats
    probs = np.array(probs)  # numpy array of floats

    topk_indexes = probs.argsort()  # indexes in ascending order of probabilities
    # indexes for top k probabilities in descending order
    topk_indexes = topk_indexes[::-1][:topk]

    topk_categories = []
    for i in topk_indexes:
        topk_categories.append((i+1, probs[i]))

    return {'response': str(topk_categories)}
