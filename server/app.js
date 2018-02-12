const restify = require('restify');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = require('./express');
const db = require('./db/mongo/index');
console.log(process.env.NODE_ENV);
console.log('IS DEV MODE?', dev);

// Prepare Application
(async () => {
  console.log('Now init Database');
  db.init(); // prepare MongoDB
  console.log('Now loading Server');
  server.svcInit({ app, handle }, {}); // prepare api server
  console.info('Now loading NextJS');
  await app.prepare(); // prepare next.js
})().catch(e => console.error('Error when starting server', e));
