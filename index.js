import server from "./src/express/index.js";

const port = process.env.PORT || 3003;

server.listen(port, () => {
  console.log("Server listen on port: ", port);
});
