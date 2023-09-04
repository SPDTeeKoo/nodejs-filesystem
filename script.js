const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { Console } = require('console');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/timestamps');
});

app.get('/timestamps', (req, res) => {
  res.render('timestamps/index');
});

app.get('/timestamps/new', (req, res) => {
  res.render('timestamps/new');
});

app.post('/timestamps', (req, res) => {
  let name = req.body.username;
  createTimeStamp(name);
  res.redirect('timestamps/view');
});

app.get('/timestamps/view', (req, res) => {
  // console.log(TimeStamps);

  res.render('timestamps/view', { allTimeStamps });
});

const createTimeStamp = (username) => {
  const timestamp = new Date();
  let day = timestamp.getDate();
  let month = timestamp.getMonth() + 1;
  let year = timestamp.getFullYear();
  let hours = timestamp.getHours();
  let minutes = timestamp.getMinutes();
  let seconds = timestamp.getSeconds();
  let currentDay = `${day}-${month}-${year} ${hours}.${minutes}.${seconds}`;

  const currentDate = Date();

  fs.writeFile(
    `timestamps/${currentDay}.txt`,
    `${currentDate} by ${username}`,
    (err) => {
      if (err) {
        console.err;
        return;
      }
    }
  );
};

const readTimeStamps = () => {
  const timeStamps = fs.readdirSync(
    '/Documents/Guvi/GUVI Task/Day35_nodejsday1/timestamps',
    function (err, data) {
      if (err) {
        console.log('error occured:', err);
        return;
      }
      return;
      // console.log('Content of directory is:', data);
    }
  );
  return timeStamps;
};

let allTimeStamps = readTimeStamps();

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`On port ${port}..!`);
});
