const express = require('express');
const path = require('path')

const checkPort = (port, callback) => {
  const app = express();
  const server = app.listen(port);

  server.on('listening', () => {
    server.close();
    callback(null, false);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      callback(null, true);
    } else {
      callback(err, false);
    }
  });
};

const startServer = (port) => {
  const app = express();
  // Set the view engine to ejs
  app.set('view engine', 'ejs');

  // Serve static files from the "public" directory
  app.use(express.static('public'));

  app.get('/', function (req, res) {
    res.render('homepg');
  });

  app.get('/mainmenu', function (req, res) {
    res.render('mainmenu');
  });

  app.get('/maincppgen', function (req, res) {
    res.render('maincppgen');
  });

  app.get('/pathCreating', function (req, res) {
    res.render('pathCreating');
  });

  app.get('/settings', function (req, res) {
    res.render('settings');
  });

  app.get('/debug',function (req, res) {
    const filePath = path.join(__dirname,'files','debugCommandtest.txt')
    res.sendFile(filePath);
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

const findAvailablePort = (port) => {
  checkPort(port, (err, isInUse) => {
    if (err) {
      console.error('Error checking port:', err);
      return;
    }

    if (isInUse) {
      console.log(`Port ${port} is in use. Checking next port...`);
      findAvailablePort(port + 1);
    } else {
      console.log(`Port ${port} is available.`);
      startServer(port);
    }
  });
};

const defaultPort = 8081;
findAvailablePort(defaultPort);
