const http = require("http");
const app = require("./app");
const connect = require("./model/connexion.js");

const port = 3000;

const errorHandler = error => {
    console.log(error);
    process.exit(1);
}

app.set('port', port);
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
    connect()
    console.log("serveur en route ");
    console.log(`Server is running on http://localhost:${port}`);
});

server.listen(port);