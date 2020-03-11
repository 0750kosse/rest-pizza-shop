const express = require('express');
var bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.status(200).json({
    message: "it works"
  })
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app listening on port ${port}`))