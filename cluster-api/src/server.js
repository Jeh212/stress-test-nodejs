import { Console } from "console";
import http from "http";
const processId = process.pid;

const server = http.createServer((request, response) => {
  for (let index = 0; index < 1e7; index++);
  response.end(`handle the pid ${processId} `);
});

server.listen(3000).once("listening", () => {
  console.log("Server started in process", processId);
});

//Aguardar as conexoes sem encerradas para só então encerrar o programa

process.on("SIGTERM", () => {
  console.log("server ending", new Date().toISOString());
  server.close(() => process.exit());
});

//Simular erros aleatorios

setTimeout(() => {
  process.exit(1);
}, Math.random() * 1e4);
