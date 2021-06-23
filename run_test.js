const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;
const ip = 'localhost';

app.use(cors());

curr={
  'x':0,
  'y':0,
  'z':0
};

app.listen(port, () => {
  console.log(`Listening at http://${ip}:${port}`);
});

// app.use(express.static('public'))
// app.use(express.static('node_modules'))

app.get('/get_new_angle', (req, res) => {
  // console.log("request_received")
  curr.x=curr.x+0.01;
  curr.y=curr.y+0.01;
  curr.z=curr.z;

  res.json({'x':curr.x,'y':curr.y,'z':curr.z});
});


