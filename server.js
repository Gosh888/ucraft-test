import http from 'http';
import { app } from './src/app.js';
import { createSocket } from './src/ws.js';
import { initProject } from './src/init.js';

await initProject();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

createSocket(server);
server.listen(PORT, () => {
  console.log(`api listening at http://localhost:${PORT}`, ' pid: ', process.pid);
  console.log(new Date().toLocaleString());
});
