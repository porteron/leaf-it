// Use local .env file for env vars when not deployed
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// Expose the /upload endpoint
const app = require('express')();
const http = require('http').Server(app);
const fetch = require('node-fetch')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())


const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});


// Initialize multers3 with our s3 config and other options
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, `data/plants/${req.query.plantName}/${Date.now().toString()}_${req.query.plantName}.png`);
    }
  })
})




app.post('/upload', upload.single('photo'), (req, res, next) => {
  console.log("-- Upload --")

  const { plantName } = req.query

  console.log("Plant Name: ", plantName)

  res.json(req.file)
})


app.post('/identify', (req,res) => {
  console.log("-- Identify --")
  const url = "http://127.0.0.1:8001"
  
  let body = JSON.stringify({
    "data": req.body.data,
    "topk": 3
  })

  // body = JSON.stringify({"hi":"bye"})

  let options = {
    body,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept" : "application/json"
    }
  }
  // console.log("Base 64 image data: ", body)

  fetch(url, options)
    .then(response => response.json({ "response": res }))
    .then(body => {
      console.log("BODY: ", body)
      res.json(body.response)
    });
})

let port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
