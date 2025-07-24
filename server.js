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

app.post('/submit', (req, res) => {
  const { module, feedback } = req.body;
  let msg
  if (module == "SSD") {
    msg = "Ding ding! SSD is better!"
  } else {
    msg = "Boooo! ITP is the worst!"
  }
  res.render('thankyou', { module, feedback, msg });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
