const WebSocketServer = require('ws').Server;

module.exports = (stepService) => {
  const WEBSOCKET_PORT = 8081;
  const wsServer = new WebSocketServer({ port: WEBSOCKET_PORT });
  wsServer.on('connection', (ws) => {
    console.log('Client connected');
  // * TODO: Write the WebSocket API for receiving `update`s,
  //         using `stepService` for data persistence.
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    try {
      const data = JSON.parse(message);      
      if (data.username && data.newSteps) {
        const ts = Date.now();
        stepService.add(data.username, ts, data.newSteps);
        console.log(`Saved steps for user ${data.username} at ${ts}`);
      }
    } catch (err) {
      console.error(`Error parsing message: ${err.message}`);
    }
  });
  // * TODO: Make sure to return an instance of a WebSocketServer,
  //         which contains `close()` method.
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

  return wsServer;
};
