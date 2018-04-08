const LoguxServer = require('logux-server').Server;

const app = new LoguxServer(
  LoguxServer.loadOptions(process, {
    subprotocol: '1.0.0',
    supports: '1.x',
    root: __dirname
  })
);

app.auth(function(userId, token) {
  return Promise.resolve(true);
});

app.channel('user/:id', async function(params, action, meta, creator) {
  app.log.add(
    {
      type: 'INIT_STATE',
      value: { hello: 'world' }
    },
    {
      nodeIds: [creator.nodeId]
    }
  );

  return true;
});

app.listen();
