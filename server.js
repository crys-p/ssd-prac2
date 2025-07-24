const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('survey');
});

function getModuleMessage(module) {
  if (module === "SSD") {
    return "Ding ding! SSD is better!";
  } else {
    return "Boooo! ITP is the worst!";
  }
}

app.post('/submit', (req, res) => {
  const { module, feedback } = req.body;
  const msg = getModuleMessage(module);
  res.render('thankyou', { module, feedback, msg });
});

let server;
server = app.listen(PORT, () => {
    // console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { server, getModuleMessage };
