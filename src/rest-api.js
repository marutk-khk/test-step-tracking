// * You may uncomment one of these modules:
const express = require('express');
// const koa = require('koa');
// const hapi = require('@hapi/hapi');
// const restify = require('restify');

module.exports = (stepService) => {
  const REST_PORT = 8080;

  // * TODO: Write the GET endpoint, using `stepService` for data access
  // * TODO: Return object containing `close()` method for shutting down the server

  const app = express();

  app.get('/users/:username/steps', (req, res) => {
    const { username } = req.params;
    console.log("username:::::::::"+username);
    console.log("username:::::::::"+username);
    const user = stepService.get(username); 
    console.log("user:::::::::"+JSON.stringify(user) );
    if (username === 'toString'|| !user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }
    return res.json({ cumulativeSteps: user.cumulativeSteps, ts: user.ts });
  });

  const server = app.listen(REST_PORT, () => {
    console.log(`REST API listening on port ${REST_PORT}`);
  });

  return {
    close: () => server.close(),
  };

};
